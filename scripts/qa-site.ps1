#Requires -Version 5.1
<#
.SYNOPSIS
  Compatibility wrapper. The QA checks live in scripts/qa-site.js; prefer `npm run qa`.
#>
node (Join-Path $PSScriptRoot 'qa-site.js')
exit $LASTEXITCODE
