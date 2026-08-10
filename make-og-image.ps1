<#
  make-og-image.ps1
  Generates ONLY the 1200x630 social-share (Open Graph) image locally.
  Separate from download-assets.ps1 so you don't re-download everything.

  Run in a normal PowerShell window:
    powershell -ExecutionPolicy Bypass -File "C:\Users\Rana\Brain\CTO Vault\05_Projects\Pixelette_Holdings_WordPress_Rebuild_001\NEXTJS\make-og-image.ps1"

  (Fixes the earlier "ambiguous Font overload" error by casting sizes to [single].)
#>
Add-Type -AssemblyName System.Drawing
$base = Join-Path $PSScriptRoot 'public\media'
New-Item -ItemType Directory -Force -Path $base | Out-Null

$w = 1200; $h = 630
$bmp = New-Object System.Drawing.Bitmap($w, $h)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

# navy gradient background
$rect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
$c1 = [System.Drawing.ColorTranslator]::FromHtml('#06111f')
$c2 = [System.Drawing.ColorTranslator]::FromHtml('#0c2541')
$bg = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, $c1, $c2, 45.0)
$g.FillRectangle($bg, $rect)

# cobalt accent bar
$cobalt = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#2c7cd1'))
$g.FillRectangle($cobalt, 92, 250, 90, 8)

# eyebrow
$fEyebrow = New-Object System.Drawing.Font('Segoe UI', [single]20, [System.Drawing.FontStyle]::Bold)
$brEyebrow = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#8fc4ff'))
$g.DrawString('HYBRID SWEAT EQUITY', $fEyebrow, $brEyebrow, [single]90, [single]196)

# title
$fTitle = New-Object System.Drawing.Font('Segoe UI', [single]66, [System.Drawing.FontStyle]::Bold)
$g.DrawString('Pixelette Holdings', $fTitle, [System.Drawing.Brushes]::White, [single]82, [single]282)

# tagline (wrapped in a rectangle)
$fTag = New-Object System.Drawing.Font('Segoe UI', [single]30, [System.Drawing.FontStyle]::Regular)
$brTag = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#b8c8db'))
$tagRect = New-Object System.Drawing.RectangleF([single]92, [single]412, [single]1020, [single]150)
$g.DrawString('Get your company built, launched and enterprise-ready - and keep control.', $fTag, $brTag, $tagRect)

$bmp.Save((Join-Path $base 'og-image.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose()
Write-Host "OK  og-image.png (1200x630) generated in public\media\. Tell Claude 'og done' to rebuild."
