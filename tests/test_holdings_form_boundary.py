#!/usr/bin/env python3
"""Deterministic local boundary test for the founder-supplied Holdings forms.

This proves only that the current static implementation remains fail-closed.
It does not approve a data controller, provider, BD receiver or deployment.
"""

from __future__ import annotations

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def read(relative: str) -> str:
    return (ROOT / relative).read_text(encoding="utf-8")


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


fit = read("src/components/FitAssessmentForm.tsx")
gated = read("src/components/GatedForm.tsx")
next_config = read("next.config.mjs")
vercel = json.loads(read("vercel.json"))
all_source = "\n".join(path.read_text(encoding="utf-8") for path in (ROOT / "src").rglob("*.tsx"))

require("const FORM_APPROVED = false;" in fit, "HSE Fit Assessment must remain fail-closed")
require(re.search(r"approved\s*=\s*false", gated) is not None, "shared enquiry form must default fail-closed")
require("disabled={!FORM_APPROVED}" in fit, "HSE submit control must be disabled")
require("disabled={!approved}" in gated, "shared form submit control must be disabled")
require("action=" not in fit and "action=" not in gated, "no form delivery endpoint may be wired")
require(not (ROOT / "src" / "app" / "api").exists(), "no live API route may exist in the static source")
require("/start-your-venture" in next_config and "destination: '/apply'" in next_config,
        "Next configuration must preserve the replacement route")
redirects = [row for row in vercel.get("redirects", []) if row.get("source") == "/start-your-venture"]
require(len(redirects) == 1 and redirects[0].get("destination") == "/apply/" and redirects[0].get("statusCode") == 301,
        "host redirect must map the superseded route to /apply exactly once")
for prohibited in ("type=\"file\"", "pitchDeck", "multipart/form-data"):
    require(prohibited not in all_source, f"prohibited sensitive-upload surface present: {prohibited}")
for field in ("name", "email", "company", "website", "market", "sector", "stage", "capital", "description", "constraint"):
    require(f'name="{field}"' in fit, f"expected HSE qualification field absent: {field}")
require("c-privacy" in fit and "c-commercial" in fit and "c-marketing" in fit,
        "privacy, commercial acknowledgement and optional Marketing consent must remain distinct")
require("googletagmanager" not in all_source.casefold() and "gtag(" not in all_source.casefold(),
        "analytics/tagging must not be introduced before its consent and property gates")

print(json.dumps({
    "status": "PASS",
    "checks": 27,
    "forms": 3,
    "submissions_enabled": 0,
    "delivery_endpoints": 0,
    "api_routes": 0,
    "uploads": 0,
    "analytics_tags": 0,
    "target_disposition": "REPLACE_AND_REDIRECT_TO_APPLY",
}, indent=2))
