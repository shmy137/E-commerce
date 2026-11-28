# KICKHOUSE code guide

This guide follows the app from startup, through its routes and shared state, and then explains the reusable components and the main React concepts. The code is a React 19 + Vite storefront. It uses React Router for pages, TanStack Query and Axios for product requests, and a local `json-server` API at `http://localhost:3000` for products, users, and orders.

## Start-up and application structure

- `index.html` is Vite's HTML entry point. `src/main.jsx` mounts React into `#root` and wraps the app in `StrictMode`, `QueryClientProvider`, `AuthProvider`, and `CartProvider`. These providers make query caching, login state, and cart state available below them.
- `src/App.jsx` installs `BrowserRouter`; `src/router/Router.jsx` declares URL-to-page mappings, the shared navigation bar, scroll-to-top behavior, and page content. The home route composes `Home`, `About`, `FeaturedProducts`, and `Footer` as one long page. The other routes are `/products`, `/products/:id`, `/profile`, `/cart`, `/wishlist`, `/register`, `/login`, `/checkout`, `/order-success`, and `/orders`. `*` displays the not-found page.
- `src/App.css` and Tailwind utility classes provide styling. `vite.config.js` configures Vite. `db.json` is the local JSON Server data source; the front end expects the API to be running separately on port 3000.

## Pages, in user-flow order

### Home: `src/pages/Home.jsx`

Renders a three-image hero carousel. `currentSlide` is React state; an interval advances it every four seconds. The effect returns `clearInterval` so the timer is cleaned up when the component leaves the page. `useLocation` reads a URL hash such as `/#home`; a short timeout lets the DOM render before `scrollIntoView` scrolls to the matching section. The hero CTA links to the featured section (the section id currently has the spelling `featredkicks`).

### About: `src/pages/About.jsx`

A static brand/about section rendered beneath the hero on the home route. It has no data fetching or component state.

### Featured products: `src/pages/FeaturedProducts.jsx`

Uses the shared `useProducts` query, then filters products with `featured === true`. Product cards are arranged in a horizontally scrollable carousel. `useCarousel` (`src/hooks/scroll.js`) stores a DOM element in a ref and scrolls it left or right by a fixed amount, wrapping around at either end. “View All” navigates to `/products`.

### Product listing: `src/pages/Products.jsx`

Loads all shoes through `useProducts`. The user can search by product name or brand, filter by category, sort by price, and move through pages of eight products. It renders loading skeletons, a request error, an empty-catalog message, or a no-match message as appropriate.

**Search debouncing:** `searchInput` updates immediately for every keystroke, keeping the input responsive. An effect schedules `setSearchTerm(searchInput.trim())` after 500 ms. When another keystroke changes `searchInput`, React runs the previous effect cleanup and `clearTimeout(timer)` cancels the old scheduled update. Only after typing pauses for half a second does the filtering term change. This is a client-side debounce: it avoids recalculating the filtering result on every keystroke; it does not reduce network calls because the complete product list is fetched separately by React Query.

Filtering matches selected category plus either lowercased name or brand. Sorting copies the filtered array with `[...filteredProducts]` before calling `.sort`, avoiding mutation of the original query data. Pagination computes a slice using the current page and page size. Filter changes reset the page to 1 so the user does not stay on an out-of-range page. Page navigation scrolls to the top smoothly.

### Product details: `src/pages/ProductDetails.jsx`

Reads `id` from `/products/:id` with `useParams`, and `useProduct` fetches that one shoe. It shows loading/error/not-found states, lets the user choose a size, and adds the product to the cart. Adding requires a logged-in user and selected size; otherwise it redirects to login or shows a prompt. The cart context enforces stock limits.

### Cart: `src/pages/Cart.jsx`

Reads cart rows and actions from `useCart`. It calculates subtotal by summing `price * quantity`, displays each product/size, and supports quantity changes and removal. Quantity increases are limited by stored stock across the same product's sizes. The user can continue shopping or proceed toward checkout. `formatPrice` formats values as Indian rupees.

