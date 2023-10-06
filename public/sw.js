importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js"
);

if (workbox) {
  console.log(`Yay! Workbox is loaded 😁`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
// Switch debug logging on/off here. Default is on in dev and off in prod.
workbox.setConfig({ debug: false });

// workbox.routing.registerRoute(
//   new RegExp('/.*'),
//   new workbox.strategies.NetworkFirst()
// );

workbox.routing.registerRoute(
  ({ request }) => request.destination === "image",
  new workbox.strategies.CacheFirst()
);

self.addEventListener("activate", (event) => {
  console.log("V1 now ready to handle fetches!");
});
