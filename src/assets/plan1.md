# E-commerce Bridgeon: User Side, 8-Day Plan

Stack: React (Vite) + React Router + Context API + json-server + Cloudinary (images) + Axios. No payment gateway (Cash on Delivery order flow).

## Folder structure
```
src/
  components/
    common/    Button, Input, Modal, Loader, Skeleton, Badge, Toast, EmptyState, Pagination, Rating
    layout/    Navbar, Footer, Layout, SearchBar
    auth/      LoginForm, RegisterForm
    product/   ProductCard, ProductGrid, ProductFilters, SortDropdown, ImageGallery, QuantitySelector, StockBadge
    cart/      CartItem, CartSummary
    wishlist/  WishlistButton
    address/   AddressCard, AddressForm
    order/     OrderCard, OrderStatusBadge, CheckoutSummary
  pages/       Home, Login, Register, Products, ProductDetails, Cart, Wishlist, Profile, Addresses, Checkout, OrderSuccess, Orders, OrderDetails, NotFound
  routes/      AppRoutes, ProtectedRoute, PublicRoute
  context/     AuthContext, CartContext, WishlistContext (added)
  hooks/       useAuth, useCart, useWishlist, useProducts, useProduct, useOrders, useAddresses, useDebounce, useLocalStorage
  services/    api.js (axios instance), authService, productService, cartService, orderService (added)
  utils/       formatPrice, validators, constants, cloudinary helper
  styles/      theme / variables
```

## db.json collections
users, products (with `stock` = total available quantity), categories, cart (userId + items of productId + quantity), wishlist (userId + productIds), addresses (userId), orders (userId, items, address snapshot, total, status, createdAt), reviews (optional)

## Stock rules (core requirement)
- Every product has a `stock` number.
- Cart is for logged-in users only (no guest cart, no merging). Clicking Add to Cart while logged out redirects to login.
- Cannot add more than stock: quantity selector max = stock, "+" button disabled at the limit, toast "Only X left". The check counts what is already in the cart.
- Stock 0 shows an "Out of stock" badge and a disabled Add to Cart button.
- Cart total quantity is shown in the navbar badge and in CartSummary (total items and total price).
- On Cart and Checkout load, re-fetch current stock and clamp or flag items that exceed it.
- Placing an order: re-check stock, then PATCH each product `stock = stock - orderedQty`. If any item is short, block the order and show which one.
- Cancelling an order: add the quantities back to stock.

## Things added beyond your list
- Search, filter (category, price), sort, pagination
- Protected routes + redirect back after login
- Loading skeletons, error states, empty states, toasts
- 404 page
- Order history, order details, cancel order, success page
- Multiple addresses with default address (full CRUD)
- Change password / edit profile + avatar upload (Cloudinary unsigned preset)
- Services layer, wishlist context, form validation
- Optional: reviews, coupons, recently viewed

## Day plan
**Day 1: Setup + components**
Vite + router + json-server, folders, theme variables, seed db.json (15-20 products with stock, Cloudinary URLs, categories). Build common components, Navbar, Footer, Layout. Route skeleton with placeholder pages.

**Day 2: Auth**
AuthContext + useAuth, Register (validation, duplicate email check), Login, logout, session in localStorage, ProtectedRoute/PublicRoute, navbar auth state.

**Day 3: Products listing**
useProducts, ProductCard (with StockBadge), ProductGrid, Home (hero, categories, featured), Products page with debounced search, category filter, price filter, sort, pagination, skeletons.

**Day 4: Product details**
/products/:id, useProduct, image gallery, price/discount, stock display, quantity selector capped at stock, add to cart, related products, not-found handling.

**Day 5: Cart**
CartContext + useCart (logged-in only, stored in json-server): add, remove, update qty, clear. Enforce stock limit on every add and increase. Total quantity in navbar badge, CartSummary (total items, subtotal, delivery, total). Re-validate against live stock on cart load.

**Day 6: Wishlist, profile, addresses**
WishlistContext + heart toggle, wishlist page with move-to-cart (respects stock). Profile page (edit details, avatar, change password). Address CRUD with default address.

**Day 7: Checkout + orders**
Checkout (protected): pick address, review items, final stock check, place COD order, reduce product stock, clear cart, success page. Orders list, order details, cancel order (restores stock), status badges.

**Day 8: Polish + wrap up**
Responsive pass, accessibility, error handling, empty states, 404, test checklist (including stock edge cases: last item, two tabs, out of stock), cleanup, README, optional deploy (Vercel frontend, json-server on Render).

## Notes
- json-server has no real auth or hashing: fine for practice, never for production.
- json-server v1 differs from 0.17 (pagination uses `_per_page`, string ids). Pin a version.
- Stock updates from the client are not atomic, so two users could race. Fine for practice; a real backend would do this in a transaction.
- Cloudinary: upload product images in the dashboard, save URLs in db.json, use transformations (`f_auto,q_auto,w_400`).

## Color themes (3 colors each)

##18181B	primary
FF5A1F accent
#F5F5F4 bg