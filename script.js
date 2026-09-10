/* =========================================================
   VIDEO SLOT
   Set VIDEO_SRC to the final video file/URL once it's ready
   (e.g. "era-in-horizon-europe-explainer.mp4" or a YouTube/Vimeo
   embed URL). Leave it empty to show the "coming soon" placeholder.
   VIDEO_POSTER is the cover image shown (with a dark overlay and a
   play button) before the person presses play — leave empty for a
   plain colour cover.
   ========================================================= */
const VIDEO_SRC = "era-in-horizon-europe-explainer.mp4";
const VIDEO_IS_EMBED = false;         // true if VIDEO_SRC is an iframe (YouTube/Vimeo) URL
const VIDEO_POSTER = "video-poster.jpg";
const VIDEO_TITLE = "ERA in Horizon Europe — explainer";

const videoWrap = document.getElementById('videoWrap');
const videoCaptionText = document.getElementById('videoCaptionText');

function playVideo() {
  if (VIDEO_IS_EMBED) {
    videoWrap.innerHTML = `
      <div class="video-player" style="padding:0; overflow:hidden;">
        <iframe src="${VIDEO_SRC}${VIDEO_SRC.includes('?') ? '&' : '?'}autoplay=1" title="${VIDEO_TITLE}" style="width:100%; height:100%; aspect-ratio:16/9; border:0; border-radius:14px; display:block;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>`;
  } else {
    videoWrap.innerHTML = `
      <video class="video-player" controls autoplay preload="metadata" ${VIDEO_POSTER ? `poster="${VIDEO_POSTER}"` : ''}>
        <source src="${VIDEO_SRC}" type="video/mp4">
        Your browser does not support the video tag.
      </video>`;
  }
}

if (VIDEO_SRC) {
  videoWrap.innerHTML = `
    <button type="button" class="video-cover" id="videoCoverBtn" aria-label="Play: ${VIDEO_TITLE}">
      ${VIDEO_POSTER ? `<img class="cover-img" src="${VIDEO_POSTER}" alt="">` : ''}
      <span class="play-ring" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
      </span>
      <span class="cover-label">ERA in Horizon Europe <span>· watch the explainer</span></span>
    </button>`;
  document.getElementById('videoCoverBtn').addEventListener('click', playVideo);
} else {
  videoWrap.innerHTML = `
    <div class="video-placeholder">
      <div class="play-ring" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
      </div>
      <p>Explainer video coming soon</p>
      <span>A short video introducing ERA in Horizon Europe will go here.</span>
    </div>`;
  videoCaptionText.textContent = "🎬 Video slot — swap in the final clip by setting VIDEO_SRC in script.js";
}

/* =========================================================
   GROUPS — used to colour-code and filter both the
   priorities list and the work-programme cards
   ========================================================= */
const groups = [
  { id: "open",   label: "Open science & infrastructure", color: "var(--cyan-500)",
    icon: `<rect x="5.5" y="11" width="13" height="9.5" rx="1.6"/><path d="M9 11V8.2a3 3 0 0 1 6-.6" stroke-linecap="round"/>` },
  { id: "people", label: "People & careers", color: "var(--magenta-500)",
    icon: `<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" stroke-linecap="round"/>` },
  { id: "valor",  label: "Valorisation & industry", color: "var(--gold-500)",
    icon: `<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1 1 1.8V16h5v-.3c0-.8.4-1.4 1-1.8A6 6 0 0 0 12 3z" stroke-linecap="round" stroke-linejoin="round"/>` },
  { id: "engage", label: "Engagement & ethics", color: "var(--olive-600)",
    icon: `<path d="M12 21s-7-4.4-9.5-8.8C.7 8.8 2.4 5 6 5c2 0 3.4 1.1 4 2 0.6-.9 2-2 4-2 3.6 0 5.3 3.8 3.5 7.2C19 16.6 12 21 12 21z" stroke-linejoin="round"/>` },
  { id: "global", label: "Global & structural", color: "var(--purple-700)",
    icon: `<circle cx="12" cy="12" r="8"/><path d="M4 12h16M12 4c2.5 2.5 2.5 13 0 16-2.5-3-2.5-13.5 0-16z"/>` }
];
const groupById = id => groups.find(g => g.id === id);

