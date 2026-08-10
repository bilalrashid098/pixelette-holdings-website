<#
  push-to-github.ps1
  Publishes the Pixelette Holdings website to its OWN NEW PRIVATE GitHub repo.

  WHY A SCRIPT: the Holdings site currently lives inside the CTO Vault git repo
  (remote = RanaKhangit/R-Core). Pushing from there would send it to R-Core,
  which is against the rule that Holdings gets its OWN private repo. This script
  copies the site to an isolated folder OUTSIDE the vault, makes a fresh repo,
  creates a PRIVATE GitHub repo, pushes, and verifies it is private. It never
  touches R-Core.

  RUN IT IN A NORMAL POWERSHELL WINDOW (not inside the locked Claude session):
    1. One-time: gh auth login        (if you have not already authenticated gh)
    2. powershell -ExecutionPolicy Bypass -File .\push-to-github.ps1

  Optional: -RepoName <name>   (default: pixelette-holdings-website)
#>
param(
  [string]$RepoName = 'pixelette-holdings-website',
  [string]$Dest = (Join-Path $env:USERPROFILE 'pixelette-holdings-website')
)

$src = $PSScriptRoot   # the NEXTJS folder (the website)

# 1. gh must be installed and authenticated.
& gh auth status 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) { Write-Host "gh is not authenticated. Run:  gh auth login   then re-run this."; exit 1 }

# 2. Fresh isolated copy (exclude deps, build output and any git metadata).
if (Test-Path $Dest) { Write-Host "Destination already exists: $Dest`nRemove it or pass -Dest <path>."; exit 1 }
Write-Host "Copying the site to an isolated folder: $Dest"
robocopy $src $Dest /E /XD node_modules .next out .git /XF *.log *.tsbuildinfo | Out-Null
if ($LASTEXITCODE -ge 8) { Write-Host "Copy failed (robocopy code $LASTEXITCODE)."; exit 1 }
$global:LASTEXITCODE = 0

Set-Location $Dest

# 3. Fresh repo + first commit.
& git init -b main | Out-Null
& git add .
& git commit -m "Pixelette Holdings website - initial import" | Out-Null
if ($LASTEXITCODE -ne 0) { Write-Host "git commit failed."; exit 1 }

# 4. Create a PRIVATE GitHub repo and push to it.
Write-Host "Creating PRIVATE repo '$RepoName' and pushing..."
& gh repo create $RepoName --private --source=. --remote=origin --push
if ($LASTEXITCODE -ne 0) { Write-Host "gh repo create/push failed."; exit 1 }

# 5. VERIFY the repo is private (mandatory safety check).
$info = & gh repo view $RepoName --json isPrivate,visibility,nameWithOwner | ConvertFrom-Json
if ($info.isPrivate -ne $true) {
  Write-Host "!!! WARNING: repo is NOT private. Fix immediately:  gh repo edit $($info.nameWithOwner) --visibility private --accept-visibility-change-consequences"
  exit 1
}
Write-Host ""
Write-Host "DONE. Pushed to $($info.nameWithOwner)  |  isPrivate=$($info.isPrivate)  visibility=$($info.visibility)"
Write-Host "Local copy: $Dest   (edits made in the CTO Vault copy are NOT auto-synced here.)"
