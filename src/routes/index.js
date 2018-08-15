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
        callback(null, require('./Price').default)
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
];

export default routes;
