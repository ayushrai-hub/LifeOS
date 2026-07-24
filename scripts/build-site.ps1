#Requires -Version 5.1
<#
.SYNOPSIS
  Generate knowledge website pages from data/site-catalog.json.

.DESCRIPTION
  Creates resumes, portfolios, domain hubs, certifications index,
  technologies index, and refreshes related hub stubs.
  Pure static HTML + shared styles/site.css. No framework.
#>
$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $PSScriptRoot
$CatalogPath = Join-Path $Root 'data\site-catalog.json'
$Catalog = Get-Content -LiteralPath $CatalogPath -Raw | ConvertFrom-Json
$Owner = $Catalog.owner

function Esc([string]$s) {
  if ($null -eq $s) { return '' }
  return ($s -replace '&', '&amp;' -replace '<', '&lt;' -replace '>', '&gt;' -replace '"', '&quot;')
}

function Ensure-Dir([string]$path) {
  New-Item -ItemType Directory -Force -Path $path | Out-Null
}

function Get-SitesDepth([string]$fromDir) {
  $sitesRoot = [IO.Path]::GetFullPath((Join-Path $Root 'sites'))
  $full = [IO.Path]::GetFullPath($fromDir)
  if ($full.StartsWith($sitesRoot, [StringComparison]::OrdinalIgnoreCase)) {
    $rest = $full.Substring($sitesRoot.Length).TrimStart('\', '/')
    if ([string]::IsNullOrWhiteSpace($rest)) { return 0 }
    return ($rest -split '[\\/]+' | Where-Object { $_ }).Count
  }
  return 1
}

function Css-Href([string]$fromDir) {
  $depth = Get-SitesDepth $fromDir
  $up = '../' * ($depth + 1)
  return "${up}styles/site.css"
}

function Home-Href([string]$fromDir) {
  $depth = Get-SitesDepth $fromDir
  $up = '../' * $depth
  return "${up}www/index.html"
}

function Write-Page {
  param(
    [string]$OutPath,
    [string]$Title,
    [string]$Description,
    [string]$BodyHtml,
    [string]$DraftNote = $null
  )
  $dir = Split-Path -Parent $OutPath
  Ensure-Dir $dir
  $css = Css-Href $dir
  $homeHref = Home-Href $dir
  $draft = ''
  if ($DraftNote) {
    $draft = "    <p class=`"draft-banner`" role=`"status`">$(Esc $DraftNote)</p>`n"
  }
  $html = @"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>$(Esc $Title)</title>
  <meta name="description" content="$(Esc $Description)">
  <meta name="author" content="$(Esc $Owner.name)">
  <meta name="theme-color" content="#ffffff">
  <meta property="og:title" content="$(Esc $Title)">
  <meta property="og:description" content="$(Esc $Description)">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary">
  <script>
    (function () {
      try {
        if (localStorage.getItem("theme") === "dark") {
          document.documentElement.setAttribute("data-theme", "dark");
        }
      } catch (e) {}
    })();
  </script>
  <link rel="icon" href="/assets/icons/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="$(Esc $css)?v=20260724b">
</head>
<body>
  <a class="skip-link" href="#content">Skip to content</a>
  <main id="content" class="page knowledge-page">
$draft$BodyHtml
    <p class="foot"><a href="$(Esc $homeHref)">Home</a></p>
  </main>
  <script src="/scripts/site-chrome.js" defer></script>
</body>
</html>
"@
  [IO.File]::WriteAllText($OutPath, $html.Replace("`r`n", "`n") + "`n")
}

function Related-Block([string]$baseUp = '../') {
  $doors = $Catalog.related_doors
  $items = @(
    @{ t = 'Projects'; h = $doors.projects },
    @{ t = 'Writing'; h = $doors.writing },
    @{ t = 'Research'; h = $doors.research },
    @{ t = 'Learning'; h = $doors.learning },
    @{ t = 'Books'; h = $doors.books },
    @{ t = 'Timeline'; h = $doors.timeline },
    @{ t = 'Communities'; h = $doors.communities },
    @{ t = 'Gallery'; h = $doors.gallery },
    @{ t = 'Certifications'; h = $doors.certifications },
    @{ t = 'Technologies'; h = $doors.technologies }
  )
  $lis = ($items | ForEach-Object {
    $href = $_.h -replace '^\.\./', $baseUp
    "        <li><a href=`"$(Esc $href)`">$(Esc $_.t)</a></li>"
  }) -join "`n"
  return @"
    <section aria-labelledby="related">
      <h2 id="related">Related</h2>
      <p>Pages grow from the knowledge base. Follow a door when you want the evidence behind this topic.</p>
      <ul class="related-links">
$lis
      </ul>
    </section>
"@
}

