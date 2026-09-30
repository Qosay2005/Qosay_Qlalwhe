# Recognition photos

Place real, optimized event photos in this folder and import them in
`src/data/recognitions.js`. The card uses a 16:10 crop with `object-cover`, lazy
loading, and a consistent fallback for missing or failed images.

Provide `imageAlt` describing the actual photo. Dates, skill tags, photos, and
external post URLs are optional. Do not add stock photos or invented entries.

Each entry requires a unique, stable `id`, a `title`, a `category`, and a verified
`description`. Add the object to the `recognitions` array in the desired display
order; the gallery automatically lays it out in one, two, or three columns.

Use absolute HTTP(S) URLs for `postUrl`. Missing or invalid URLs produce no link.
An empty array shows a development-only notice; production contains no example
cards or development notice. Existing components do not need editing to add items.
