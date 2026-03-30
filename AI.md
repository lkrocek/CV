# AI Rules — CV Project

## Stack
- React 19 + TypeScript, Vite, Tailwind CSS v4
- Vitest + Storybook (vitest addon) for tests and component docs
- No Redux / no Context — React hooks + URL hash state only
- Data loaded from `public/history.json` (work history) and `public/skills.json` (skill groups)

## i18n
- All UI copy lives in `profileCopy` in `components/profile/profileContent.ts`
- Always add both `en` and `cs` keys when adding new strings
- Never hardcode user-visible strings in components — always go through `profileCopy`

## Dark / light mode
- Prop `isDarkMode: boolean` is passed down from `App.tsx` (stored in localStorage as `cv-theme`)
- Pattern: `isDarkMode ? 'dark-class' : 'light-class'` inline in Tailwind
- Dark palette: indigo-600 accents, slate-300/400 text, rgba(255,255,255,0.08) borders
- Light palette: indigo-500 accents, slate-600/700 text, rgba(148,163,184,0.24) borders
- Semi-transparent backgrounds: `bg-white/[0.03]` (dark) / `bg-white/80` (light)

## Component conventions
- Functional components with explicit `React.FC<Props>` type
- Export pure helper functions alongside components so they can be unit-tested without rendering
- Dropdowns / popovers that overlap other sections: use `ReactDOM.createPortal` to `document.body` with `position: fixed` calculated from `getBoundingClientRect()`
- No z-index tricks — portals are the correct fix for stacking context issues

## Tests
- Unit-test pure functions (logic helpers), not rendering
- Framework: Vitest — `describe/it/expect` imported from `vitest`
- Test file next to source: `Foo.test.ts`
- Do not mutate input sets/arrays in helpers — always return new instances

## Storybook
- Story file next to source: `Foo.stories.tsx`
- Title format: `CV/Profile/ComponentName`
- Use `context.globals.theme` and `context.globals.language` for theme/lang in render functions
- Interactive stories: use `useState` inside `render` to make controls work
- Always add a `LightMode` story for components with `isDarkMode` prop

## Skills filter (SkillGroupFilter)
- Empty `Set<string>` = no filter = show all
- `toggleSkillGroup`, `invertSkillGroups`, `isGroupActive` are exported pure helpers
- Filter state lives in `TechnologyExplorer`, passed down as `selectedGroups` + `onGroupsChange`

## Git
- Commit format: `<type>: <short description>\n\n<explanation>`
- Types: `feat`, `fix`, `content`, `refactor`, `docs`, `test`
- Commit data changes (JSON) separately from code/feature changes when possible
- Never add `Co-Authored-By` or any AI authorship line to commits
