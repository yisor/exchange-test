const routes = [
  {
    path: '/',
    name: 'IndexPage',
    getComponent(nextState, cb) {
      import('./../layouts/AppLayout').then(module => {
        cb(null, module.default);
      });
    },
    indexRoute: {
      getComponent(location, callback) {
        import('./Price/PricePage').then(module => {
          callback(null, module.default);
        });
      }
    },
    childRoutes: [
      {
        path: '/deal',
        getComponent(nextState, cb) {
          import('./Deal').then(module => {
            cb(null, module.default);
          });
        },
      },
      {
        path: '/mine',
        getComponent(nextState, cb) {
          import('./Mine').then(module => {
            cb(null, module.default);
          });
        },
      },
    ]
  },
  {
    path: '/price/detail',
    getComponent(nextState, cb) {
      import('./Price/PriceDetailPage').then(module => {
        cb(null, module.default);
      });
    },
  },
  {
    path: '/detail',
    getComponent(nextState, cb) {
      import('./Price/PriceDetailPage').then(module => {
        cb(null, module.default);
      });
    },
  },
  {
    path: '/optional',
    getComponent(nextState, cb) {
      import('./Optional/OptionalAddPage').then(module => {
        cb(null, module.default);
      });
    },
  },
  {
    path: '/order',
    getComponent(nextState, cb) {
      import('./Order/OrderPage').then(module => {
        cb(null, module.default);
      });
    },
  }
];


export default routes;
