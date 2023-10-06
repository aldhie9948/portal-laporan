export const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    // register service worker
    console.log("registering service worker...");
    await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
    });
    console.log("service serviceWorker registered...");
  }
};
