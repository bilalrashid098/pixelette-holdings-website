import { CREDENTIALS } from '@/content/site';

/**
 * Verified-credentials strip: APPG AI Secretariat + ISO 9001 + ISO 27001 +
 * Cyber Essentials. Badge files at public/media/credentials/<key>.png (fetched
 * by download-assets.ps1). Institutional credentials only, agency review-award
 * badges are deliberately kept on the Pixelette Technologies site.
 */
export function Credentials() {
  return (
    <div className="credentials-strip">
      {CREDENTIALS.map((c) => (
        <div key={c.key} className="cred">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/media/credentials/${c.key}.png`} alt={c.label} loading="lazy" />
          <div className="cred-text">
            <strong>{c.label}</strong>
            <span>{c.note}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
