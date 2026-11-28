export const getWishlistStorageKey = (userId) => `wishlist_${userId}`;

export function readWishlist(userId) {
  if (!userId) return [];

  try {
    return JSON.parse(
      localStorage.getItem(getWishlistStorageKey(userId)) || "[]",
    );
  } catch {
    return [];
  }
}

export function saveWishlist(userId, wishlist) {
  if (!userId) return;

  localStorage.setItem(getWishlistStorageKey(userId), JSON.stringify(wishlist));
  window.dispatchEvent(
    new CustomEvent("wishlistUpdated", { detail: wishlist }),
  );
}