$n = 0

# ---- Resumes ----
$resumeDir = Join-Path $Root 'sites\career\resumes'
Ensure-Dir $resumeDir
$versionLis = ($Catalog.resumes | ForEach-Object {
  "        <li><a href=`"./resumes/$($_.slug).html`">$(Esc $_.title)</a></li>"
}) -join "`n"

$careerBody = @"
    <h1>Career</h1>
    <p class="tagline">Work history, resumes, and the timeline that connects them.</p>
    <p>I keep more than one resume because different roles need different evidence. Each version tells a narrower story from the same underlying work. Nothing here invents experience that is not in the knowledge base.</p>
    <section aria-labelledby="resumes">
      <h2 id="resumes">Resumes</h2>
      <ul class="resume-versions">
$versionLis
      </ul>
    </section>
    <section aria-labelledby="also">
      <h2 id="also">Also</h2>
      <ul class="related-links">
        <li><a href="./timeline.html">Timeline</a></li>
        <li><a href="../portfolios/index.html">Portfolios</a></li>
        <li><a href="../projects/index.html">Projects</a></li>
        <li><a href="../contact/index.html">Contact</a></li>
      </ul>
    </section>
"@
Write-Page -OutPath (Join-Path $Root 'sites\career\index.html') -Title "Career; $(Esc $Owner.name)" -Description 'Resumes, timeline, and career evidence.' -BodyHtml $careerBody
$n++

foreach ($r in $Catalog.resumes) {
  $body = @"
    <h1>$(Esc $r.title)</h1>
    <p class="meta"><a href="../index.html">Career</a> · <a href="./index.html">All resumes</a></p>
    <p>$(Esc $r.intro)</p>
    <p class="draft-banner" role="status">Detailed sections will be filled from knowledge/career when experience entities are published. Until then, follow the projects and portfolios linked below.</p>
    <section aria-labelledby="experience">
      <h2 id="experience">Experience</h2>
      <p class="placeholder">Experience entries appear here as they are written into the knowledge base.</p>
    </section>
    <section aria-labelledby="selected-work">
      <h2 id="selected-work">Selected work</h2>
      <ul class="related-links">
        <li><a href="../../projects/index.html">Projects</a></li>
        <li><a href="../../portfolios/index.html">Portfolios</a></li>
        <li><a href="https://github.com/ayushrai-hub" rel="noopener noreferrer">GitHub</a></li>
      </ul>
    </section>
    <section aria-labelledby="education">
      <h2 id="education">Education</h2>
      <p class="placeholder">Education entities appear here when published under knowledge/career/education.</p>
    </section>
    <section aria-labelledby="contact">
      <h2 id="contact">Contact</h2>
      <p><a href="mailto:$(Esc $Owner.email)">$(Esc $Owner.email)</a> · <a href="$(Esc $Owner.github)" rel="noopener noreferrer">GitHub</a> · <a href="$(Esc $Owner.linkedin)" rel="noopener noreferrer">LinkedIn</a></p>
    </section>
"@
  Write-Page -OutPath (Join-Path $resumeDir "$($r.slug).html") -Title "$($r.title); $($Owner.name)" -Description $r.intro -BodyHtml $body
  $n++
}

# Resumes index
$resIdx = @"
    <h1>Resumes</h1>
    <p class="tagline">Multiple versions, one body of evidence.</p>
    <p>Pick the resume that matches the conversation you are having. Each page is a lens on the same work, not a different life.</p>
    <ul class="resume-versions">
$versionLis
    </ul>
"@
Write-Page -OutPath (Join-Path $resumeDir 'index.html') -Title "Resumes; $($Owner.name)" -Description 'All resume versions.' -BodyHtml $resIdx
$n++

# Redirect old resume.html
$oldResume = @"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Resume</title>
  <meta http-equiv="refresh" content="0; url=resumes/resume.html">
  <link rel="stylesheet" href="../../styles/site.css">
</head>
<body>
  <main class="page">
    <p><a href="./resumes/resume.html">Open resume</a></p>
  </main>
</body>
</html>
"@
[IO.File]::WriteAllText((Join-Path $Root 'sites\career\resume.html'), $oldResume.Replace("`r`n", "`n") + "`n")
$n++

# ---- Portfolios ----
$portRoot = Join-Path $Root 'sites\portfolios'
Ensure-Dir $portRoot
$portLis = ($Catalog.portfolios | ForEach-Object {
  "        <li><a href=`"./$($_.slug)/index.html`">$(Esc $_.title)</a> <span class=`"muted`">; $(Esc $_.blurb)</span></li>"
}) -join "`n"

$portIdx = @"
    <h1>Portfolios</h1>
    <p class="tagline">Many lenses on the same body of work.</p>
    <p>There is no single portfolio here. Each page gathers projects, writing, certifications, and notes that belong to one craft. Identity emerges from what shows up on these shelves, not from a title on a banner.</p>
    <ul class="entity-list">
$portLis
    </ul>
"@
Write-Page -OutPath (Join-Path $portRoot 'index.html') -Title "Portfolios; $($Owner.name)" -Description 'Faceted portfolios across crafts and domains.' -BodyHtml $portIdx
$n++

foreach ($p in $Catalog.portfolios) {
  $dir = Join-Path $portRoot $p.slug
  $related = Related-Block -baseUp '../../'
  $body = @"
    <h1>$(Esc $p.title)</h1>
    <p class="tagline">$(Esc $p.blurb)</p>
    <p>What happened in this craft shows up as projects, experiments, and notes. Why it mattered is usually a constraint I had to respect. What I learned becomes the next design choice. How it influences later work is why this page keeps growing.</p>
    <section aria-labelledby="timeline">
      <h2 id="timeline">Timeline</h2>
      <p class="placeholder">Timeline events tagged to this portfolio appear here as knowledge/timeline entities are published.</p>
    </section>
    <section aria-labelledby="projects">
      <h2 id="projects">Projects</h2>
      <p>Start with the <a href="../../projects/index.html">projects index</a>. Showcase repositories that clearly belong here will surface automatically as tagging improves.</p>
    </section>
    <section aria-labelledby="certifications">
      <h2 id="certifications">Certifications</h2>
      <p class="placeholder">Related certifications appear when credential entities link to this portfolio.</p>
    </section>
    <section aria-labelledby="articles">
      <h2 id="articles">Articles and notes</h2>
      <p>See <a href="../../writing/index.html">writing</a> and <a href="../../learning/index.html">learning</a> for durable notes.</p>
    </section>
    <section aria-labelledby="research">
      <h2 id="research">Research and experiments</h2>
      <p>Open questions and experiments live under <a href="../../research/index.html">research</a>.</p>
    </section>
$related
"@
  Write-Page -OutPath (Join-Path $dir 'index.html') -Title "$($p.title) portfolio; $($Owner.name)" -Description $p.blurb -BodyHtml $body
  $n++
}

# ---- Domains ----
$domRoot = Join-Path $Root 'sites\domains'
Ensure-Dir $domRoot
$domLis = ($Catalog.domains | ForEach-Object {
  "        <li><a href=`"./$($_.slug)/index.html`">$(Esc $_.title)</a></li>"
}) -join "`n"

$domIdx = @"
    <h1>Knowledge domains</h1>
    <p class="tagline">Topics I study, practice, and document.</p>
    <p>Each domain page is a doorway. It does not try to teach the whole field. It connects the projects, notes, books, and experiments I have actually touched, and it stays honest about what is still thin.</p>
    <ul class="entity-list">
$domLis
    </ul>
"@
Write-Page -OutPath (Join-Path $domRoot 'index.html') -Title "Knowledge domains; $($Owner.name)" -Description 'Domain index for the personal knowledge system.' -BodyHtml $domIdx
$n++

foreach ($d in $Catalog.domains) {
  $dir = Join-Path $domRoot $d.slug
  $related = Related-Block -baseUp '../../'
  $body = @"
    <h1>$(Esc $d.title)</h1>
    <p class="tagline">A living page for how this domain shows up in my work.</p>
    <p>I came to $(Esc $d.title) the same way I come to most crafts: a problem appeared, I built something, I wrote down what broke, and I tried again. This page collects those traces. When evidence is missing, the section stays empty rather than inventing fluency.</p>
    <section aria-labelledby="what-happened">
      <h2 id="what-happened">What happened</h2>
      <p class="placeholder">Story and timeline entries appear as domain-tagged entities are published.</p>
    </section>
    <section aria-labelledby="projects">
      <h2 id="projects">Projects</h2>
      <p>Browse <a href="../../projects/index.html">projects</a> and the matching <a href="../../portfolios/index.html">portfolios</a>.</p>
    </section>
    <section aria-labelledby="articles">
      <h2 id="articles">Articles and learning notes</h2>
      <p>See <a href="../../writing/index.html">writing</a>, <a href="../../notes/index.html">notes</a>, and <a href="../../learning/index.html">learning</a>.</p>
    </section>
    <section aria-labelledby="research">
      <h2 id="research">Research and experiments</h2>
      <p>Open <a href="../../research/index.html">research</a> for papers, experiments, and findings.</p>
    </section>
    <section aria-labelledby="books">
      <h2 id="books">Books</h2>
      <p>Reading traces live under <a href="../../books/index.html">books</a> and <a href="../../reading/index.html">reading</a>.</p>
    </section>
    <section aria-labelledby="certs">
      <h2 id="certs">Certifications</h2>
      <p>Credentials related to this domain will list under <a href="../../certifications/index.html">certifications</a>.</p>
    </section>
$related
"@
  Write-Page -OutPath (Join-Path $dir 'index.html') -Title "$($d.title); $($Owner.name)" -Description "Knowledge page for $($d.title)." -BodyHtml $body
  $n++
}

# ---- Certifications ----
$certDir = Join-Path $Root 'sites\certifications'
$certBody = @"
    <h1>Certifications</h1>
    <p class="tagline">Credentials with evidence, not badges for decoration.</p>
    <p>Every certification in the knowledge base should name the provider, the issue date, the credential identifier, the skills it claims, the projects that used those skills, and a verification link when one exists. Until a credential is written as an entity, it does not appear here.</p>
    <p>Certificate files: <a href="https://drive.google.com/drive/folders/1rO4e2Ve77dDyb4Yr_iOR61NJvVcxpHi5?usp=sharing" rel="noopener noreferrer">Google Drive folder</a>.</p>
    <section aria-labelledby="list">
      <h2 id="list">Published credentials</h2>
      <p class="placeholder">No certification entities are published yet. Add them under knowledge/certifications using the certification template.</p>
    </section>
    <section aria-labelledby="how">
      <h2 id="how">How a certification is recorded</h2>
      <ul>
        <li>Provider</li>
        <li>Issue date</li>
        <li>Credential id and verification URL</li>
        <li>Skills and related domains</li>
        <li>Projects that exercised those skills</li>
        <li>Certificate media and evidence notes</li>
      </ul>
    </section>
"@
Write-Page -OutPath (Join-Path $certDir 'index.html') -Title "Certifications; $($Owner.name)" -Description 'Certification knowledge index.' -BodyHtml $certBody
$n++

# ---- Technologies ----
$techDir = Join-Path $Root 'sites\technologies'
$techBody = @"
    <h1>Technologies</h1>
    <p class="tagline">Tools and platforms as first-class knowledge entities.</p>
    <p>Each technology page should explain where I used it, what broke, what I would repeat, and which projects prove the claim. Technology names alone are not evidence.</p>
    <p>Browse related <a href="../domains/index.html">domains</a> and <a href="../projects/index.html">projects</a> while entity pages are written.</p>
"@
Write-Page -OutPath (Join-Path $techDir 'index.html') -Title "Technologies; $($Owner.name)" -Description 'Technology knowledge index.' -BodyHtml $techBody
$n++

# ---- Media ----
$mediaDir = Join-Path $Root 'sites\media'
$mediaBody = @"
    <h1>Media</h1>
    <p class="tagline">Images, certificates, slides, videos, and diagrams with metadata.</p>
    <p>Media items are knowledge entities. They carry captions, dates, licenses, and relationships to projects, talks, and people. The <a href="../gallery/index.html">gallery</a> is the photographic doorway; this page is the broader media index.</p>
    <ul class="related-links">
      <li><a href="../gallery/index.html">Gallery</a></li>
      <li><a href="../speaking/index.html">Speaking and slides</a></li>
      <li><a href="../certifications/index.html">Certificates</a></li>
    </ul>
"@
Write-Page -OutPath (Join-Path $mediaDir 'index.html') -Title "Media; $($Owner.name)" -Description 'Media knowledge index.' -BodyHtml $mediaBody
$n++

Write-Output "Generated $n pages from site-catalog.json"
