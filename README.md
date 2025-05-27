# Retro Portfolio

A nostalgic, terminal-inspired portfolio website with interactive elements and easter eggs. Built with Next.js and styled with Tailwind CSS, featuring a retro CRT monitor aesthetic.

![Retro Portfolio Screenshot](/public/portfolio.png)

## Live Demo

[View Live Demo](https://akashprasher.com)

## Features

- 🖥️ Terminal-inspired UI with retro CRT monitor aesthetic
- 📱 Fully responsive design for all devices
- 💾 Section-based content organization
- 🎮 Interactive easter eggs and hidden features
- ⌨️ Secret terminal with custom commands
- 🕹️ Konami code activation for special effects
- 🔄 Typewriter animation effects
- 📊 Clean component architecture

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/akashprasher/retro-portfolio.git
   cd retro-portfolio
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
retro-portfolio/
├── app/                  # Next.js app directory
│   ├── page.tsx          # Main portfolio page
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── ui/               # UI components (buttons, cards, etc.)
│   └── retro-portfolio/  # Portfolio-specific components
│       ├── AboutSection.tsx
│       ├── ContactSection.tsx
│       ├── EducationSection.tsx
│       ├── EasterEggs.tsx
│       ├── ExperienceSection.tsx
│       ├── Footer.tsx
│       ├── Header.tsx
│       ├── LoadingScreen.tsx
│       ├── Navigation.tsx
│       ├── ScanLines.tsx
│       └── index.ts
└── data/                 # Data files for content
    ├── about.data.js     # Personal info and skills
    ├── contact.data.js   # Contact information
    ├── easter-eggs.data.js # Easter egg configurations
    ├── education.data.js # Education information
    ├── experiences.data.js # Work experience
    ├── terminal.data.js  # Terminal commands
    └── index.ts          # Data exports
```

## Customization

### Personalizing Content

All content is stored in the `data/` directory as separate data files. You can modify these files to personalize your portfolio without touching the components.

#### 1. About Section (`data/about.data.js`)

Edit this file to update your name, title, bio, skills and stats:

```javascript
export const aboutData = {
  name: "YOUR NAME",
  title: "YOUR TITLE",
  fullText: "YOUR NAME - YOUR TITLE",
  currentRole: "CURRENT ROLE @ COMPANY",
  previousRoles: "EX-COMPANY | EX-ANOTHER",
  bio: "Your professional summary...",
  skills: ["Skill 1", "Skill 2"],
  stats: [
    { label: "EXPERIENCE", value: "X YEARS" },
    { label: "PROJECTS", value: "X COMPLETED" },
    { label: "STATUS", value: "AVAILABLE" },
  ],
};
```

#### 2. Experiences (`data/experiences.data.js`)

Add or edit your work experiences:

```javascript
export const experiences = [
  {
    company: "Company Name",
    role: "Your Role",
    period: "Time Period",
    location: "Location",
    type: "Full-time/Part-time",
    projects: [
      {
        title: "Project Title",
        description: "Project description...",
      },
    ],
    achievements: ["Achievement 1", "Achievement 2"],
    skills: ["Skill 1", "Skill 2"],
  },
];
```

#### 3. Education (`data/education.data.js`)

Update your education information:

```javascript
export const educationData = {
  university: "UNIVERSITY NAME",
  degree: "Your Degree",
  period: "Year - Year",
  description: "Description of your education...",
  categories: [
    {
      title: "CATEGORY NAME",
      items: ["Item 1", "Item 2"],
    },
  ],
};
```

#### 4. Contact (`data/contact.data.js`)

Edit your contact information:

```javascript
export const contactData = {
  contactMethods: [
    {
      label: "EMAIL.PROTOCOL",
      icon: "Mail",
      link: "mailto:your.email@example.com",
    },
  ],
  statusMessages: ["> YOUR STATUS MESSAGE"],
  contactPreferences: [
    {
      title: "PREFERRED CONTACT",
      value: "YOUR PREFERENCE",
    },
  ],
};
```

#### 5. Theme (`data/theme.data.js`)

Customize the portfolio's colors, fonts, and animations:

```javascript
export const themeData = {
  colors: {
    background: "#0B1113", // Main background color
    cardBackground: "black", // Card background color
    primaryText: "#4ADE80", // Primary text color
    // ... other color settings
  },
  fonts: {
    main: "font-mono", // Main font family
    // ... font size settings
  },
  animations: {
    typing: 100, // Typing speed in ms
    // ... other animation settings
  },
};
```

### Customizing Easter Eggs

You can customize the easter eggs in `data/easter-eggs.data.js` and terminal commands in `data/terminal.data.js`.

## Hidden Features Guide

Discover these hidden features in the portfolio:

1. **Konami Code**: Enter ↑↑↓↓←→←→BA to activate Matrix mode
2. **Secret Terminal**: Press Ctrl+Shift+T to open a secret terminal
3. **Toggle Matrix**: Press Ctrl+Shift+M to toggle Matrix rain effect
4. **Developer Console**: Press F12 to see a special ASCII art message

### Terminal Commands

When the secret terminal is open, try these commands:

- `help` - List all available commands
- `about` - Show brief info
- `skills` - List skills
- `joke` - Get a programmer joke
- `clear` - Clear terminal
- `matrix` - Activate matrix effect
- `time` - Show current time
- `whoami` - Display identity
- `ls` - List files
- `cat resume` - Show resume summary

## Deployment

To build for production:

```bash
npm run build
# or
yarn build
```

Then deploy the generated output to your hosting provider of choice.

## Adding a Screenshot

The README references a screenshot image that you should add:

1. Take a screenshot of your portfolio when it's running
2. Save the image as `screenshot.png` in the root directory
3. Alternatively, you can replace the image reference in the README with your own image path

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [shadcn/ui](https://ui.shadcn.com/)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by retro terminal interfaces and CRT monitors
- Built with modern React and Next.js best practices