/* =========================================================
   DATA — 17 ERA policy priorities
   Source: "ERA in Horizon Europe" brochure (European Commission)
   ========================================================= */
const priorities = [
  { title: "Open science", group: "open",
    desc: "Scientific discovery and research impact depend heavily on openly sharing data and outputs. Too much scientific data still isn't stored in trusted, sustainable repositories, well annotated, or formatted for machine-readability." },
  { title: "Research infrastructures", group: "open",
    desc: "Facilities that provide resources and services for research communities, enabling innovation and driving multidisciplinary, data-intensive science across Europe." },
  { title: "AI in science", group: "open",
    desc: "Science increasingly relies on artificial intelligence to progress and innovate. AI is transforming every stage of research — assisting scientists, processing large-scale data, making predictions and automating tasks." },
  { title: "Research careers", group: "people",
    desc: "Research careers sit at the heart of the ERA. It's thanks to research talent that R&I can address societal needs and keep Europe competitive globally." },
  { title: "Research assessment", group: "people",
    desc: "Current assessment systems for researchers, projects, units and institutions still lean on a narrow set of outputs — mainly publications — with some indicators and methods used inappropriately to gauge quality and impact." },
  { title: "Higher education", group: "people",
    desc: "The Pact for Research & Innovation sets developing synergies between the ERA and the European Higher Education Area as a priority area for joint EU action." },
  { title: "Research management", group: "people",
    desc: "A multifaceted field essential to building the strategic capacity of research-performing and funding organisations, supporting the ERA's advancement." },
  { title: "Knowledge valorisation", group: "valor",
    desc: "The process of creating social and economic value from knowledge, linking sectors and turning data, know-how and research results into products, services and policies that benefit society." },
  { title: "Industrial transformation", group: "valor",
    desc: "To boost private-sector R&I investment, this action develops and tests a systematic toolbox for assessing industry needs — from engagement in research infrastructures to investment agendas and deploying advanced, sustainable technologies." },
  { title: "New Approach Methodologies (NAMs)", group: "valor",
    desc: "NAMs hold the potential to deliver human-relevant, accurate, reproducible and sustainable innovations in biomedical research, directly or indirectly reducing reliance on animal testing." },
  { title: "Gender equality", group: "engage",
    desc: "A priority of the ERA since 2012. Since 2020 it has widened to inclusive gender equality, addressing multiple, intersecting forms of discrimination and promoting sectoral and geographical inclusiveness." },
  { title: "Citizen engagement", group: "engage",
    desc: "The co-design of research agendas, co-creation of research content and co-assessment of R&I outcomes together with citizens and civil society." },
  { title: "Ethics and integrity", group: "engage",
    desc: "The foundation of scientific excellence and public trust in science. The EU is committed to protecting fundamental rights, values and principles, both at home and through international cooperation." },
  { title: "Science for policy", group: "engage",
    desc: "The European Commission plays a central role in strengthening the Science for Policy ecosystem, ensuring scientific knowledge is used effectively in policymaking at European, national, regional and local level." },
  { title: "Global Approach to RI", group: "global",
    desc: "A need for a more comprehensive, coordinated approach to engaging EU partner countries and regions in R&I cooperation — avoiding duplication, increasing impact on global challenges, and protecting the Union's strategic interests." },
  { title: "SET Plan", group: "global",
    desc: "Launched in 2007 as the first step toward an R&I-driven energy technology policy for Europe, the SET Plan is a long-term structure improving coordination between national and European energy research policies." },
  { title: "Access to excellence", group: "global",
    desc: "Widening policy that aims to bridge the R&I gap in Europe and strengthen the ERA by addressing lower research and innovation performance in widening countries and regions." }
];

/* =========================================================
   DATA — WIDERA Work Programme, 2021–2027
   Each year: list of { title (priority), group, actions[] }
   Source: "ERA in Horizon Europe" brochure (European Commission)
   ========================================================= */
