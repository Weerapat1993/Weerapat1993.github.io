self.paw__env={"PAW_CACHE":"true","PAW_VERBOSE":"false","PAW_ENV":"production","PAW_CONFIG_PATH":"/Users/top_weerapat/Desktop/Project/React/reactpwa-ant/prod.pawconfig.json","PAW_HOT":"false"};importScripts("/examples/ant-design/precache-manifest.2ec38a96d6988326d3e6b42a8824e419.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

// eslint-disable-next-line
const serviceWorker = self;

serviceWorker.workbox.skipWaiting();
serviceWorker.workbox.clientsClaim();

serviceWorker.workbox.setConfig({
  debug: serviceWorker.paw__env.PAW_ENV !== 'production',
});

const getOfflineHtml = () => {
  const scripts = serviceWorker.paw__offline_assets.filter(a => a.endsWith('.js')).map(js => `<script type="text/javascript" src="${js}" async></script>`).join('');
  return `<!DOCTYPE html><html><head></head><body><div id="${serviceWorker.paw__injected_variables.clientRootElementId}"></div>${scripts}</body></html>`;
};

serviceWorker.workbox.routing.registerRoute(
  new RegExp(`^${serviceWorker.location.origin}/.*__hmm_update.*`),
  serviceWorker.workbox.strategies.networkOnly(),
);

const assetsRegExp = /\.(css|js|jpg|png|jpeg|gif|woff|woff2|ttf|eot|ico|mp4|avi)$/;

const networkFirstHandler = serviceWorker.workbox.strategies.networkFirst();
const cacheFirstHandler = serviceWorker.workbox.strategies.cacheFirst();
const staleHandler = serviceWorker.workbox.strategies.staleWhileRevalidate();

serviceWorker.workbox.routing.setDefaultHandler(({ event }) => {
  const { request } = event;
  const requestMethod = request.method.toUpperCase();

  if (requestMethod !== 'GET') {
    return fetch(event.request);
  }

  if (
    request.url.indexOf(serviceWorker.location.origin) !== -1
    && assetsRegExp.test(request.url)
  ) {
    return cacheFirstHandler.handle({ event });
  }

  if (
    request.url.indexOf(serviceWorker.location.origin) === -1
    && assetsRegExp.test(request.url)
  ) {
    return staleHandler.handle({ event });
  }

  if (
    request.url.indexOf(serviceWorker.location.origin) !== -1
    && request.headers.get('accept').indexOf('html') !== -1
  ) {
    return networkFirstHandler.handle({ event }).then((response) => {
      if (!response) {
        return new Response(
          getOfflineHtml(),
          { headers: { 'Content-Type': 'text/html' } },
        );
      }
      return response;
    });
  }

  return networkFirstHandler.handle({ event });
});

// eslint-disable-next-line
serviceWorker.workbox.precaching.precacheAndRoute(serviceWorker.__precacheManifest);

;self.paw__offline_assets = ["/examples/ant-design/css/bc2fd45f508159bc4e9d.css","/examples/ant-design/js/bc2fd45f508159bc4e9d.js","/examples/ant-design/css/a0fc5034d744c073bd2c.css","/examples/ant-design/js/a0fc5034d744c073bd2c.js"];self.paw__injected_variables = {"workboxDebug":true,"port":"9003","host":"0.0.0.0","appRootUrl":"/examples/ant-design","serviceWorker":true,"asyncCSS":false,"serverSideRender":true,"singlePageApplication":false,"cdnUrl":"","polyfill":"internal","clientRootElementId":"app","hstsEnabled":true,"hstsmaxAge":31536000,"hstsIncludeSubDomains":true,"hstsPreload":false,"resourcesBaseUrl":"/examples/ant-design/","react":"internal"};