<#
  download-assets.ps1
  Downloads the Pixelette Holdings images from the live site into public/media/.

  WHY THIS EXISTS: the CTO Vault build session cannot download binary files
  (network-download tools are blocked there). Run this from a NORMAL PowerShell
  window (not inside the locked Claude session):

      cd "C:\Users\Rana\Brain\CTO Vault\05_Projects\Pixelette_Holdings_WordPress_Rebuild_001\NEXTJS"
      powershell -ExecutionPolicy Bypass -File .\download-assets.ps1

  Then tell Claude "images downloaded" and it will rebuild; the testimonial
  photos and venture logos will appear. Filenames match what the code expects.
#>

$ErrorActionPreference = 'Continue'
$base = Join-Path $PSScriptRoot 'public\media'
$folders = 'testimonials','ventures','credentials','events','brand'
foreach ($f in $folders) { New-Item -ItemType Directory -Force -Path (Join-Path $base $f) | Out-Null }

$assets = @(
  # --- testimonial photos ---
  @{ url='https://pixeletteholdings.com/wp-content/uploads/2025/08/1585496676217-1-1.png'; out='testimonials\von-rahman.png' },
  @{ url='https://pixeletteholdings.com/wp-content/uploads/2025/07/Ellipse-62.png';        out='testimonials\anthony-bevan.png' },
  @{ url='https://pixeletteholdings.com/wp-content/uploads/2025/08/Mask-group-5.png';       out='testimonials\emmanuelle-fernandes.png' },
  @{ url='https://pixeletteholdings.com/wp-content/uploads/2025/08/Ellipse-62-1.png';       out='testimonials\anthony-zirrolli.png' },
  @{ url='https://pixeletteholdings.com/wp-content/uploads/2025/08/Mask-group-6.png';       out='testimonials\sunny-oller.png' },
  @{ url='https://pixeletteholdings.com/wp-content/uploads/2025/08/Frame-1707481012.png';   out='testimonials\david-steenhoek.png' },
  @{ url='https://pixeletteholdings.com/wp-content/uploads/2025/08/Frame-1707481011.png';   out='testimonials\brenda-gilbert.png' },
  # --- venture logos ---
  @{ url='https://pixeletteholdings.com/wp-content/uploads/2026/05/2connect.ai_.png';                         out='ventures\2connect.png' },
  @{ url='https://pixeletteholdings.com/wp-content/uploads/2025/08/Group-1707479103-7.png';                   out='ventures\trust-layer-health.png' },
  @{ url='https://pixeletteholdings.com/wp-content/uploads/2026/05/Accountability-Intelligence.png';          out='ventures\accountability-intelligence.png' },
  @{ url='https://pixeletteholdings.com/wp-content/uploads/2025/07/bgwm-logo-2-1-1.png';                      out='ventures\blockguard.png' },
  @{ url='https://pixeletteholdings.com/wp-content/uploads/2025/07/image-25-2.png';                           out='ventures\digital-asset-vault.png' },
  @{ url='https://pixeletteholdings.com/wp-content/uploads/2025/07/Vector-2-1.png';                           out='ventures\big-innovation-centre.png' },
  @{ url='https://pixeletteholdings.com/wp-content/uploads/2025/07/cropped-icon2-1-1.png';                    out='ventures\diverscinnova.png' },
  @{ url='https://pixeletteholdings.com/wp-content/uploads/2025/08/Group-1707479103-1.png';                   out='ventures\meta-space-labs.png' },
  @{ url='https://pixeletteholdings.com/wp-content/uploads/2025/07/synthealogo.7a6f52e1c1f1bf0b33f2.png-1.png'; out='ventures\synthea.png' },
  @{ url='https://pixeletteholdings.com/wp-content/uploads/2025/07/Partner-Logo-3-1.png';                     out='ventures\void-venture-capital.png' },
  @{ url='https://pixeletteholdings.com/wp-content/uploads/2025/07/Frame-1707479098.png';                     out='ventures\fusio.png' },
  @{ url='https://pixeletteholdings.com/wp-content/uploads/2025/07/Vector-3-1.png';                           out='ventures\brics-blockchain.png' },
  @{ url='https://pixeletteholdings.com/wp-content/uploads/2025/08/Group-1707479103-2.png';                   out='ventures\qe-channel.png' },
  @{ url='https://pixeletteholdings.com/wp-content/uploads/2025/08/Group-1707479103-5.png';                   out='ventures\voltan-motor.png' },
  @{ url='https://pixeletteholdings.com/wp-content/uploads/2025/08/Group-1707479103-6.png';                   out='ventures\mamosis.png' },
  # --- credential badges ---
  @{ url='https://pixeletteholdings.com/wp-content/uploads/2025/08/appg.png';            out='credentials\appg.png' },
  @{ url='https://pixeletteholdings.com/wp-content/uploads/2025/08/ISO-9001-1.png';      out='credentials\iso-27001.png' },
  @{ url='https://pixeletteholdings.com/wp-content/uploads/2025/08/ISO-9001-3.png';      out='credentials\iso-9001.png' },
  @{ url='https://pixeletteholdings.com/wp-content/uploads/2025/08/CYBER-ESSENTIAL.png'; out='credentials\cyber-essentials.png' },
  # --- group / brand logos (header + footer group strip) ---
  @{ url='https://pixeletteholdings.com/wp-content/uploads/2024/11/cropped-image-12.png'; out='brand\holdings.png' },
  @{ url='https://pixeletteholdings.com/wp-content/uploads/2025/07/Frame-1707480879.png'; out='brand\technologies.png' },
  @{ url='https://pixeletteholdings.com/wp-content/uploads/2025/07/Group-1707479103.png';  out='brand\marketing.png' },
  @{ url='https://pixelettecertified.com/logos/logo-white-text.svg';                       out='brand\certified.svg' },
  @{ url='https://pixelettecertified.com/logos/favicon.svg';                               out='brand\certified-icon.svg' },
  # Square brand MARKS (icon only) for the uniform group lockup — one size, one font.
  @{ url='https://pixeletteholdings.com/wp-content/uploads/2024/11/cropped-Frame-1-192x192.png'; out='brand\mark-holdings.png' },
  @{ url='https://pixelettetech.com/images/logo/short-logo-purple.png';                    out='brand\mark-technologies.png' },
  @{ url='https://www.pixelettemarketing.com/favicon.svg';                                 out='brand\mark-marketing.svg' }
)

