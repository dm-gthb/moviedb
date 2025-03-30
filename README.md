# MovieDB

**MovieDB** is a movie library web app that uses data from [TMDB](https://developer.themoviedb.org/docs/getting-started).

**Demo**: [https://moviedb-lib.netlify.app/](https://moviedb-lib.netlify.app/)

- Browse movies by genre, release date, popularity, and more.
- Find movies by title.
- Save movies to personal lists.
- Explore movie details, including full cast & crew, film image galleries, and person pages with biographies and filmographies.

## 💡 Features
- **Mock API:** Mocked API with separate data services; seamless toggling between real and mock data.  
- **Caching:** Prefetches data and images for faster navigation; uses placeholder data to ensure smooth transitions from any movie list page to the movie details page; caches previously visited items for quick retrieval.
- **Persistent Filters & Sorting:** Filters and sorting options on the discovery page are stored in the URL via search params, allowing users to bookmark, share, and reopen pages while preserving their selected state.
- **Optimistic Updates:** Applied to item deletion in user lists.
- **Keyboard Navigation:** Navigation is optimized for keyboard use.
- **Infinite Scroll:** Endless scrolling on the discovery page (future virtualized list integration).
- **User Accounts & Lists:** Users can sign up, log in, and manage watchlists and favorites.
- **Theming:** Easily toggle between light and dark themes.  
- **Responsive Layout:** Optimized for phones, tablets, and desktops.

## 📦 Stack  
- **Frontend:** React, TanStack Query, Tailwind CSS, React Router, Vite  
- **Authentication & User Lists:** Firebase Authentication (user login/signup) and Firestore (storing watchlists and favorites).
- **API Mocking:** MSW  
- **Testing:** React Testing Library, Vitest, MSW  

## 🔧 Future Enhancements  
- Virtualized List for Discovery Page
