# MovieDB

**MovieDB** is a movie library web app that uses data from [TMDB](https://developer.themoviedb.org/docs/getting-started).

**Demo**: [https://moviedb-lib.netlify.app/](https://moviedb-lib.netlify.app/)  
**Storybook**: [https://6896e90dec8d2722c7feedea-tloyifgvcb.chromatic.com/](https://6896e90dec8d2722c7feedea-tloyifgvcb.chromatic.com/)

- Browse movies by genre, release date, popularity, and more
- Find movies by title
- Save movies to personal lists
- Explore movie details, including full cast & crew, film image galleries, and person pages with biographies and filmographies

## 💡 Features

- **Smart Caching:** Multi-layer caching strategy including data prefetching, image preloading, and placeholder data for smooth transitions
- **Persistent Filters & Sorting:** URL-based state preservation for bookmarking and sharing filtered results
- **User Accounts & Lists:** Full authentication with personal watchlists and favorites
- **Optimistic Updates:** Instant UI feedback for list operations with automatic rollback on failure
- **Image Galleries:** Modal image viewers with keyboard navigation and smart prefetching
- **Theming:** Dark/light mode switching
- **Infinite Scroll:** Endless scrolling on the discovery page with intersection observer (future virtualized list integration)
- **Keyboard Navigation:** Navigation is optimized for keyboard use
- **Responsive Layout:** Optimized for all device sizes

### 🔧 Technical Features

- **Layered Service Architecture:** Clean separation of concerns with domain-specific business logic
- **Multi-API Architecture:** Integrated TMDB, Firebase Auth, and Firestore
- **Development Tools:** MSW for API simulation with configurable mock/real data modes; Storybook for component development
- **Testing Infrastructure:** Testing setup with Vitest, React Testing Library, MSW integration, and Storybook for visual regression testing with Chromatic and accessibility testing
- **Error Handling:** Multi-level error boundaries with graceful fallbacks
- **Type Safety:** Full TypeScript implementation

## 🏗️ Architecture Overview

- **Service Layer**: All business logic is encapsulated in services located in `src/services/`

  - **API services** (`api/`): Handle external data fetching and response transformation
  - **Domain services** (`movies/`, `auth/`, `list-items/`): Business logic specific to each domain
  - **Utility services** (`image/`, `theme/`, etc.): Reusable functionality across domains

- **Component Structure**: Three-tier architecture with clear separation of concerns

  - **App Components** (`app-*`): Application-level orchestration (providers, header)
  - **Domain Components** (`movies/`, `auth/`, `person/`): Business domain-specific components
  - **UI Components** (`ui/`): Pure, reusable primitives with no business logic (flat with optional categories for component families)

- **Directory Structure**:

  ```
  src/
  ├── components/
  │   ├── app-providers/         # Global providers (auth, theme, query)
  │   ├── app-header/            # Application header with cross-domain logic
  │   ├── movies/                # Movie domain components
  │   ├── auth/                  # Authentication domain components
  │   ├── person/                # Person domain components
  │   └── ui/                    # Reusable UI primitives (flat with optional categories)
  │       ├── buttons/           # Button family primitives (subfolder structure)
  │       ├── forms/             # Form family primitives (subfolder structure)
  │       ├── image-gallery/     # Single component (direct folder)
  │       ├── spinner/           # Single component (direct folder)
  │       └── ...                # Other UI components as needed
  ├── services/
  │   ├── api/                   # External API services (TMDB, Firebase, Firestore)
  │   ├── auth/                  # Authentication business logic
  │   ├── image/                 # Image loading and caching utilities
  │   ├── list-items/            # User list management logic
  │   ├── movies/                # Movie-related utilities and types
  │   ├── theme/                 # Theme management services
  │   ├── router.service.ts      # Application routing utilities
  │   └── utils.service.ts       # Shared utility functions
  ├── queries/                   # TanStack Query hooks
  ├── pages/                     # Route-level page components
  └── mocks/                     # MSW mocks, test data services, and test utils
  ```

- **State Management Strategy**:

  - **Server State**: TanStack Query for API data, caching, and background updates
  - **Global Client State**: React Context for authentication and theme
  - **Local Component State**: React hooks for UI-specific state

- **API Design**: Multi-API architecture with adapter pattern for external integrations

  - **TMDB API**: Movie data with adapter services transforming responses to internal types
  - **Firebase Auth API**: Authentication operations (login, register, user lookup)
  - **Firestore API**: User list management (watchlists, favorites) with optimistic updates
  - **MSW**: provides development/testing layer for all APIs

## 📦 Stack

- React
- React Router
- TanStack Query
- Tailwind CSS
- Firebase
- Firestore
- MSW
- React Testing Library
- Vitest
- Storybook
- Chromatic
- Vite

## ⚙️ Future Enhancements

- Virtualized List for Discovery Page
