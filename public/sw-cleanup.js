(() => {
  const CLEANUP_KEY = "kibo-sw-cleanup-v1";

  if (sessionStorage.getItem(CLEANUP_KEY) === "done") {
    return;
  }

  if (!("serviceWorker" in navigator)) {
    sessionStorage.setItem(CLEANUP_KEY, "done");
    return;
  }

  navigator.serviceWorker.getRegistrations().then(async (registrations) => {
    const hadRegistrations = registrations.length > 0;

    await Promise.all(registrations.map((registration) => registration.unregister()));

    const cacheKeys = await caches.keys();
    await Promise.all(cacheKeys.map((key) => caches.delete(key)));

    sessionStorage.setItem(CLEANUP_KEY, "done");

    if (hadRegistrations || cacheKeys.length > 0) {
      window.location.reload();
    }
  }).catch(() => {
    sessionStorage.setItem(CLEANUP_KEY, "done");
  });
})();