const workProgramme = {
  "2021": [
    { title: "Open science", group: "open", actions: ["Capacity building for institutional open access publishing", "Global Cooperation on FAIR", "Impacts of open science practice"] },
    { title: "Gender equality", group: "engage", actions: ["Centre of Excellence on Inclusive Gender Equality"] },
    { title: "Research assessment", group: "people", actions: ["Assessment of research and researchers"] },
    { title: "Knowledge valorisation", group: "valor", actions: ["Standardisation Booster"] },
    { title: "Global Approach to RI", group: "global", actions: ["Global Cooperation on Fair Data"] },
    { title: "SET Plan", group: "global", actions: ["Strengthening SSH research communities"] },
    { title: "Higher education", group: "people", actions: ["European Excellence Initiative"] },
    { title: "Citizen engagement", group: "engage", actions: ["Societal trust in science, research and innovation", "STE(A)M roadmap for Science Education", "Capacity-building and brokering for citizen science", "Supporting citizen science"] },
    { title: "Ethics and integrity", group: "engage", actions: ["Challenges of ethics and integrity in response to the Covid-19 pandemic", "Ethics expertise for new technologies"] },
    { title: "Research management", group: "people", actions: ["Training and networking scheme for research managers"] }
  ],
  "2022": [
    { title: "Open science", group: "open", actions: ["Training on open and responsible R&I", "Policies for open access books and monographs", "Reproducibility of scientific results", "Institutional and territorial changes toward open and responsible R&I"] },
    { title: "Gender equality", group: "engage", actions: ["Gender and social, economic and cultural empowerment", "Implementation of gender equality plans", "Living lab for gender-responsive innovation"] },
    { title: "Research careers", group: "people", actions: ["ERA Talent pipeline", "ERA Fellowships", "ERA Talents"] },
    { title: "Research assessment", group: "people", actions: ["ERA Talent pipeline"] },
    { title: "Higher education", group: "people", actions: ["Acceleration services for Higher Education Institutions"] },
    { title: "Citizen engagement", group: "engage", actions: ["Training for open and responsible R&I", "Institutional and territorial changes for open and responsible R&I", "Open schooling for science education", "Competence centre for science communication"] },
    { title: "Ethics and integrity", group: "engage", actions: ["Empirical and behavioural approach to ethics and integrity"] }
  ],
  "2023": [
    { title: "Gender equality", group: "engage", actions: ["EU Manifesto for STE(A)M education", "Zero tolerance approach to gender-based violence"] },
    { title: "Research careers", group: "people", actions: ["ERA Fellowships"] },
    { title: "Research assessment", group: "people", actions: ["Reforms of research assessment"] },
    { title: "Knowledge valorisation", group: "valor", actions: ["Experimentation and exchange for value creation"] },
    { title: "Global Approach to RI", group: "global", actions: ["European Info Platform on China"] },
    { title: "Higher education", group: "people", actions: ["European Excellence Initiative"] },
    { title: "Access to excellence", group: "global", actions: ["Teaming for Excellence", "Twinning Bottom-up", "Twinning Green Deal", "European Excellence Initiative", "Pathway to synergies", "Dissemination and Exploitation Support Facility", "Hop On Facility", "Excellence Hubs", "ERA Chairs", "ERA Fellowships"] },
    { title: "Citizen engagement", group: "engage", actions: ["Citizen Science Campaigns"] },
    { title: "Ethics and integrity", group: "engage", actions: ["Ethics for environmental & climate technologies", "Future of research ethics review"] }
  ],
  "2024": [
    { title: "Open science", group: "open", actions: ["Reproducibility of scientific results", "Capacity building on IP management", "Not-for-profit open access publishing"] },
    { title: "Gender equality", group: "engage", actions: ["Implementation of gender equality plans", "Policy coordination for gender equality plans and policies"] },
    { title: "Research careers", group: "people", actions: ["Talent Ecosystems", "European Competency Framework for researchers", "ERA Talents", "ERA Fellowships"] },
    { title: "Knowledge valorisation", group: "valor", actions: ["Experimentation and exchange for value creation"] },
    { title: "Global Approach to RI", group: "global", actions: ["Global Cooperation in not-for-profit Open Access"] },
    { title: "Access to excellence", group: "global", actions: ["ERA Talents", "COST"] },
    { title: "Citizen engagement", group: "engage", actions: ["Science comes to town"] },
    { title: "Ethics and integrity", group: "engage", actions: ["Next generation AI and human behaviour"] },
    { title: "Research management", group: "people", actions: ["Professionalisation of research management"] }
  ],
  "2025": [
    { title: "Open science", group: "open", actions: ["Institutional non-profit open access publishing", "Rolling out the ERA Policy Agenda results"] },
    { title: "Gender equality", group: "engage", actions: ["Career barriers faced by underrepresented and marginalised researchers"] },
    { title: "Research careers", group: "people", actions: ["Rolling out the ERA Policy Agenda results"] },
    { title: "Research assessment", group: "people", actions: ["Rolling out the ERA Policy Agenda results", "Reforms of research assessment"] },
    { title: "Knowledge valorisation", group: "valor", actions: ["Rolling out the ERA Policy Agenda results"] },
    { title: "Higher education", group: "people", actions: ["European Excellence Initiative"] },
    { title: "Access to excellence", group: "global", actions: ["ERA Fellowships", "Plans for connected regional innovation valleys in widening countries", "R&I policymaking in the EU enlargement countries", "Hop On Facility", "EIC Pre-Accelerator", "European Excellence Initiative"] },
    { title: "Citizen engagement", group: "engage", actions: ["Science comes to town"] },
    { title: "Science for policy", group: "engage", actions: ["Science for Policy ecosystem"] },
    { title: "Research management", group: "people", actions: ["Rolling out the ERA Policy Agenda results"] }
  ],
  "2026": [
    { title: "Open science", group: "open", actions: ["Strengthening ecosystems for ERA", "Advancing knowledge for ERA", "Open access and research assessment reforms", "Institutional capacities for ERA", "Non-profit open access publishing", "Academic intellectual assets"] },
    { title: "Gender equality", group: "engage", actions: ["Advancing knowledge for ERA", "Building institutional capacities for ERA"] },
    { title: "Research careers", group: "people", actions: ["Advancing knowledge of ERA", "ERA Fellowships"] },
    { title: "Research assessment", group: "people", actions: ["Open access and research assessment reforms"] },
    { title: "Knowledge valorisation", group: "valor", actions: ["Strengthening ERA ecosystems", "Piloting innovative approaches to support academic startups and spinoffs", "European Citizens' Hackathon Championship"] },
    { title: "Global Approach to RI", group: "global", actions: ["Strengthening ERA ecosystems"] },
    { title: "Higher education", group: "people", actions: ["Strengthening the role of Technology Transfer Offices"] },
    { title: "Access to excellence", group: "global", actions: ["Teaming Synergies", "Twinning", "Hop On Facility", "ERA Fellowships", "Research Management Facility"] },
    { title: "Citizen engagement", group: "engage", actions: ["Citizen engagement for responsible and democratic R&I", "Science comes to town"] },
    { title: "Ethics and integrity", group: "engage", actions: ["Building institutional capacities for ERA", "Strengthening ERA ecosystems", "Advancing knowledge for ERA"] },
    { title: "Research management", group: "people", actions: ["Research Management Facility"] }
  ],
  "2027": [
    { title: "Research careers", group: "people", actions: ["Talent Ecosystems", "ERA Fellowships"] },
    { title: "Global Approach to RI", group: "global", actions: ["Upgrading the EU's independent knowledge on China's STI"] },
    { title: "SET Plan", group: "global", actions: ["SET Plan renewable fuel", "SET Plan wave and tidal energy systems"] },
    { title: "Higher education", group: "people", actions: ["Excellence Hubs"] },
    { title: "Access to excellence", group: "global", actions: ["EIC Pre-Accelerator", "ERA Chairs", "ERA Fellowships", "Excellence Hubs", "ERA Research Managers"] },
    { title: "Citizen engagement", group: "engage", actions: ["Science comes to town", "Public engagement in R&I and scientific literacy"] },
    { title: "Research management", group: "people", actions: ["ERA Research Managers"] }
  ]
};

