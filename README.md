## Access

https://www.adamornoch.com/

# Adam Ornoch: Personal Website

My portfolio site. It's a single scrolling page with four sections: Home, About Me, Projects and Skills. There's an animated starfield in the background, and the layout adapts to phones.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) with the React Compiler
- React 19
- TypeScript
- Tailwind CSS v4. Most styles are hand-written in `globals.css`.

## Editing content

| What                            | Where                                        |
| ------------------------------- | -------------------------------------------- |
| Projects                        | `src/app/data/projects.ts`                   |
| Skills                          | `src/app/data/skills.ts`                     |
| Home and About Me text, links   | `src/app/page.tsx`                           |
| Colours and layout              | `src/app/globals.css` (variables in `:root`) |
| Images                          | `public/`                                    |
