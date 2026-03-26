import type { CVData, Skill } from './types';

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
  companies: [],
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
  companies: [],
  educations: [],
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
