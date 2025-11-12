import type { CVData, Skill, Experience, Education, OnlineLink } from './types';

export const sampleData: CVData = {
  personalInfo: {
    name: 'Lukáš Kroček',
    title: 'FrontEnd / HTML5 / React / BrightScript / Vibe Coding',
    phone: ['+420', ' ', '737', ' ', '576', ' ', '072'],
    email: ['lkrocek', '@', 'gmail', '.', 'com'],
    linkedin: ['linkedin', '.', 'com', '/', 'in', '/', 'lukaskrocek'],
    address: 'Praha-Kamýk',
    profilePhoto: '',
  },
  summary: 'A seasoned web development professional with over 15 years of experience, specializing in frontend technologies and platform integration. Proven expertise in JavaScript, TypeScript, React, and a wide array of web technologies. Successfully developed and maintained high-traffic web magazines, complex content management systems, and cross-platform solutions for Smart TVs and gaming consoles. A dedicated problem-solver with a strong history of contributing innovative ideas and features to enhance final products.',
  experiences: [],
  educations: [],
  skills: [],
  aboutMe: [
    "I am a family man with two children, a wife, and a dog. I thrive on learning new skills and embrace challenges head-on.",
    "In my free time, I build and experiment with IoT modules for projects like drones and gesture-controlled LED strips, using platforms like Arduino, Raspberry Pi, and others for scripting in JavaScript or Lua.",
    "I also enjoy developing addons for games like World of Warcraft and mods for Minecraft.",
    "Driven by the satisfaction of achieving what hasn't been done before, but pragmatic enough to pivot when facing a dead end and find alternative solutions.",
    "Formerly an avid tennis and hockey player in my youth, I haven't found a group to play with since moving to Prague.",
    "Culturally, I am interested in Stargate, the Jára Cimrman Theatre, and SciFi/Fantasy genres like Harry Potter, The Lord of the Rings, and Ranger's Apprentice (books)."
  ],
  onlinePresence: [
    {
      url: 'https://www.krocek.cz/',
      label: 'Online CV',
      description: 'A digital, interactive version of this CV, built with React and enhanced by AI.',
    },
    {
      url: 'https://agecraft.netlify.app/',
      label: 'Project: AgeCraft',
      description: 'A game created with Vibe Coding, utilizing React, Redux, and other modern libraries.',
    }
  ],
};

// Czech data
const skillsCs: Skill[] = [
  {
    "name": "Languages",
    "children": [
      { "name": "JavaScript" },
      { "name": "TypeScript" },
      { "name": "PHP" },
      { "name": "xHTML" },
      { "name": "CSS3" },
      { "name": "BrightScript" }
    ]
  },
  {
    "name": "Agile",
    "children": [
      { "name": "Jira" },
      { "name": "Bugzilla" }
    ]
  },
  {
    "name": "EcmaScript",
    "children": [
      { "name": "React" },
      { "name": "Redux" },
      { "name": "AngularJS:1.7" },
      { "name": "jQuery" },
      { "name": "YUI" },
      { "name": "Node.js" },
      { "name": "Express" },
      { "name": "Electron" },
      { "name": "Storybook" }
    ]
  },
  {
    "name": "SPA&PWA",
    "children": [
      { "name": "REST API" },
      { "name": "Websockets" },
      { "name": "PostMessages" },
      { "name": "WebRTC" },
      { "name": "WebWorkers" },
      { "name": "Manifest" },
      { "name": "LocalStorage" },
      { "name": "CSS3" }
    ]
  },
  {
    "name": "Databases",
    "children": [
      { "name": "MongoDB" },
      { "name": "MySQL" }
    ]
  },
  {
    "name": "CI&CD",
    "children": [
      { "name": "Webpack" },
      { "name": "Gulp" },
      { "name": "Grunt" },
      { "name": "Apache" },
      { "name": "Nginx" },
      { "name": "Varnish" },
      { "name": "GitHubActions" },
      { "name": "Pipelines" }
    ]
  },
  {
    "name": "Tools",
    "children": [
      { "name": "MS Windows" },
      {
        "name": "Linux",
        "children": [
          { "name": "Ubuntu" },
          { "name": "Raspian" },
          { "name": "Debian" }
        ]
      },
      { "name": "VituralBox" },
      { "name": "VSCode" },
      { "name": "WebStorm" },
      { "name": "MSOffice" },
      { "name": "Click" },
      { "name": "DoubleClick" },
      { "name": "RightClick" }
    ]
  }
];

