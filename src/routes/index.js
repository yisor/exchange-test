const routes = [
  {
    path: '/',
    name: 'IndexPage',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./../layouts/AppLayout').default);
      });
    },
    indexRoute: {
      getComponent(location, callback) {
        callback(null, require('./Price/PricePage').default)
      }
    },
    childRoutes: [
      {
        path: '/deal',
        getComponent(nextState, cb) {
          require.ensure([], (require) => {
            cb(null, require('./Deal').default);
          });
        },
      },
      {
        path: '/mine',
        getComponent(nextState, cb) {
          require.ensure([], (require) => {
            cb(null, require('./Mine').default);
          });
        },
      },
    ]
  },
  {
    path: '/price/detail',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./Price/PriceDetailPage').default);
      });
    },
  }
];


export default routes;