$ok = 0; $fail = 0
foreach ($a in $assets) {
  $dest = Join-Path $base $a.out
  try {
    Invoke-WebRequest -Uri $a.url -OutFile $dest -UseBasicParsing -TimeoutSec 60
    if ((Get-Item $dest).Length -gt 0) { Write-Host "OK   $($a.out)"; $ok++ } else { Write-Host "EMPTY $($a.out)"; $fail++ }
  } catch {
    Write-Host "FAIL $($a.out)  ->  $($_.Exception.Message)"; $fail++
  }
}
Write-Host ""
Write-Host "$ok downloaded, $fail failed."

# --- Generate the social-share (Open Graph) image locally, 1200x630 PNG ---
try {
  Add-Type -AssemblyName System.Drawing
  $w = 1200; $h = 630
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
  $rect = New-Object System.Drawing.Rectangle 0, 0, $w, $h
  $c1 = [System.Drawing.ColorTranslator]::FromHtml('#06111f')
  $c2 = [System.Drawing.ColorTranslator]::FromHtml('#0c2541')
  $bg = New-Object System.Drawing.Drawing2D.LinearGradientBrush $rect, $c1, $c2, 45.0
  $g.FillRectangle($bg, $rect)
  $g.FillRectangle((New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#2c7cd1'))), 92, 250, 90, 8)
  $g.DrawString('HYBRID SWEAT EQUITY', (New-Object System.Drawing.Font('Segoe UI', [single]20, [System.Drawing.FontStyle]::Bold)), (New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#8fc4ff'))), [single]90, [single]196)
  $g.DrawString('Pixelette Holdings', (New-Object System.Drawing.Font('Segoe UI', [single]66, [System.Drawing.FontStyle]::Bold)), [System.Drawing.Brushes]::White, [single]82, [single]282)
  $tagRect = New-Object System.Drawing.RectangleF([single]92, [single]412, [single]1020, [single]150)
  $g.DrawString('Get your company built, launched and enterprise-ready - and keep control.', (New-Object System.Drawing.Font('Segoe UI', [single]30, [System.Drawing.FontStyle]::Regular)), (New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#b8c8db'))), $tagRect)
  $bmp.Save((Join-Path $base 'og-image.png'), [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose(); $bmp.Dispose()
  Write-Host "OK   og-image.png (social-share image) generated."
} catch {
  Write-Host "OG image generation failed: $($_.Exception.Message)"
}

Write-Host ""
Write-Host "Done. Files are in public\media\. Now tell Claude 'images downloaded' and it will rebuild."