const historyCs: { experiences: Experience[], educations: Education[] } = {
  "experiences": [
    {
      "role": "Profesní rozvoj",
      "company": "Na volné noze",
      "period": "8/2025 - Nyní",
      "description": "Neustále si rozšiřuji dovednosti a zkoumám nové technologie, abych se udržel na špičce webového vývoje.",
      "projects": [
        { "name": "Vibe Coding", "description": "Využívání pokročilých AI nástrojů pro rychlé prototypování a akceleraci vývoje projektů." },
        { "name": "Práce s novými technologiemi", "description": "Tvorba moderních full-stack aplikací s využitím špičkových frameworků jako Next.js, Nest.js a Vite." }
      ]
    },
    {
      "role": "Frontend Web Developer",
      "company": "Suitest®",
      "period": "12/2024 - 07/2025",
      "description": "Zodpovědnost za údržbu a vývoj klíčových funkcí hlavní frontendové aplikace Suitest s důrazem na vysoký výkon a bezproblémový uživatelský zážitek. Mezi klíčové technologie patřily GIT, Figma, Jira a Docker.",
      "projects": [
        { "name": "Správa UI a technologií", "description": "Spravoval jsem technický stack aplikace (React, Redux, AngularJS, Storybook, TypeScript) a pomáhal s vedením migrace z Webpacku 4 na 5. Zvyšoval jsem kvalitu kódu rozšířením pokrytí jednotkovými testy (Jest, Mocha) a prováděl code reviews v agilním týmu o 5 členech." },
        { "name": "Plánování nových funkcí", "description": "Podílel jsem se na plánování nových funkcí, definování technických specifikací a implementačních strategií." }
      ]
    },
    {
      "role": "Platform integration Specialist",
      "company": "Suitest®",
      "period": "2014 - 2024",
      "description": "Byl jsem průkopníkem v integraci různých platforem do jednotného multiplatformního testovacího řešení. Klíčový přispěvatel pro OTT platformy včetně Roku, HbbTV, SmartTV (Samsung, LG), Freeview Play, ATSC 3.0, Xbox a PlayStation. V malém, dynamickém týmu tří lidí jsme navrhli celý aplikační stack, zahrnující frontend, backend, klíčové knihovny a integraci IoT zařízení (např. Arduino). Samostatně jsem navrhoval a vyvíjel architektury knihoven, včetně GUI pro synchronizované operace. Zajišťoval jsem vysokou kvalitu aplikace prostřednictvím důkladného testování, code reviews a tvorby komplexní sady automatizovaných funkčních a jednotkových testů pro smoke testing a kontrolu stability. Pro správu verzí a projektů jsem využíval nástroje jako GIT a Jira.",
      "projects": [
        { "name": "Roku (BrightScript)", "description": "(2019-2024) Vyvinul a udržoval jsem klíčovou knihovnu komponent pro Roku a adaptoval instrumentační knihovnu Suitest pro tuto platformu. To zahrnovalo kompletní přepsání do BrightScriptu pro ARM architekturu se zaměřením na optimalizaci výkonu a poskytování specializované zákaznické podpory." },
        { "name": "OTT aplikace založené na HTML", "description": "(2014-2024) Navrhl a implementoval jsem JavaScriptovou knihovnu pro End-to-End testování napříč různými OTT platformami založenými na HTML. Využíval jsem pokročilé technologie prohlížečů jako WebSockets a PostMessages a inovoval techniku HTTP Storage pro perzistentní ukládání dat na zařízeních bez standardních API (FileSystem, LocalStorage, Cookies atd.)." },
        { "name": "SwissTxt HbbTv", "description": "(2014-2019) Pokračoval jsem ve vývoji aplikace SwissTxt pro platformu HbbTV. Aplikace prošla významným refaktoringem a architektonickými změnami při přechodu na moderní knihovny jako React a Redux, což umožnilo poskytovat interaktivní zážitky z vysílání." },
        { "name": "Pokročilá analýza sítě a paměti", "description": "Využíval jsem nástroje Wireshark a CheatEngine pro hloubkovou analýzu síťové komunikace a paměti zařízení." },
        { "name": "Vývojová filozofie a testování", "description": "Uvědomil jsem si, že správný programovací přístup musí zahrnovat automatické testy. Každý projekt se časem rozroste a je třeba vytvářet automatické testy, aby se udrželo konzistentní tempo a kvalita vývoje." }
      ]
    },
    {
      "role": "Javascript Developer",
      "company": "mineus)(, s.r.o.",
      "period": "2012 - 2014",
      "description": "Vyvíjel jsem moderní aplikace s využitím HTML5 API, JavaScriptu a CSS3 pro významné klienty, včetně PCWorld, IDG, Maxdome, ProSiebenSat.1, SwissTxt a Tagesspiegel. Během mého působení prošly klíčové HbbTV aplikace několika velkými refaktoringy, při kterých jsme nasazovali modernější knihovny a transformovali celkovou architekturu. Pro správu verzí byl využíván GIT a pro grafické práce Photoshop.",
      "projects": [
        { "name": "Aplikace pro dotyková zařízení", "description": "Vytvořil jsem responzivní, multiplatformní HTML WebView aplikaci optimalizovanou pro dotyková zařízení, včetně tabletů a telefonů s Androidem a iOS." },
        { "name": "HbbTv Aplikace", "description": "Tvořil jsem HbbTV aplikace pro přední vysílací společnosti (ProSieben, Kabel1, Sat.1, SwissTxt), které obsahovaly EPG, zpravodajské kanály a galerie Video-on-Demand pro vysílání i širokopásmové doručování." },
        { "name": "Maxdome", "description": "Podílel jsem se na vývoji mobilní Video-on-Demand (VoD) aplikace Maxdome pro chytré telefony a tablety." },
        { "name": "Hra Pong", "description": "Vyvinul jsem multiplayerovou hru Pong v reálném čase s využitím Socket.io, navrženou pro platformy Smart TV a ovládanou standardními televizními ovladači." },
        { "name": "Analýza sítě", "description": "Zabýval jsem se analýzou sítě a síťové komunikace pomocí Wireshark." }
      ]
    },
    {
      "role": "Web Developer",
      "company": "Aaron Group, s.r.o.",
      "period": "2011 - 2012",
      "description": "Proaktivně jsem identifikoval a vyřešil hlavní problém ve vývojovém workflow s využitím SVN a Eclipse. Refaktoroval jsem zastaralý proces sestavení XML/XSLT, čímž jsem zkrátil dobu kompilace z 5 minut na pouhých 10 sekund na změnu, což výrazně zvýšilo produktivitu týmu.",
      "projects": [
        { "name": "Přepracování CMS", "description": "Byl jsem zodpovědný za údržbu a vylepšování webových aplikací a proprietárního interního CMS pro korporátní klienty jako Caterpillar a České aerolinie." },
        { "name": "YUI a RightNow CMS", "description": "Vyvíjel a udržoval jsem portál zákaznické péče pro Vodafone Česká republika (pece.vodafone.cz) s využitím Yahoo! User Interface (YUI) Library a Oracle RightNow CX Cloud Service." },
        { "name": "Rezervační systém", "description": "Vedl jsem přepracování hlavního systému pro rezervaci letenek, klíčového produktu používaného velkými cestovními kancelářemi a aerolinkami, včetně czechairlines.cz, letuska.cz a cedok.cz." }
      ]
    },
    {
      "role": "Web Developer",
      "company": "Internet Info",
      "period": "2007 - 2011",
      "description": "Tvořil a udržoval jsem webové magazíny jako root.cz, lupa.cz, vitalia.cz, podnikatel.cz a mesec.cz, s využitím verzovacích systémů HG a SVN a nástroje Bugzilla.",
      "projects": [
        { "name": "Přepracování magazínů", "description": "Udržoval a aktualizoval jsem portfolio online magazínů s vysokou návštěvností s použitím PHP 5." },
        { "name": "Zkušenosti s MySQL", "description": "Absolvoval jsem pokročilý kurz MySQL vedený uznávaným českým databázovým expertem Jakubem Vránou." },
        { "name": "Upgrade a Refaktoring", "description": "Vedl jsem kompletní architektonický refaktoring platformy magazínů a migroval ji na model objektově orientovaného programování (OOP) s použitím PHP 5 a Nette Frameworku." }
      ]
    },
    {
      "role": "Brigáda - síťový technik",
      "company": "Kroknet",
      "period": "2005 - 2007",
      "description": "Instalace síťových prvků při budování sítě, její konfigurace, měření signálu a kontrola kvality.",
      "projects": [],
      "hideOnPageOne": true
    }
  ],
  "educations": [
    {
      "degree": "Správce informačních systémů",
      "institution": "Střední škola informačních technologií",
      "period": "09/2003 - 06/2007",
      "description": "Střední škola s maturitou.",
      "projects": [
        { "name": "Architektura hardware a sítí", "description": "Absolvoval jsem první semestr síťové akademie Cisco, kde jsem získal praktické zkušenosti s architekturou sítí, správou přes Telnet a s Linuxem (Debian)." },
        { "name": "Programování", "description": "Osvojil jsem si základy programování v jazycích Turbo Pascal, Delphi a PHP." },
        { "name": "Design", "description": "Získal jsem dovednosti v práci s grafickými programy, včetně Adobe Photoshop pro rastrovou grafiku a CorelDraw pro vektorové ilustrace." },
        { "name": "MS Office", "description": "Získal jsem certifikát pro pokročilé používání balíku Microsoft Office, zahrnující práci s aplikacemi Access, Excel, Word a PowerPoint." }
      ]
    }
  ]
};

