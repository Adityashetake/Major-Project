---
kind: business_term
name: Business Glossary
category: business_term
scope:
    - '**'
---

### Wanderlust
- Definition：The internal product name of this travel-listings platform (also used as the default local DB name `wanderlust`). Listings represent unique places to stay that users discover and share.

### Listing
- Definition：A core domain entity representing a place to stay, containing title, description, price (INR ₹), location, country, image, owner reference, and a category tag (Trending, Rooms, Iconic Cities, Mountain, Castle, Pools, Farms, Arctic, Beach, Yacht, Domes). Each listing owns its reviews.

### Category filter
- Definition：Front-end filtering mechanism on the listings index page where clicking a category icon (Beach, Mountain, etc.) narrows displayed listings to that category. Categories are seeded by the init script and assigned cyclically across listings.
- Aliases：filter icons、category

### Owner
- Definition：The User who created a Listing; only the owner can edit or delete their own listing (enforced in show.ejs via `currUser._id.equals(listing.owner._id)`). Seed data assigns all listings to a hardcoded owner ID.

### Review
- Definition：A rating-and-comment entry attached to a Listing, submitted via a star-rating radio group plus comment text. Reviews are stored under `/listings/:id/reviews` and rendered below the map embed.
