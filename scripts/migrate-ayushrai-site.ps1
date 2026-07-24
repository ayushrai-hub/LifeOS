#Requires -Version 5.1
<#
  Generate independent migrated HTML pages from the ayushrai.site crawl.
  Pages live under sites/migrated/ and are NOT linked from sites/www.
#>
$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $PSScriptRoot
$Base = Join-Path $Root 'sites\migrated'
$SourceNote = 'Source: https://www.ayushrai.site/ (crawled 2026-07-23). Marketing fluff and empty aggregate metrics removed. Claims retained only as published there.'

function Esc([string]$s) {
  if ($null -eq $s) { return '' }
  return ($s -replace '&', '&amp;' -replace '<', '&lt;' -replace '>', '&gt;' -replace '"', '&quot;')
}

function Write-MigPage {
  param(
    [string]$RelPath,
    [string]$Title,
    [string]$Description,
    [string]$Body,
    [int]$Depth = 1
  )
  $up = '../' * ($Depth + 1)  # to repo root from sites/migrated/...
  # Depth: migrated/index=1 -> ../../styles; migrated/x/index=2 -> ../../../styles; migrated/x/y.html depth 2
  $css = ('../' * ($Depth + 1)) + 'styles/site.css'
  $inv = ('../' * ($Depth - 1)) + 'index.html'
  if ($Depth -eq 1) { $inv = './index.html' }

  $out = Join-Path $Base $RelPath
  New-Item -ItemType Directory -Force -Path (Split-Path $out) | Out-Null

  $html = @"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>$(Esc $Title)</title>
  <meta name="description" content="$(Esc $Description)">
  <meta name="author" content="Ayush Rai">
  <meta name="robots" content="noindex,follow">
  <meta name="theme-color" content="#ffffff">
  <link rel="stylesheet" href="$(Esc $css)">
</head>
<body>
  <a class="skip-link" href="#content">Skip to content</a>
  <main id="content" class="page knowledge-page">
    <p class="meta"><a href="$(Esc $inv)">Migrated content index</a></p>
    <p class="draft-banner" role="status">$(Esc $SourceNote)</p>
$Body
  </main>
</body>
</html>
"@
  [IO.File]::WriteAllText($out, ($html -replace "`r`n", "`n") + "`n")
}

$n = 0

# ---- Inventory index ----
$indexBody = @'
    <h1>Migrated content</h1>
    <p class="tagline">Independent pages extracted from ayushrai.site. Not linked from the public homepage yet.</p>
    <p>Each page keeps published facts, rewritten for clarity. Empty marketing metrics and vague slogans were dropped. Connect these later with contextual inline links.</p>
    <section aria-labelledby="people">
      <h2 id="people">Person</h2>
      <ul class="entity-list">
        <li><a href="./about/index.html">About</a></li>
        <li><a href="./contact/index.html">Contact</a></li>
        <li><a href="./skills/index.html">Skills</a></li>
        <li><a href="./timeline/index.html">Timeline</a></li>
      </ul>
    </section>
    <section aria-labelledby="career">
      <h2 id="career">Career</h2>
      <ul class="entity-list">
        <li><a href="./experience/index.html">Experience</a></li>
        <li><a href="./education/index.html">Education</a></li>
      </ul>
    </section>
    <section aria-labelledby="work">
      <h2 id="work">Work</h2>
      <ul class="entity-list">
        <li><a href="./projects/index.html">Projects</a></li>
        <li><a href="./products/index.html">Products</a></li>
        <li><a href="./services/index.html">Services</a></li>
        <li><a href="./research/index.html">Research</a></li>
        <li><a href="./certifications/index.html">Certifications</a></li>
        <li><a href="./awards/index.html">Awards</a></li>
      </ul>
    </section>
    <section aria-labelledby="community">
      <h2 id="community">Community</h2>
      <ul class="entity-list">
        <li><a href="./leadership/index.html">Leadership</a></li>
        <li><a href="./extracurriculars/index.html">Extra-curriculars</a></li>
      </ul>
    </section>
'@
Write-MigPage -RelPath 'index.html' -Title 'Migrated content' -Description 'Inventory of pages migrated from ayushrai.site' -Body $indexBody -Depth 1
$n++

# ---- About ----
$about = @'
    <h1>About</h1>
    <p>Ayush Rai works on software and applied AI systems. Public materials describe roles spanning AI engineering, full-stack web development, and community leadership.</p>
    <p>As of the source site: dual study paths at Lakshmi Narain College of Technology and Science (LNCTS), Bhopal, and the Indian Institute of Technology Madras (IIT Madras) BS Data Science and Applications program. Location listed as Bhopal, India, with remote work available.</p>
    <section aria-labelledby="focus">
      <h2 id="focus">Published focus areas</h2>
      <ul>
        <li>Reinforcement Learning from Human Feedback (RLHF) and related evaluation work</li>
        <li>Generative AI / LLM tooling</li>
        <li>Full-stack web development</li>
        <li>Data science coursework and projects</li>
      </ul>
    </section>
'@
Write-MigPage -RelPath 'about\index.html' -Title 'About; Ayush Rai' -Description 'Factual about page migrated from ayushrai.site' -Body $about -Depth 2
$n++

