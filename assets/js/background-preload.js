const heroImages = import.meta.glob(
  "/assets/media/hero-display/*.{jpg,jpeg,png,webp,avif}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
);

const serviceImages = import.meta.glob(
  "/assets/media/block-2/gallery-display/*.{jpg,jpeg,png,webp,avif}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
);

const locationImages = import.meta.glob(
  "/assets/media/block-3/display/*.{jpg,jpeg,png,webp,avif}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
);

const portfolioImages = import.meta.glob(
  "/assets/media/block-4/display/*/*.{jpg,jpeg,png,webp,avif}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
);

const loadedUrls = new Set();
const pendingUrls = [];
let activeLoads = 0;
let concurrency = 2;

const connection =
  navigator.connection || navigator.mozConnection || navigator.webkitConnection;
const effectiveType = connection?.effectiveType ?? "";
const saveData = Boolean(connection?.saveData);
const verySlowConnection = saveData || effectiveType === "slow-2g" || effectiveType === "2g";
const slowerConnection = verySlowConnection || effectiveType === "3g";

if (slowerConnection) concurrency = 1;

function sortEntries(modules) {
  return Object.entries(modules).sort(([first], [second]) =>
    first.localeCompare(second, undefined, { numeric: true }),
  );
}

function unique(urls) {
  return [...new Set(urls.filter(Boolean))];
}

function values(modules) {
  return sortEntries(modules).map(([, source]) => source);
}

function portfolioByRound() {
  const byFolder = new Map();

  sortEntries(portfolioImages).forEach(([path, source]) => {
    const folder = path.match(/\/block-4\/display\/([^/]+)\//)?.[1];
    if (!folder) return;
    const items = byFolder.get(folder) ?? [];
    items.push(source);
    byFolder.set(folder, items);
  });

  const folders = [...byFolder.keys()].sort((first, second) =>
    first.localeCompare(second, undefined, { numeric: true }),
  );
  const rounds = [];
  const maxLength = Math.max(...folders.map((folder) => byFolder.get(folder).length));

  for (let index = 0; index < maxLength; index += 1) {
    folders.forEach((folder) => {
      const source = byFolder.get(folder)[index];
      if (source) rounds.push(source);
    });
  }

  return rounds;
}

function requestIdle(callback, timeout = 1200) {
  if ("requestIdleCallback" in window) {
    return window.requestIdleCallback(callback, { timeout });
  }

  return window.setTimeout(callback, Math.min(timeout, 1200));
}

function cancelIdle(id) {
  if ("cancelIdleCallback" in window) {
    window.cancelIdleCallback(id);
    return;
  }

  window.clearTimeout(id);
}

function preloadImage(url) {
  if (loadedUrls.has(url)) {
    runQueue();
    return;
  }

  loadedUrls.add(url);
  activeLoads += 1;

  const image = new Image();
  image.decoding = "async";
  image.fetchPriority = "low";

  image.onload = image.onerror = () => {
    activeLoads -= 1;
    runQueue();
  };

  image.src = url;
}

function runQueue() {
  while (activeLoads < concurrency && pendingUrls.length > 0) {
    preloadImage(pendingUrls.shift());
  }
}

function enqueue(urls) {
  unique(urls).forEach((url) => {
    if (!loadedUrls.has(url) && !pendingUrls.includes(url)) pendingUrls.push(url);
  });

  runQueue();
}

function schedule(delay, urls, timeout = 1600) {
  const timer = window.setTimeout(() => {
    const idleId = requestIdle(() => enqueue(urls), timeout);

    window.addEventListener(
      "pagehide",
      () => {
        cancelIdle(idleId);
      },
      { once: true },
    );
  }, delay);

  window.addEventListener(
    "pagehide",
    () => {
      window.clearTimeout(timer);
    },
    { once: true },
  );
}

function startBackgroundPreload() {
  const hero = values(heroImages);
  const services = values(serviceImages);
  const locations = values(locationImages);
  const portfolio = portfolioByRound();

  if (verySlowConnection) {
    schedule(2500, [...hero.slice(0, 4), ...services.slice(0, 3)], 1800);
    schedule(9000, [...locations.slice(0, 1), ...portfolio.slice(0, 4)], 2400);
    return;
  }

  schedule(1200, [...hero, ...services], 1600);
  schedule(4200, [...locations, ...portfolio.slice(0, 8)], 2200);
  schedule(slowerConnection ? 14000 : 8500, portfolio.slice(8), 3000);
}

if (document.readyState === "complete") {
  startBackgroundPreload();
} else {
  window.addEventListener("load", startBackgroundPreload, { once: true });
}
