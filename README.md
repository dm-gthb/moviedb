# MovieDB v1

**MovieDB** is a movie library web app, that uses data from [TMDB](https://developer.themoviedb.org/docs/getting-started).
**Demo**: [https://moviedb-lib.netlify.app/](https://moviedb-lib.netlify.app/)
- Browse movies by genre, release date, popularity, and more.
- Find movies by title.
- Save movies to personal lists.
---

## 💡 Features
- **Mock API:** Fully mocked API with separate data services; seamless toggling between real and mock data.  
- **Caching:** Placeholder data feature for transitioning from any movies list page to the movie details page; caches previously visited items for faster retrieval.
- **Persistent Filters & Sorting**: Filters and sorting options on the discovery page are stored in the URL via search params, allowing users to bookmark, share, and reopen pages while preserving their selected state.
- **Optimistic Updates:** Minimal intergration: applied to item deletion in user lists (favorites, watchlist).
- **Keyboard Navigation:** Navigation is optimized for keyboard use.
- **Infinite Scroll:** Endless scrolling on the discovery page (future virtualized list integration).
- **Theming:** Easily toggle between light and dark themes.  
- **Responsive Layout**: Optimized for phones, tablets, and desktops.
---

## 📦 Stack  
- **Frontend:** React, TanStack Query, Tailwind CSS, React Router, Vite  
- **API Mocking:** MSW  
- **Testing:** React Testing Library, Vitest, MSW  
---

## 🔧 Future Enhancements  
- Virtualized List for Discovery Page
- Full Cast & Crew Pages
- Backend for Authentication & User Lists