# ---- Contact ----
$contact = @'
    <h1>Contact</h1>
    <p>Channels published on ayushrai.site:</p>
    <ul>
      <li>Email: <a href="mailto:ayushrai0211@gmail.com">ayushrai0211@gmail.com</a></li>
      <li>Phone / WhatsApp: <a href="https://api.whatsapp.com/send/?phone=7440567944&amp;text&amp;type=phone_number&amp;app_absent=0" rel="noopener noreferrer">+91-7440567944</a></li>
      <li>Scheduling: <a href="https://cal.com/ayush-rai-02" rel="noopener noreferrer">cal.com/ayush-rai-02</a></li>
      <li>Location: Bhopal, India (remote available)</li>
      <li>Response time claimed on site: within 24 hours</li>
    </ul>
    <p>Selected public profiles linked from the site bundle:</p>
    <ul>
      <li><a href="https://github.com/ayushrai-hub" rel="noopener noreferrer">GitHub</a></li>
      <li><a href="https://www.linkedin.com/in/ayushrai02/" rel="noopener noreferrer">LinkedIn</a></li>
      <li><a href="https://x.com/AyushRai0211" rel="noopener noreferrer">X</a></li>
      <li><a href="https://orcid.org/0009-0005-7341-7856" rel="noopener noreferrer">ORCID</a></li>
      <li><a href="https://huggingface.co/ayushrai02" rel="noopener noreferrer">Hugging Face</a></li>
      <li><a href="https://www.kaggle.com/ayushrai02" rel="noopener noreferrer">Kaggle</a></li>
      <li><a href="https://medium.com/@ayushrai0211" rel="noopener noreferrer">Medium</a></li>
      <li><a href="https://substack.com/@ayushrai02" rel="noopener noreferrer">Substack</a></li>
      <li><a href="https://linktr.ee/ayush_rai02" rel="noopener noreferrer">Linktree</a></li>
    </ul>
    <p class="muted">Note: the knowledge base also records Proton Mail (<a href="mailto:ayushrai0211@proton.me">ayushrai0211@proton.me</a>) as a contact channel. Both addresses appear in different sources.</p>
'@
Write-MigPage -RelPath 'contact\index.html' -Title 'Contact; Ayush Rai' -Description 'Contact channels from ayushrai.site' -Body $contact -Depth 2
$n++

# ---- Skills ----
$skills = @'
    <h1>Skills</h1>
    <p>Skill labels published on the source site, grouped as shown there. These are self-described tags, not measured proficiency claims.</p>
    <section aria-labelledby="ai"><h2 id="ai">AI and ML</h2><ul><li>Python</li><li>LLMs</li><li>PyTorch</li><li>Prompt engineering</li></ul></section>
    <section aria-labelledby="web"><h2 id="web">Web development</h2><ul><li>React</li><li>TypeScript</li><li>Node.js</li><li>JavaScript</li></ul></section>
    <section aria-labelledby="ds"><h2 id="ds">Data science</h2><ul><li>SQL</li><li>Pandas</li><li>NumPy</li><li>Tableau</li></ul></section>
    <section aria-labelledby="cloud"><h2 id="cloud">Cloud and DevOps</h2><ul><li>AWS</li><li>Docker</li><li>Git</li><li>CI/CD</li></ul></section>
    <section aria-labelledby="lead"><h2 id="lead">Leadership</h2><ul><li>Team management</li><li>Project management</li><li>Mentoring</li><li>Strategy</li></ul></section>
    <section aria-labelledby="creative"><h2 id="creative">Other listed</h2><ul><li>Problem solving</li><li>Innovation</li><li>Design thinking</li><li>Communication</li></ul></section>
'@
Write-MigPage -RelPath 'skills\index.html' -Title 'Skills; Ayush Rai' -Description 'Skill labels from ayushrai.site' -Body $skills -Depth 2
$n++

# Experience data
$experiences = @(
  @{ slug='focdot-sde-ai-engineer'; title='SDE; AI Engineer'; org='FoCDoT Technologies Pvt. Ltd'; type='Full-time'; status='Current'; dates='Apr 2024; Present'; loc='Remote'; bullets=@('Work focused on Reinforcement Learning from Human Feedback (RLHF).','Collaboration listed with Turing, OpenAI, ScaleAI, and Outlier.','STEM analysis work described as improving model reliability and performance.'); tech=@('Python','RLHF','Machine Learning','AI Development') },
  @{ slug='outlier-generative-ai-engineer'; title='Generative AI Engineer'; org='Outlier'; type='Part-time'; status='Current'; dates='Aug 2025; Present'; loc='Remote'; bullets=@('LLM training datasets and optimization strategies.','Prompting strategies for Python and JavaScript.','Code review, testing, and debugging.'); tech=@('Python','JavaScript','LLMs','Prompt Engineering') },
  @{ slug='rasor-iitm-web-developer'; title='Web Developer'; org='RaSoR; IITM'; type='Internship'; status='Ended'; dates='Dec 2023; Ended'; loc='Chennai, India'; bullets=@('Responsive web applications for research initiatives.','Technical documentation with research teams.','Modern web technologies.'); tech=@('React','TypeScript','Node.js','Web Development') },
  @{ slug='uipath-student-developer-champion'; title='Student Developer Champion'; org='UiPath'; type='Leadership Internship'; status='Ended'; dates='July 2022; July 2023'; loc='Remote'; bullets=@('Community initiatives and technical workshops.','Mentoring in automation and RPA.','Hackathons and coding competitions.'); tech=@('UiPath','RPA','Community Management','Workshop Delivery') },
  @{ slug='salesforce-virtual-intern'; title='Virtual Intern'; org='Salesforce'; type='Internship'; status='Ended'; dates='Oct 2022; Dec 2022'; loc='Remote'; bullets=@('CRM and cloud computing projects.','Salesforce ecosystem practices.','Custom applications on the Salesforce platform.'); tech=@('Salesforce','CRM','Cloud Computing','Apex') },
  @{ slug='kanha-house-webops'; title='WebOps Member'; org='Kanha House, IITM'; type='Part-time'; status='Ended'; dates='Sept 2022; July 2023'; loc='Chennai, India'; bullets=@('House website and digital infrastructure.','Social media and content.','Technical coordination for house events.'); tech=@('Web Development','Social Media Management','Content Creation') }
)