### Checkout: `src/pages/Checkout.jsx`

Reads the signed-in user and cart, loads saved address/phone data on mount, and presents a controlled delivery form. On submit it checks authentication and that the cart is not empty, saves the latest address, creates an order snapshot (items, prices, sizes, quantities, total, date, and `Pending` status), clears the cart, and navigates to `/order-success`. Loading state disables repeat submission while the request is in progress. The client uses `localStorage` for the user check and order service calls for persistence.

### Order success: `src/pages/OrderSuccess.jsx`

Confirmation screen shown after checkout successfully creates an order. It provides a way to continue shopping or view orders.

### Orders: `src/pages/Order.jsx`

Fetches the current user's orders in an effect, sorts newest first, and renders loading, error, and empty states. A pending order can be cancelled. The reusable `ConfirmModal` asks for confirmation; on confirm, the page patches the order status to `Cancelled` and updates local React state so the UI reflects the server response without a full reload.

### Wishlist: `src/pages/Wishlist.jsx`

Initializes wishlist state from `localStorage`. It listens for a custom `wishlistUpdated` browser event and removes that listener on unmount. This event lets the product card and wishlist page stay coordinated when a heart button changes the saved list. Products are rendered using the shared `ProductCard`.

### Profile: `src/pages/Profile.jsx`

Loads name, email, phone, and address from `AuthContext` into controlled form state. Submit calls the context's `updateUser`, which patches the API, updates shared user state, and persists it in local storage. It shows loading, success, and failure feedback; logged-out visitors see a login link.

### Login: `src/pages/Login.jsx`

Controlled email/password inputs are submitted to the `login` context function. The optional checkbox toggles password visibility. On success the app navigates home; errors are shown in an alert. A link leads to registration.

### Register: `src/pages/Register.jsx`

Uses one state object for form values and a generic change handler keyed by each input's `name`. It checks that password and confirmation match, removes `confirmPassword` before sending data to the register service, then navigates to login. The service checks for an existing email before creating a user.

### Not found: `src/pages/NotFound.jsx`

The wildcard route catches unrecognized URLs and offers navigation back to a valid part of the store.

### About and footer

`src/pages/Footer.jsx` is the closing CTA section used on the home route. Its button uses `useNavigate` to open the full product listing. `About.jsx` is described above because both sections are composed into `/` by the router.

## Shared components

- `Navbar.jsx`: shared navigation, mobile menu state, cart count, wishlist count, signed-in user display, logout, and a logout confirmation modal. Wishlist count is initialized from `localStorage` and refreshed via the custom wishlist event.
- `SearchBar.jsx`: controlled search input UI; parent owns the input and debounced term.
- `CategoryFilter.jsx` and `PriceFilter.jsx`: controlled filter/sort controls. Their selected values are owned by `Products` and passed down through props and callbacks.
- `productcard.jsx`: reusable product summary/link and wishlist toggle. Wishlist data is stored in `localStorage`; changes emit `wishlistUpdated` so interested UI can refresh.
- `ConfirmModal.jsx`: reusable confirmation dialog used for actions such as logout and cancelling an order.
- `button.jsx`: shared button styling/component.
- `ScrolltoTop.jsx`: effect watches route location and scrolls the document to the top after navigation.

## Shared state, hooks, services, and utilities

### React state and effects

`useState` holds UI state (search text, selected category, modal visibility, forms, loading flags). Updating state causes React to render the component again. `useEffect` synchronizes with external systems such as timers, browser events, local storage, and API loading. Effects that create timers or event listeners return cleanup functions to prevent stale timers/listeners. Props pass values and callbacks down to child components.

### Authentication