/* ---------------- render: priority filter chips + accordion ---------------- */
const priorityFilterRow = document.getElementById('priorityFilterRow');
const prioritiesList = document.getElementById('prioritiesList');

const allChip = document.createElement('button');
allChip.type = 'button';
allChip.className = 'filter-chip active';
allChip.innerHTML = `<span class="dot"></span> All priorities`;
allChip.dataset.group = 'all';
priorityFilterRow.appendChild(allChip);

groups.forEach(g => {
  const chip = document.createElement('button');
  chip.type = 'button';
  chip.className = 'filter-chip';
  chip.style.setProperty('--chip-color', g.color);
  chip.innerHTML = `<span class="dot"></span> ${g.label}`;
  chip.dataset.group = g.id;
  priorityFilterRow.appendChild(chip);
});

priorities.forEach((p, i) => {
  const g = groupById(p.group);
  const item = document.createElement('div');
  item.className = 'priority-item';
  item.dataset.group = p.group;
  item.innerHTML = `
    <button class="priority-trigger" type="button" aria-expanded="false" aria-controls="priority-panel-${i}">
      <span class="p-icon" style="--grp-color:${g.color}" aria-hidden="true"><svg viewBox="0 0 24 24">${g.icon}</svg></span>
      <span class="p-text">
        <span class="p-tag" style="color:${g.color}">${g.label}</span>
        <h3>${p.title}</h3>
      </span>
      <span class="plus" aria-hidden="true"></span>
    </button>
    <div class="priority-panel" id="priority-panel-${i}">
      <div class="priority-panel-inner"><p>${p.desc}</p></div>
    </div>`;
  prioritiesList.appendChild(item);
});

