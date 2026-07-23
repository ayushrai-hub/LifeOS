$ErrorActionPreference = "Stop"
$today = "2026-07-23"
$root = "d:\COde"
$jsonPath = Join-Path $PSScriptRoot "identity-links.json"
$sourceTxt = Join-Path $PSScriptRoot "identity-links-source.txt"

$dirs = @{
  social   = Join-Path $root "knowledge\social"
  contact  = Join-Path $root "knowledge\contact"
  business = Join-Path $root "knowledge\business"
}
$review = Join-Path $root "knowledge\review"
$imports = Join-Path $root "data\imports"
New-Item -ItemType Directory -Force -Path @($dirs.Values + $review + $imports) | Out-Null

Copy-Item -Force $sourceTxt (Join-Path $imports "2026-07-23-identity-links.txt")

$items = Get-Content -Raw -Path $jsonPath | ConvertFrom-Json
$typeMap = @{ social = "social_profile"; contact = "contact_channel"; business = "business_profile" }

$index = New-Object System.Collections.Generic.List[string]
$index.Add("generated_at: $today")
$index.Add("status: imported")
$index.Add("source: data/imports/2026-07-23-identity-links.txt")
$index.Add("count: $($items.Count)")
$index.Add("profiles:")

foreach ($item in $items) {
  $bucket = [string]$item.bucket
  $slug = [string]$item.slug
  $prefix = $bucket
  $id = "$prefix.$slug"
  $dir = $dirs[$bucket]
  $path = Join-Path $dir "$slug.yaml"

  if ($null -eq $item.username -or [string]::IsNullOrWhiteSpace([string]$item.username)) {
    $userLine = "username: null"
  } else {
    $userLine = "username: `"$($item.username)`""
  }

  $notes = if ($item.notes) { [string]$item.notes } else { "" }
  $notes = $notes.Replace('"', '\"')

  $lines = New-Object System.Collections.Generic.List[string]
  [void]$lines.Add("id: $id")
  [void]$lines.Add("type: $($typeMap[$bucket])")
  [void]$lines.Add("title: $($item.platform)")
  [void]$lines.Add("slug: $slug")
  [void]$lines.Add("platform: $($item.platform)")
  [void]$lines.Add($userLine)
  [void]$lines.Add("url: $($item.url)")
  [void]$lines.Add("category: $($item.category)")
  [void]$lines.Add("purpose: `"$($item.purpose)`"")
  [void]$lines.Add("visibility: public")
  [void]$lines.Add("priority: $($item.priority)")
  [void]$lines.Add("status: $($item.status)")
  [void]$lines.Add("notes: `"$notes`"")
  [void]$lines.Add("created: $today")
  [void]$lines.Add("updated: $today")
  [void]$lines.Add("author: person.owner")
  [void]$lines.Add("version: 0.1.0")
  [void]$lines.Add("last_verified: $today")
  [void]$lines.Add("provenance:")
  [void]$lines.Add("  source: owner-provided-link-list")
  [void]$lines.Add("  source_file: data/imports/2026-07-23-identity-links.txt")
  [void]$lines.Add("  imported_at: $today")
  if ($item.PSObject.Properties.Name -contains "superseded_by" -and $item.superseded_by) {
    [void]$lines.Add("superseded_by: $($item.superseded_by)")
  }

  [System.IO.File]::WriteAllLines($path, $lines)

  [void]$index.Add("  - id: $id")
  [void]$index.Add("    path: $($path -replace '\\','/')")
  [void]$index.Add("    bucket: $bucket")
  [void]$index.Add("    category: $($item.category)")
  [void]$index.Add("    status: $($item.status)")
  [void]$index.Add("    url: $($item.url)")
}

[System.IO.File]::WriteAllLines((Join-Path $root "knowledge\metadata\indexes\identity.yaml"), $index)

$dup = @(
  "status: imported",
  "created: $today",
  "updated: $today",
  "items:",
  "  - id: social.youtube-channel-id",
  "    reason: `"Likely same YouTube channel as social.youtube`"",
  "    preferred: social.youtube",
  "  - id: business.notion-so-portfolio",
  "    reason: `"Same Notion portfolio page id as business.notion-portfolio`"",
  "    preferred: business.notion-portfolio",
  "  - id: business.remotemore",
  "    reason: `"Identical RemoteMore URL listed twice in owner paste; stored once`"",
  "    preferred: business.remotemore"
)
[System.IO.File]::WriteAllLines((Join-Path $review "identity-duplicates.yaml"), $dup)

$unc = @(
  "status: imported",
  "created: $today",
  "updated: $today",
  "items:",
  "  - id: social.pinterest",
  "    reason: `"pin.it short link - expand to canonical profile/board`"",
  "  - id: business.ayushrai-cc",
  "    reason: `"Verify active personal site`"",
  "  - id: business.superprof",
  "    reason: `"Slug self-description may be outdated`"",
  "  - id: business.turing",
  "    reason: `"Resume preview share URL may be temporary`"",
  "  - id: business.lemonio",
  "    reason: `"Candidate share URL may expire`"",
  "  - id: business.cryptojobs-generic",
  "    reason: `"Generic /talent/profile path`"",
  "  - id: business.cryptotask-generic",
  "    reason: `"Generic /en/profile path`"",
  "  - id: business.laborx-customer",
  "    reason: `"Separate LaborX customer id vs freelancer id`""
)
[System.IO.File]::WriteAllLines((Join-Path $review "identity-uncertain.yaml"), $unc)

$contactIndex = @(
  "# Contact channels (canonical)",
  "primary_email: contact.email-proton",
  "whatsapp: contact.whatsapp",
  "generated_at: $today"
)
[System.IO.File]::WriteAllLines((Join-Path $dirs.contact "_index.yaml"), $contactIndex)

Write-Host "OK count=$($items.Count)"
Write-Host ("social={0} contact={1} business={2}" -f `
  (Get-ChildItem $dirs.social -Filter *.yaml).Count, `
  (Get-ChildItem $dirs.contact -Filter *.yaml).Count, `
  (Get-ChildItem $dirs.business -Filter *.yaml).Count)
