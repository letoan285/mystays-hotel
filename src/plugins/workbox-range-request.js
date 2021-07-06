import {registerRoute} from 'workbox-routing';
import {StaleWhileRevalidate} from 'workbox-strategies';
import {BroadcastUpdatePlugin} from 'workbox-broadcast-update';

registerRoute(
  ({url}) => url.pathname.startsWith('/'),
  new StaleWhileRevalidate({
    plugins: [
      new BroadcastUpdatePlugin({
        headersToCheck: ['X-My-Custom-Header'],
      }),
    ],
  })
);


workbox.routing.registerRoute(
    /\.(mp4|webm)/,
    new workbox.strategies.CacheFirst({
      plugins: [
        new workbox.rangeRequests.RangeRequestsPlugin(),
      ],
    }),
    'GET'
  );