export const sampleDataCs: CVData = {
  personalInfo: {
    name: 'Lukáš Kroček',
    title: 'FrontEnd / HTML5 / React / BrightScript / Vibe Coding',
    phone: ['+420', ' ', '737', ' ', '576', ' ', '072'],
    email: ['lkrocek', '@', 'gmail', '.', 'com'],
    linkedin: ['linkedin', '.', 'com', '/', 'in', '/', 'lukaskrocek'],
    address: 'Praha-Kamýk',
    profilePhoto: '',
  },
  summary: 'Zkušený profesionál v oblasti webového vývoje s více než 15 lety zkušeností, specializující se na frontendové technologie a integraci platforem. Prokázaná odbornost v JavaScriptu, TypeScriptu, Reactu a široké škále webových technologií. Úspěšně vyvíjel a udržoval webové magazíny s vysokou návštěvností, komplexní systémy pro správu obsahu a multiplatformní řešení pro Smart TV a herní konzole. Odhodlaný řešitel problémů se silnou historií přispívání inovativními nápady a funkcemi ke zlepšení finálních produktů.',
  experiences: historyCs.experiences,
  educations: historyCs.educations,
  skills: skillsCs,
  aboutMe: [
    "Mám dvě děti, ženu a psa. Rád se učím novým zkušenostem a žádná výzva pro mě není problém.",
    "Ve volném čase si hraji a učím se s IoT moduly pro tvorbu dronů či LED pásků ovládaných gesty, s využitím platforem jako Arduino, Raspberry Pi a dalších pro skriptování v JavaScriptu či Lua.",
    "Zabývám se také tvorbou addonů pro hry jako je World of Warcraft a módů pro Minecraft.",
    "Největší uspokojení mi přináší úspěch z řešení, která se zdají být nemožná, ale dokážu i uznat, kdy je čas hledat novou cestu.",
    "V mládí jsem se věnoval tenisu a hokeji, ale po přestěhování do Prahy jsem nenašel příležitost v těchto sportech pokračovat.",
    "Z kultury mě zaujala Hvězdná brána, Divadlo Járy Cimrmana a SciFi/Fantasy žánry jako Harry Potter, Pán Prstenů či Hraničářův učeň (knihy)."
  ],
  onlinePresence: [
    {
      url: 'https://www.krocek.cz/',
      label: 'Online CV',
      description: 'Digitální, interaktivní verze tohoto životopisu, vytvořená pomocí Reactu a s podporou AI.',
    },
    {
      url: 'https://agecraft.netlify.app/',
      label: 'Projekt: AgeCraft',
      description: 'Hra vytvořená pomocí Vibe Coding s využitím Reactu, Reduxu a dalších moderních knihoven.',
    }
  ],
};