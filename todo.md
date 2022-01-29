
### Content
- Finalize skills
    - Rethink their order, maybe different categorization
- Add more projects
    - ~~Arcana~~
    - ~~C++ Tower defense~~
    - ~~Mythic planner~~
    - Some python projects
- ~~Think of a nice way of adding links to project's sources~~
- ~~Get those projects runnig & take pictures / vids~~
- Add Contact section
- Add some nice links to github & linkedin
- ~~Some form of slide show to project's images / vids~~
- ~~Give Play now some hint in !desktop mode that it will be available on desktops~~

### Styles
- ~~Font family~~
- Try to find some better colors for background / general athmosfere
- Side navbar should be more visible when there's not enough padding on the side
- ~~Bigger Play now button~~

### Background
- Background's stage should be smaller and scroll relative (slower background scroll compared to page content)
- We should add some interactivity to mobile
    - Or at least draw lines in the current scroll viewport (shouldn't be too expensive on mobile)

### Frontend
- Implement Nuxt-image - img performance & device resolution
- Add slideshow
- Ensure the site works with slow throttling enabled
- Add favicon

### Backend
- Put together a way to serve TMTD

### Backlog
- Make background async
    - loading
    - (re)gerenation of particles
- Background might welcome some refactor - background controller, more functional approach
    - Also handle HMR, currently it re-creates the background while leaving the old one there
