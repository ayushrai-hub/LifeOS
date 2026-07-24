# Local static server (PowerShell) - no Python/Node required.
# Usage:  powershell -ExecutionPolicy Bypass -File scripts/serve.ps1
# Optional:  .\scripts\serve.ps1 -Port 8090

param(
  [int]$Port = 8080,
  [string]$BindHost = "127.0.0.1"
)

$Root = Resolve-Path (Join-Path $PSScriptRoot "..")
$Prefix = "http://${BindHost}:${Port}/"

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($Prefix)

try {
  $listener.Start()
} catch {
  Write-Error "Failed to bind $Prefix - $($_.Exception.Message)"
  exit 1
}

Write-Host "Serving $Root"
Write-Host "Open  $Prefix"
Write-Host "Home  ${Prefix}sites/www/"
Write-Host "Press Ctrl+C to stop"

$mime = @{
  ".html" = "text/html; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".js"   = "application/javascript; charset=utf-8"
  ".json" = "application/json; charset=utf-8"
  ".svg"  = "image/svg+xml"
  ".png"  = "image/png"
  ".jpg"  = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".webp" = "image/webp"
  ".gif"  = "image/gif"
  ".ico"  = "image/x-icon"
  ".txt"  = "text/plain; charset=utf-8"
  ".md"   = "text/plain; charset=utf-8"
  ".xml"  = "application/xml"
  ".woff" = "font/woff"
  ".woff2"= "font/woff2"
}

function Get-ContentType([string]$path) {
  $ext = [IO.Path]::GetExtension($path).ToLowerInvariant()
  if ($mime.ContainsKey($ext)) { return $mime[$ext] }
  return "application/octet-stream"
}

try {
  while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $req = $ctx.Request
    $res = $ctx.Response

    try {
      $rel = [Uri]::UnescapeDataString($req.Url.AbsolutePath.TrimStart("/"))
      if ([string]::IsNullOrWhiteSpace($rel)) { $rel = "index.html" }

      $candidate = Join-Path $Root ($rel -replace "/", [IO.Path]::DirectorySeparatorChar)
      $full = $null

      if (Test-Path $candidate -PathType Container) {
        $index = Join-Path $candidate "index.html"
        if (Test-Path $index -PathType Leaf) { $full = $index }
      } elseif (Test-Path $candidate -PathType Leaf) {
        $full = $candidate
      }

      if (-not $full) {
        $res.StatusCode = 404
        $bytes = [Text.Encoding]::UTF8.GetBytes("404 Not Found")
        $res.ContentType = "text/plain; charset=utf-8"
        $res.OutputStream.Write($bytes, 0, $bytes.Length)
      } else {
        $rootFull = (Resolve-Path $Root).Path
        $fileFull = (Resolve-Path $full).Path
        if (-not $fileFull.StartsWith($rootFull, [StringComparison]::OrdinalIgnoreCase)) {
          $res.StatusCode = 403
          $bytes = [Text.Encoding]::UTF8.GetBytes("403 Forbidden")
          $res.ContentType = "text/plain; charset=utf-8"
          $res.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
          $bytes = [IO.File]::ReadAllBytes($fileFull)
          $res.StatusCode = 200
          $res.ContentType = (Get-ContentType $fileFull)
          $res.Headers["Cache-Control"] = "no-cache"
          $res.OutputStream.Write($bytes, 0, $bytes.Length)
        }
      }
    } catch {
      $res.StatusCode = 500
      $msg = [Text.Encoding]::UTF8.GetBytes("500 Internal Server Error")
      $res.ContentType = "text/plain; charset=utf-8"
      $res.OutputStream.Write($msg, 0, $msg.Length)
    } finally {
      $res.OutputStream.Close()
    }
  }
} finally {
  if ($listener.IsListening) { $listener.Stop() }
  $listener.Close()
}