prioritiesList.addEventListener('click', (e) => {
  const trigger = e.target.closest('.priority-trigger');
  if (!trigger) return;
  const item = trigger.closest('.priority-item');
  const isOpen = item.classList.toggle('open');
  trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

priorityFilterRow.addEventListener('click', (e) => {
  const chip = e.target.closest('.filter-chip');
  if (!chip) return;
  priorityFilterRow.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  const group = chip.dataset.group;
  prioritiesList.querySelectorAll('.priority-item').forEach(item => {
    item.classList.toggle('hidden', group !== 'all' && item.dataset.group !== group);
  });
});

/* ---------------- render: work-programme year tabs ---------------- */
const yearTabbar = document.getElementById('yearTabbar');
const yearPanels = document.getElementById('yearPanels');
const years = Object.keys(workProgramme);

years.forEach((year, i) => {
  const tab = document.createElement('button');
  tab.type = 'button';
  tab.className = 'tab-btn' + (i === 0 ? ' active' : '');
  tab.textContent = year;
  tab.dataset.year = year;
  yearTabbar.appendChild(tab);

  const panel = document.createElement('div');
  panel.className = 'tab-panel' + (i === 0 ? ' active' : '');
  panel.dataset.year = year;
  const rows = workProgramme[year];
  panel.innerHTML = `
    <span class="year-intro">${rows.length} priority area${rows.length === 1 ? '' : 's'} funded in ${year}</span>
    <div class="wp-grid">
      ${rows.map(r => {
        const g = groupById(r.group);
        return `
        <div class="wp-card" style="--grp-color:${g.color}">
          <h4>${r.title}</h4>
          <ul>${r.actions.map(a => `<li>${a}</li>`).join('')}</ul>
        </div>`;
      }).join('')}
    </div>`;
  yearPanels.appendChild(panel);
});

yearTabbar.addEventListener('click', (e) => {
  const tab = e.target.closest('.tab-btn');
  if (!tab) return;
  yearTabbar.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  yearPanels.querySelectorAll('.tab-panel').forEach(p => {
    p.classList.toggle('active', p.dataset.year === tab.dataset.year);
  });
});

/* ---------------- header: nav toggle + search toggle ---------------- */
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

const searchToggle = document.getElementById('searchToggle');
const searchBox = document.getElementById('searchBox');
searchToggle.addEventListener('click', () => {
  const isOpen = searchBox.classList.toggle('open');
  if (isOpen) searchBox.querySelector('input').focus();
});