`AuthContext.jsx` owns the shared user and exposes login, register, update, and logout. `useAuth.js` is a small wrapper around `useContext(AuthContext)`. On startup the provider attempts to restore the user from local storage. Login calls `authService.js`, removes the password field from the returned user before saving it in the UI/local storage, and updates context. Registration creates the account but does not automatically log in. Updating a profile patches the JSON Server record and refreshes context/local storage.

### Cart

`CartContext.jsx` owns cart rows and exposes `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`, and a count. `useCart.js` reads this context. The cart is saved per user under a key like `cart_123`; when the authenticated user changes, the matching cart is loaded. Add/update operations check stock, and cart rows are distinguished by product id plus selected size. The effect checks that the correct user's cart has loaded before saving, avoiding writing one user's rows into another user's storage key.

### Product data and React Query

`useProducts.js` and `useProdcut.js` (filename spelling as it exists) wrap `useQuery`. The list query uses key `['products']`; detail queries use `['product', id]`. Query keys identify cached data, so list and individual product requests can be cached and loading/error states are supplied by React Query. Axios makes HTTP requests to JSON Server. The detail query is disabled until an `id` exists (`enabled: !!id`).

### API services

`authService.js` contains user registration, login lookup, and profile patch requests. `orderService.js` contains order creation/list/status updates and address lookup/update. Keeping HTTP calls in services separates persistence details from page rendering. Product requests currently live in the product hooks.

### Other utilities

`formatPrice.js` uses `Intl.NumberFormat` with `en-IN` and `INR` to display Indian currency. `scroll.js` is a custom hook combining `useRef` (to hold a DOM node without rerendering) and imperative smooth scrolling. `db.json` supplies the JSON Server collections used by the app.

## Concepts to recognize in the code

- **Controlled inputs:** React state is the source of truth for form/search values; `value` and `onChange` connect the DOM input to state.
- **Conditional rendering:** ternaries and `&&` choose loading/error/empty/content UI based on current state.
- **Lists and keys:** `.map()` renders arrays; stable `key` values help React reconcile the list after changes.
- **Derived data:** totals, filtered products, sorted lists, page counts, and visible slices are calculated from source state/data rather than stored separately.
- **Async/await and errors:** API operations are asynchronous; `try/catch/finally` handles failures and reliably clears loading flags.
- **Routing:** `Link` changes route without a full page load; `useNavigate` performs navigation from event handlers; `useParams` reads dynamic route segments.
- **Browser persistence/events:** `localStorage` retains simple data between reloads; custom window events notify unrelated components in the same tab.
- **Stock guard:** cart methods compare requested quantities against product stock, including quantities for other sizes of the same product.
- **Responsive styling and accessibility:** Tailwind responsive prefixes adjust layouts by viewport; labels, button names, focus styles, and alert roles support keyboard and assistive technology use.

## Local development flow

1. Start JSON Server with the `db.json` file on port 3000 (the source URLs are hard-coded to `http://localhost:3000`).
2. Start Vite with `npm run dev`.
3. Open the Vite URL, browse products, and use register/login before adding products to a cart or placing an order.

The package scripts also include `npm run build`, `npm run lint`, and `npm run preview`.

## Notes about the current implementation

- Authentication is a learning/demo flow backed by JSON Server and local storage; it is not production-grade secure authentication. In particular, this local API stores user records and passwords as ordinary JSON data.
- Search is debounced but filtering itself is local over the already-fetched list. To debounce remote search in a larger catalog, the delayed term would need to drive a server query.
- Cart clearing calls `localStorage.removeItem('cart')`, while active carts are stored using per-user keys (`cart_<id>`). The in-memory cart clears immediately, but that legacy key removal does not directly remove the per-user key; the subsequent persistence effect writes the empty cart for the current user.
- `cartCount` currently uses `cartItems.length`, so it counts distinct product-size rows rather than the sum of all quantities.
- The project has a `QueryClientProvider`, but auth and cart state use React Context; React Query is used for product data.
