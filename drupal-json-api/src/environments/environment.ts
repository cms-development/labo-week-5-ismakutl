import 'zone.js/dist/zone-error';
/*`ng build --prod` replaces `environment.ts` with `environment.prod.ts`. */

export const environment = {
  production: false,
  drupal: {
    url: 'http://localhost:8888/drupal/',
    rest: 'api/export/',
    type: {
      article: 'article',
      articles: 'articles'
    },
    format: '?_format=hal_json',
  }
};