$expLis = ($experiences | ForEach-Object { "        <li><a href=`"./$($_.slug).html`">$(Esc $_.title)</a> <span class=`"muted`">; $(Esc $_.org)</span></li>" }) -join "`n"
Write-MigPage -RelPath 'experience\index.html' -Title 'Experience; Ayush Rai' -Description 'Work experience migrated from ayushrai.site' -Body @"
    <h1>Experience</h1>
    <p>Roles published on the source site.</p>
    <ul class="entity-list">
$expLis
    </ul>
"@ -Depth 2
$n++

foreach ($e in $experiences) {
  $bul = ($e.bullets | ForEach-Object { "        <li>$(Esc $_)</li>" }) -join "`n"
  $tec = ($e.tech | ForEach-Object { "        <li>$(Esc $_)</li>" }) -join "`n"
  Write-MigPage -RelPath "experience\$($e.slug).html" -Title "$($e.title); $($e.org)" -Description "$($e.title) at $($e.org)" -Body @"
    <h1>$(Esc $e.title)</h1>
    <p class="meta">$(Esc $e.org) · $(Esc $e.type) · $(Esc $e.status) · $(Esc $e.dates) · $(Esc $e.loc)</p>
    <section aria-labelledby="work"><h2 id="work">Published responsibilities</h2><ul>
$bul
    </ul></section>
    <section aria-labelledby="tech"><h2 id="tech">Technologies listed</h2><ul>
$tec
    </ul></section>
"@ -Depth 2
  $n++
}

# Education
$edus = @(
  @{ slug='btech-cse-lncts'; title='B.Tech Computer Science Engineering'; school='Lakshmi Narain College of Technology and Science, Bhopal'; kind='Primary Degree'; dates='Sept 2020; July 2024'; score='8.47/10.0'; courses=@('Operating Systems','Database Management Systems','Computer Networks','Data Structures and Algorithms','Software Engineering','Computer Architecture') },
  @{ slug='bs-data-science-iitm'; title='BS Data Science and Applications'; school='Indian Institute of Technology, Madras'; kind='Parallel Degree'; dates='2021; 2024'; score='6.86/10.0'; courses=@('Statistics','Computational Thinking','DBMS','Advanced Mathematics','Machine Learning','Data Analytics') },
  @{ slug='higher-secondary-seoni'; title='Higher Secondary (PCM)'; school='Mission English Higher Secondary School, Seoni'; kind='Foundation'; dates='2019; 2020'; score='78.2%'; courses=@('Physics','Chemistry','Mathematics','English','Computer Science') }
)
$eduLis = ($edus | ForEach-Object { "        <li><a href=`"./$($_.slug).html`">$(Esc $_.title)</a></li>" }) -join "`n"
Write-MigPage -RelPath 'education\index.html' -Title 'Education; Ayush Rai' -Description 'Education migrated from ayushrai.site' -Body @"
    <h1>Education</h1>
    <ul class="entity-list">
$eduLis
    </ul>
"@ -Depth 2
$n++
foreach ($e in $edus) {
  $c = ($e.courses | ForEach-Object { "        <li>$(Esc $_)</li>" }) -join "`n"
  Write-MigPage -RelPath "education\$($e.slug).html" -Title "$($e.title)" -Description $e.school -Body @"
    <h1>$(Esc $e.title)</h1>
    <p class="meta">$(Esc $e.kind) · $(Esc $e.school) · $(Esc $e.dates) · $(Esc $e.score)</p>
    <section aria-labelledby="cw"><h2 id="cw">Coursework listed</h2><ul>
$c
    </ul></section>
"@ -Depth 2
  $n++
}

# Projects
$projects = @(
  @{ slug='overlay-text-box-extension'; title='Overlay Text Box Extension'; cat='Browser Extension and Web Development'; dates='2024; Present'; summary='Chrome extension that overlays a text box to simulate character-by-character typing into webpage fields. Aimed at form filling, testing, and accessibility.'; tech=@('JavaScript','HTML','Chrome Extension API','Manifest V3'); features=@('Resizable overlay text area','Trigger button next to clicked text fields','Start and stop controls','Works across websites') },
  @{ slug='personal-portfolio-website'; title='Personal Portfolio Website'; cat='Web Development'; dates='2024; Present'; summary='Single-page portfolio covering Generative AI, web development, and data science sections, with contact form integration.'; tech=@('Next.js','React','TypeScript','Tailwind CSS'); features=@('Sections for about, skills, projects, education, experience, certifications, contact','Performance, accessibility, and SEO focus described on source site') },
  @{ slug='expert-o'; title='Expert-O'; cat='AI and Digital Innovation'; dates='2024; Present'; summary='Public site for a collective described as combining technology, design, strategy, and AI workflows. Presents mission, services, portfolio, pricing, writing, and recruitment.'; tech=@('Next.js','React','TypeScript','Tailwind CSS'); features=@('Marketing and recruitment surfaces','AI-augmented delivery framing on source site') },
  @{ slug='shiksha-mitra'; title='Shiksha-Mitra'; cat='Community and Education Platform'; dates='building'; summary='Digital platform for personal growth and mutual accountability; paired Mitra relationships with check-ins, goals, and shared support.'; tech=@('React','TypeScript','Vite','Tailwind CSS'); features=@('Daily check-ins, goals, journal, shared todo','Landing and Find Mitra flows','Theme context and componentized sections'); live='https://shiksha-mitra.vercel.app/'; repo='https://github.com/ayushrai-hub/Shiksha-Mitra' },
  @{ slug='my-learning'; title='my-learning'; cat='Curriculum and Education'; dates='2025; Present'; summary='Tech-Arsenal and Karm curriculum pathways for product-oriented systems engineers (full-stack, platform/DevOps, ML/AI).'; tech=@('Markdown','Python'); features=@('Modular Tech-Arsenal curriculum','Karm advanced pathway framing','Curated resources and competency tables'); repo='https://github.com/ayushrai-hub/my-learning' },
  @{ slug='iha-by-himani-art-studio'; title='Iha-By-Himani Art Studio Website'; cat='Web Development'; dates='Jan; Feb 2023'; summary='Responsive website for an art studio: artwork, services, and client contact.'; tech=@('React','TypeScript','CSS Modules','Framer Motion'); features=@('Portfolio gallery','Animation-oriented UI on source site') },
  @{ slug='praful-h-professional-website'; title='Praful H. Professional Website'; cat='Enterprise Portfolio'; dates='2024'; summary='Professional site for a UK-based technology leader, emphasizing enterprise architecture and digital innovation experience.'; tech=@('React','TypeScript','Python','TensorFlow'); features=@('Responsive layout','SEO and performance emphasis on source site') }
)
$projLis = ($projects | ForEach-Object { "        <li><a href=`"./$($_.slug).html`">$(Esc $_.title)</a></li>" }) -join "`n"
Write-MigPage -RelPath 'projects\index.html' -Title 'Projects; Ayush Rai' -Description 'Projects migrated from ayushrai.site' -Body @"
    <h1>Projects</h1>
    <ul class="entity-list">
$projLis
    </ul>
"@ -Depth 2
$n++
foreach ($p in $projects) {
  $t = ($p.tech | ForEach-Object { "        <li>$(Esc $_)</li>" }) -join "`n"
  $f = ($p.features | ForEach-Object { "        <li>$(Esc $_)</li>" }) -join "`n"
  $links = ''
  if ($p.live -or $p.repo) {
    $parts = @()
    if ($p.live) { $parts += "<a href=`"$(Esc $p.live)`" rel=`"noopener noreferrer`">Live site</a>" }
    if ($p.repo) { $parts += "<a href=`"$(Esc $p.repo)`" rel=`"noopener noreferrer`">GitHub</a>" }
    $links = "    <p>`n      $($parts -join '`n      ·`n      ')`n    </p>`n"
  }
  Write-MigPage -RelPath "projects\$($p.slug).html" -Title $p.title -Description $p.summary -Body @"
    <h1>$(Esc $p.title)</h1>
    <p class="meta">$(Esc $p.cat) · $(Esc $p.dates)</p>
    <p>$(Esc $p.summary)</p>
$links    <section aria-labelledby="tech"><h2 id="tech">Tech listed</h2><ul>
$t
    </ul></section>
    <section aria-labelledby="feat"><h2 id="feat">Features listed</h2><ul>
$f
    </ul></section>
"@ -Depth 2
  $n++
}

# Products
$products = @(
  @{ slug='shiksha-mitra'; title='Shiksha-Mitra'; status='Building'; kind='Mutual-accountability growth companion'; summary='Digital platform for personal growth and mutual accountability; paired Mitra relationships with check-ins, goals, and shared support.'; stack='React, TypeScript, Vite, Tailwind CSS'; live='https://shiksha-mitra.vercel.app/'; repo='https://github.com/ayushrai-hub/Shiksha-Mitra' },
  @{ slug='revenueroles'; title='RevenueRoles'; status='Building (Alpha)'; kind='Technical revenue intelligence / job board'; summary='Specialized discovery for technical revenue roles such as GTM Engineer, FDE, and RevOps.'; stack='Monorepo; web app under apps/web'; live='https://revenueroles.in/'; repo='https://github.com/ayushrai-hub/RevenueRoles/tree/main/apps/web' },
  @{ slug='the-open-framework'; title='The Open Framework'; status='In Progress'; kind='Digital Public Infrastructure (DPI)'; summary='National-scale DPI concept for India NGOs/CSOs, donors, talent, and policy stakeholders. Aimed at fragmentation, compliance, and trust issues in civil society.'; overview=@('Federated, consent-driven public utility concept','Neutral digital layer connecting NGOs, donors, talent, and policymakers','Designed as a long-lived institutional system'); stack='Frontend: Next.js, TypeScript (strict), Tailwind with design tokens, Radix UI. Backend: NestJS or Spring Boot, REST and OpenAPI. Auth: OAuth 2.0, RBAC, progressive verification. Data: PostgreSQL, S3-compatible storage, immutable audit logs.' },
  @{ slug='ayush-mushrooms'; title='AyushMushrooms'; status='In Progress'; kind='Agrotech brand website (MVP)'; summary='Multi-page marketing site for an organic mushroom and spawn cultivation brand. SEO-first MVP for products, services, expert profile, and training, with future B2B and ecommerce expansion planned.'; features=@('Multi-page responsive marketing site','CMS-managed products, services, blogs, and gallery','Contact form to CMS lead plus auto-generated PDF datasheet','CRM integration via webhook'); stack='Frontend: Next.js (React). Styling: Tailwind CSS. CMS: headless (Sanity or Strapi). Backend: serverless APIs.' }
)
$prodLis = ($products | ForEach-Object { "        <li><a href=`"./$($_.slug).html`">$(Esc $_.title)</a></li>" }) -join "`n"
Write-MigPage -RelPath 'products\index.html' -Title 'Products; Ayush Rai' -Description 'Products migrated from ayushrai.site' -Body @"
    <h1>Products and platforms</h1>
    <ul class="entity-list">
$prodLis
    </ul>
"@ -Depth 2
$n++
foreach ($p in $products) {
  $extra = ''
  if ($p.overview) {
    $o = ($p.overview | ForEach-Object { "        <li>$(Esc $_)</li>" }) -join "`n"
    $extra += "<section aria-labelledby=`"ov`"><h2 id=`"ov`">Overview points</h2><ul>`n$o`n    </ul></section>`n"
  }
  if ($p.features) {
    $f = ($p.features | ForEach-Object { "        <li>$(Esc $_)</li>" }) -join "`n"
    $extra += "<section aria-labelledby=`"ft`"><h2 id=`"ft`">Features listed</h2><ul>`n$f`n    </ul></section>`n"
  }
  $links = ''
  if ($p.live -or $p.repo) {
    $parts = @()
    if ($p.live) { $parts += "<a href=`"$(Esc $p.live)`" rel=`"noopener noreferrer`">Live site</a>" }
    if ($p.repo) { $parts += "<a href=`"$(Esc $p.repo)`" rel=`"noopener noreferrer`">GitHub</a>" }
    $links = "    <p>`n      $($parts -join ' · ')`n    </p>`n"
  }
  Write-MigPage -RelPath "products\$($p.slug).html" -Title $p.title -Description $p.summary -Body @"
    <h1>$(Esc $p.title)</h1>
    <p class="meta">$(Esc $p.kind) · $(Esc $p.status)</p>
    <p>$(Esc $p.summary)</p>
$links$extra
    <section aria-labelledby="stack"><h2 id="stack">Tech stack listed</h2><p>$(Esc $p.stack)</p></section>
"@ -Depth 2
  $n++
}

# Certifications
$certs = @(
  @{ slug='30-days-of-google-cloud'; title='30 Days of Google Cloud'; provider='Google Cloud'; dates='2020; 2024'; cat='Cloud Computing'; desc='Google Cloud training program.'; skills=@('Python','Google Cloud','ML','Data Analysis'); link='https://drive.google.com/file/d/1VCcOhp_OW1qVUVbB5pUadznZuceHxLzF/view?usp=sharing' },
  @{ slug='cyberops-associate'; title='CyberOps Associate'; provider='Cisco Networking Academy'; dates='4 Jul 2023'; cat='Cybersecurity'; desc='Cybersecurity operations topics including threat analysis, incident response, and network monitoring.'; skills=@('Cyber Security','Network Security','Incident Response','Virtual Machines','Windows OS','Linux OS'); link='https://drive.google.com/file/d/1cYU351AbShDaJlv8z8pAyaV2CmuKMHq9/view?usp=sharing' },
  @{ slug='leadership-and-talent-management'; title='Leadership and Talent Management'; provider='Lakshmi Narain College of Technology and Science, Bhopal'; dates='11 May 2021'; cat='Leadership'; desc='Leadership and talent management training.'; skills=@('Leadership'); link='https://drive.google.com/file/d/1KLQRhZWKtZP3wUTHWhpk1aBBVOUhiKL-/view' },
  @{ slug='introduction-to-machine-learning-aws'; title='Introduction to Machine Learning'; provider='AWS Training and Certification'; dates='27 April 2021'; cat='Machine Learning'; desc='AWS machine learning fundamentals.'; skills=@('Machine Learning'); link='https://drive.google.com/file/d/1LHtAR2zdBEUHYe1oQC_ZNeeO1-UQ4YCQ/view' },
  @{ slug='introduction-to-packet-tracer'; title='Introduction to Packet Tracer'; provider='Cisco Networking Academy'; dates='25 Jan 2023'; cat='Cybersecurity'; desc='Network simulation fundamentals using Packet Tracer.'; skills=@('Cyber Security'); link='https://drive.google.com/file/d/1_CIDIlPRbNR9rhwgaAFLQlRe9rJqC_qN/view?usp=sharing' },
  @{ slug='introduction-to-cybersecurity'; title='Introduction to Cybersecurity'; provider='Cisco Networking Academy'; dates='10 Feb 2023'; cat='Cybersecurity'; desc='Introductory cybersecurity principles.'; skills=@('Cyber Security'); link='https://drive.google.com/file/d/1dR5JkyQiC66W5lu_7c9PJbhNccVoCMDT/view?usp=sharing' },
  @{ slug='foundations-data-everywhere'; title='Foundations: Data, Everywhere'; provider='Coursera'; dates='4 Mar 2022'; cat='Data Science'; desc='Foundational data and analytics course certificate.'; skills=@('Data Science'); link='https://drive.google.com/file/d/1SdTEH72nLWGtL50vYh_tH7Fhj_JJ881J/view?usp=sharing' }
)
$certLis = ($certs | ForEach-Object { "        <li><a href=`"./$($_.slug).html`">$(Esc $_.title)</a></li>" }) -join "`n"
Write-MigPage -RelPath 'certifications\index.html' -Title 'Certifications; Ayush Rai' -Description 'Certifications migrated from ayushrai.site' -Body @"
    <h1>Certifications</h1>
    <p>Seven credentials listed on the source site, with Drive verification links where published.</p>
    <p>All certificate files: <a href="https://drive.google.com/drive/folders/1rO4e2Ve77dDyb4Yr_iOR61NJvVcxpHi5?usp=sharing" rel="noopener noreferrer">Google Drive folder</a>.</p>
    <ul class="entity-list">
$certLis
    </ul>
"@ -Depth 2
$n++
foreach ($c in $certs) {
  $sk = ($c.skills | ForEach-Object { "        <li>$(Esc $_)</li>" }) -join "`n"
  Write-MigPage -RelPath "certifications\$($c.slug).html" -Title $c.title -Description $c.desc -Body @"
    <h1>$(Esc $c.title)</h1>
    <p class="meta">$(Esc $c.provider) · $(Esc $c.dates) · $(Esc $c.cat)</p>
    <p>$(Esc $c.desc)</p>
    <section aria-labelledby="sk"><h2 id="sk">Skills listed</h2><ul>
$sk
    </ul></section>
    <p><a href="$(Esc $c.link)" rel="noopener noreferrer">Verification / certificate file</a></p>
"@ -Depth 2
  $n++
}

# Research
$research = @(
  @{ slug='ai-powered-agricultural-advisory'; title='AI-Powered Agricultural Advisory System'; org='IIT Madras BS Program'; dates='Jan 2024; Present'; summary='AI system for farming recommendations using satellite imagery, soil sensors, and weather data.'; tech=@('Python','TensorFlow','Satellite API','Computer Vision'); claim='Source site states: prototype deployed for 20+ farmers; 85% prediction accuracy claimed.' },
  @{ slug='nlp-legal-document-analysis'; title='NLP for Legal Document Analysis'; org='LNCT Internal Research Grant'; dates='Aug 2023; Dec 2023'; summary='NLP pipelines for analysis of legal contracts and regulatory documents.'; tech=@('Python','Transformers','Legal NLP','BERT'); claim='Source site states: document processing time reduced by 60%; 10,000+ legal documents analyzed.' },
  @{ slug='smart-campus-energy-management'; title='Smart Campus Energy Management'; org='Bhopal Smart City Initiative'; dates='Mar 2023; Aug 2023'; summary='IoT energy monitoring and optimization for campus buildings.'; tech=@('IoT','Machine Learning','Sensor Networks','Web Dashboard'); claim='Source site states: 15% energy savings; real-time monitoring dashboard developed.' }
)
$resLis = ($research | ForEach-Object { "        <li><a href=`"./$($_.slug).html`">$(Esc $_.title)</a></li>" }) -join "`n"
Write-MigPage -RelPath 'research\index.html' -Title 'Research; Ayush Rai' -Description 'Research items migrated from ayushrai.site' -Body @"
    <h1>Research</h1>
    <p>Projects listed on the research route. Quantitative claims are quoted from the source site and are not independently verified here.</p>
    <ul class="entity-list">
$resLis
    </ul>
"@ -Depth 2
$n++
foreach ($r in $research) {
  $t = ($r.tech | ForEach-Object { "        <li>$(Esc $_)</li>" }) -join "`n"
  Write-MigPage -RelPath "research\$($r.slug).html" -Title $r.title -Description $r.summary -Body @"
    <h1>$(Esc $r.title)</h1>
    <p class="meta">$(Esc $r.org) · $(Esc $r.dates)</p>
    <p>$(Esc $r.summary)</p>
    <section aria-labelledby="tech"><h2 id="tech">Technologies listed</h2><ul>
$t
    </ul></section>
    <p class="muted">$(Esc $r.claim)</p>
"@ -Depth 2
  $n++
}

# Awards
$awardsBody = @'
    <h1>Awards</h1>
    <p>Awards listed on the research page of the source site. Not independently verified in this repository.</p>
    <ul>
      <li><strong>2024.</strong> Top 5 Finalist; Smart India Hackathon 2024 (Ministry of Education, Government of India). Team of 4; blockchain-based voting system described.</li>
      <li><strong>2023.</strong> Best Research Paper Award; National Conference on Emerging Technologies. Topic listed: federated learning in healthcare.</li>
      <li><strong>2023.</strong> ACM Student Research Competition Finalist; CCSE 2023. Source site states selection among 20 finalists from 120+ submissions.</li>
    </ul>
'@
Write-MigPage -RelPath 'awards\index.html' -Title 'Awards; Ayush Rai' -Description 'Awards listed on ayushrai.site' -Body $awardsBody -Depth 2
$n++

# Leadership roles
$leads = @(
  @{ slug='tech-innovation-hub-coordinator'; title='Tech Innovation Hub Coordinator'; org='University Technology Center'; dates='Jan 2023; Dec 2023'; role='Innovation Coordinator and Student Mentor'; bullets=@('University-wide innovation programs','Mentored students in emerging technologies (source cites 100+)','Organized tech workshops and hackathons (source cites 20+)','Innovation culture among students (source cites 500+)') },
  @{ slug='gdsc-lead'; title='Google Developer Student Club Lead'; org='Google Developer Student Clubs'; dates='Aug 2022; Present'; role='Chapter Lead and Technical Mentor'; bullets=@('Developer community (source cites 200+)','Workshops on modern technologies (source cites 50+)','Google Cloud Study Jams','Students reached (source cites 1000+)') },
  @{ slug='digital-skills-training-coordinator'; title='Digital Skills Training Coordinator'; org='Community Education Foundation'; dates='Mar 2023; Present'; role='Training Coordinator and Community Educator'; bullets=@('Digital literacy programs','Individuals trained (source cites 200+)','Online learning resources','Underserved community focus') },
  @{ slug='microsoft-learn-student-ambassador'; title='Microsoft Learn Student Ambassador'; org='Microsoft for Students'; dates='Jan 2024; Present'; role='Regional Ambassador and Content Creator'; bullets=@('Technical content pieces (source cites 20+)','Students trained on Azure and AI (source cites 100+)','Azure hackathons') },
  @{ slug='open-source-workshop-series'; title='Open Source Workshop Series'; org='LNCT and S Bandhavgarh University'; dates='Sept 2022; Dec 2024'; role='Workshop Conductor and Mentor'; bullets=@('Open source workshops (source cites 25+)','Contributors mentored (source cites 500+)','University open source communities') },
  @{ slug='community-tech-outreach'; title='Community Tech Outreach Program'; org='Local Government Technology Department'; dates='Jun 2023; Present'; role='Technology Outreach Coordinator'; bullets=@('Community technology education programs','School partnerships for digital literacy','Technology access initiatives') }
)
$leadLis = ($leads | ForEach-Object { "        <li><a href=`"./$($_.slug).html`">$(Esc $_.title)</a></li>" }) -join "`n"
Write-MigPage -RelPath 'leadership\index.html' -Title 'Leadership; Ayush Rai' -Description 'Community leadership from ayushrai.site' -Body @"
    <h1>Community leadership</h1>
    <p>Roles and events from the leadership route. Participant counts are as published on the source site.</p>
    <ul class="entity-list">
$leadLis
    </ul>
    <section aria-labelledby="events"><h2 id="events">Workshops and events listed</h2>
    <ul>
      <li>Feb 2024; AI/ML Bootcamp for Beginners; LNCT University, Bhopal; source cites 150 participants</li>
      <li>Jan 2024; Women in Tech Career Workshop; IIT Madras and virtual; source cites 80 participants</li>
      <li>Dec 2023; Cross-border Tech Innovation Summit; Taiwan; India virtual; source cites 300 participants</li>
      <li>Nov 2023; Open Source Contribution Drive; multiple universities; source cites 200 participants</li>
      <li>Oct 2023; AI Ethics and Responsible AI Workshop; various institutes; source cites 120 participants</li>
    </ul></section>
"@ -Depth 2
$n++
foreach ($l in $leads) {
  $b = ($l.bullets | ForEach-Object { "        <li>$(Esc $_)</li>" }) -join "`n"
  Write-MigPage -RelPath "leadership\$($l.slug).html" -Title $l.title -Description $l.org -Body @"
    <h1>$(Esc $l.title)</h1>
    <p class="meta">$(Esc $l.org) · $(Esc $l.dates) · $(Esc $l.role)</p>
    <ul>
$b
    </ul>
"@ -Depth 2
  $n++
}

# Extracurriculars
$extras = @(
  @{ slug='beyond-the-words'; title='Beyond The Words'; cat='Events'; dates='Apr 2022; May 2022'; summary='Open mic event at IIT Madras.'; skills=@('Leadership','Team Management','Excel','Communication') },
  @{ slug='bachpanshala'; title='BachpanShala'; cat='Social Work'; dates='June 2022; Jan 2023'; summary='Member-tutor with We Care organization supporting underprivileged children.'; skills=@('Empathy','Teaching','Teamwork','Operations') },
  @{ slug='model-united-nations'; title='Model United Nations'; cat='Events'; dates='March 2022; Sept 2022'; summary='Core member organizing MUN at LNCT Group of Colleges, Bhopal.'; skills=@('Leadership','Team Management','Sales','Communication') },
  @{ slug='speak-up-tara'; title='Speak Up Tara; Drama Aayam'; cat='Drama'; dates='Nov 2022; Dec 2022'; summary='Chorus member in drama production at IIT Madras.'; skills=@('Performance','Teamwork','Communication','Arts') },
  @{ slug='we-care'; title='We Care'; cat='Social Work'; dates='June 2022; Jan 2023'; summary='Volunteer work focused on community welfare.'; skills=@('Community Outreach','Social Services','Volunteering','Empathy') },
  @{ slug='curious-organization'; title='Management Team Member'; cat='Leadership'; dates='May 2022; Nov 2022'; summary='Management and strategic initiatives at The Curious Organization.'; skills=@('Team Management','Project Coordination','Strategic Planning','Communication') },
  @{ slug='raahat'; title='Raahat; Be The Change Maker'; cat='Social Work'; dates='Nov 2022; July 2023'; summary='Member of Raahat club at LNCT Group for social impact initiatives.'; skills=@('Community Engagement','Social Impact','Team Collaboration','Event Organization') },
  @{ slug='dragonfly-festival'; title='Dragonfly Festival'; cat='Social Work'; dates='July 2022; May 2023'; summary='Volunteer with WWF India Dragonfly Festival for environmental awareness.'; skills=@('Environmental Education','Community Outreach','Event Management','Conservation Awareness') },
  @{ slug='hack2skill'; title='Hack2Skill'; cat='Events'; dates='July 2022; Aug 2022'; summary='Volunteer supporting coding and skill development initiatives.'; skills=@('Programming Education','Event Coordination','Community Building','Technical Support') }
)
$exLis = ($extras | ForEach-Object { "        <li><a href=`"./$($_.slug).html`">$(Esc $_.title)</a></li>" }) -join "`n"
Write-MigPage -RelPath 'extracurriculars\index.html' -Title 'Extra-curriculars; Ayush Rai' -Description 'Extra-curricular activities from ayushrai.site' -Body @"
    <h1>Extra-curricular activities</h1>
    <ul class="entity-list">
$exLis
    </ul>
"@ -Depth 2
$n++
foreach ($e in $extras) {
  $sk = ($e.skills | ForEach-Object { "        <li>$(Esc $_)</li>" }) -join "`n"
  Write-MigPage -RelPath "extracurriculars\$($e.slug).html" -Title $e.title -Description $e.summary -Body @"
    <h1>$(Esc $e.title)</h1>
    <p class="meta">$(Esc $e.cat) · $(Esc $e.dates)</p>
    <p>$(Esc $e.summary)</p>
    <section aria-labelledby="sk"><h2 id="sk">Skills listed</h2><ul>
$sk
    </ul></section>
"@ -Depth 2
  $n++
}

# Services (factual offerings as published; keep prices as stated)
$services = @'
    <h1>Services</h1>
    <p>Offerings and starting prices as published on the source site. Negotiable notes retained.</p>
    <ul>
      <li><strong>AI and Machine Learning Development</strong> (2; 8 weeks; from \$2000). Custom AI, LLM optimization, RLHF, prompt engineering.</li>
      <li><strong>Full-Stack Web Development</strong> (3; 12 weeks; from \$1500). React/TypeScript apps, REST APIs, databases, cloud deployment.</li>
      <li><strong>Data Science and Analytics</strong> (2; 6 weeks; from \$1200). Analysis, dashboards, predictive analytics, statistics.</li>
      <li><strong>Community Management and Strategy</strong> (ongoing; from \$800). Strategy, social media, content, events.</li>
      <li><strong>Technical Consultation and Training</strong> (flexible; from \$150/hour). Stack selection, architecture review, code review, workshops.</li>
      <li><strong>Rapid Prototyping and MVP</strong> (1; 4 weeks; from \$1000). Prototypes, MVP implementation, feedback iteration.</li>
    </ul>
'@
Write-MigPage -RelPath 'services\index.html' -Title 'Services; Ayush Rai' -Description 'Services listed on ayushrai.site' -Body $services -Depth 2
$n++

# Timeline (chronological facts only)
$timeline = @'
    <h1>Timeline</h1>
    <p>Chronology assembled from dates published on ayushrai.site. Not a complete life history.</p>
    <ul class="entity-list">
      <li><time datetime="2019">2019; 2020</time> Higher Secondary (PCM), Seoni</li>
      <li><time datetime="2020-09">2020-09; 2024-07</time> B.Tech CSE, LNCTS Bhopal</li>
      <li><time datetime="2020">2020; 2024</time> 30 Days of Google Cloud (certificate period listed)</li>
      <li><time datetime="2021">2021; 2024</time> BS Data Science and Applications, IIT Madras</li>
      <li><time datetime="2021-04">2021-04-27</time> AWS Introduction to Machine Learning certificate</li>
      <li><time datetime="2021-05">2021-05-11</time> Leadership and Talent Management certificate</li>
      <li><time datetime="2022-03">2022-03; 2022-09</time> Model United Nations, LNCT</li>
      <li><time datetime="2022-04">2022-04; 2022-05</time> Beyond The Words open mic, IIT Madras</li>
      <li><time datetime="2022-06">2022-06; 2023-01</time> BachpanShala / We Care</li>
      <li><time datetime="2022-07">2022-07; 2023-07</time> UiPath Student Developer Champion</li>
      <li><time datetime="2022-08">2022-08; present</time> GDSC Lead (as listed)</li>
      <li><time datetime="2022-09">2022-09; 2023-07</time> Kanha House WebOps</li>
      <li><time datetime="2022-10">2022-10; 2022-12</time> Salesforce virtual internship</li>
      <li><time datetime="2023-01">2023-01; 2023-02</time> Iha-By-Himani art studio site</li>
      <li><time datetime="2023-03">2023-03; 2023-08</time> Smart Campus Energy Management</li>
      <li><time datetime="2023-08">2023-08; 2023-12</time> NLP for Legal Document Analysis</li>
      <li><time datetime="2023-12">2023-12; ended</time> RaSoR-IITM web developer internship</li>
      <li><time datetime="2024-01">2024-01; present</time> AI-Powered Agricultural Advisory System</li>
      <li><time datetime="2024-01">2024-01; present</time> Microsoft Learn Student Ambassador (as listed)</li>
      <li><time datetime="2024-04">2024-04; present</time> SDE; AI Engineer at FoCDoT</li>
      <li><time datetime="2025-08">2025-08; present</time> Generative AI Engineer at Outlier</li>
    </ul>
'@
Write-MigPage -RelPath 'timeline\index.html' -Title 'Timeline; Ayush Rai' -Description 'Timeline from ayushrai.site dates' -Body $timeline -Depth 2
$n++

Write-Output "Generated $n migrated pages under sites/migrated/"
