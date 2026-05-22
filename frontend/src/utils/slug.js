export const slugify = (value = "") =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export const getPetSlug = (listing = {}) =>
  slugify(listing.title || listing.breed || listing.pet_type || "pet");

export const getPetPath = (listing = {}) => `/pet/${getPetSlug(listing)}`;
