#Requires -Version 5.1
<#
.SYNOPSIS
  Static QA checks for the knowledge website.
#>
$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $PSScriptRoot
$fail = 0
$warn = 0

function Fail($msg) { $script:fail++; Write-Output "FAIL: $msg" }
function Warn($msg) { $script:warn++; Write-Output "WARN: $msg" }
function Ok($msg) { Write-Output "OK: $msg" }

# Em dashes
$em = 0
Get-ChildItem $Root -Recurse -Include *.html,*.css,*.js,*.md,*.yaml,*.yml,*.json |
  Where-Object { $_.FullName -notmatch '\\.git\\|\\node_modules\\|\\data\\imports\\graahak-snapshot\\' } |
  ForEach-Object {
    $t = [IO.File]::ReadAllText($_.FullName)
    $em += ([regex]::Matches($t, '—')).Count
  }
if ($em -gt 0) { Fail "em dash count=$em" } else { Ok "no em dashes" }

# Viewport meta on HTML pages
Get-ChildItem (Join-Path $Root 'sites') -Recurse -Filter *.html | ForEach-Object {
  $t = [IO.File]::ReadAllText($_.FullName)
  if ($t -notmatch 'name="viewport"') { Fail "missing viewport: $($_.FullName)" }
  if ($t -notmatch 'styles/site\.css|styles/main\.css') { Warn "no shared stylesheet?: $($_.FullName)" }
  if ($t -match 'width:\s*\d{4,}px') { Warn "large fixed width?: $($_.FullName)" }
}

# Critical assets
$portrait = Join-Path $Root 'assets\images\portraits\ayush-rai--workspace-2024.jpg'
if (-not (Test-Path $portrait)) { Fail "missing portrait asset" } else {
  $len = (Get-Item $portrait).Length
  if ($len -gt 800KB) { Warn "portrait still large: $len bytes" } else { Ok "portrait size ok ($len)" }
}

# Catalog pages exist
$cat = Get-Content (Join-Path $Root 'data\site-catalog.json') -Raw | ConvertFrom-Json
foreach ($p in $cat.portfolios) {
  $path = Join-Path $Root "sites\portfolios\$($p.slug)\index.html"
  if (-not (Test-Path $path)) { Fail "missing portfolio $path" }
}
foreach ($d in $cat.domains) {
  $path = Join-Path $Root "sites\domains\$($d.slug)\index.html"
  if (-not (Test-Path $path)) { Fail "missing domain $path" }
}
foreach ($r in $cat.resumes) {
  $path = Join-Path $Root "sites\career\resumes\$($r.slug).html"
  if (-not (Test-Path $path)) { Fail "missing resume $path" }
}

Ok "portfolio count=$($cat.portfolios.Count) domain count=$($cat.domains.Count) resume count=$($cat.resumes.Count)"
Write-Output "SUMMARY fail=$fail warn=$warn"
if ($fail -gt 0) { exit 1 }
