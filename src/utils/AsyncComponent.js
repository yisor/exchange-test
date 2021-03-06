import React from 'react';

const asyncComponent = loadComponent => (
  class AsyncComponent extends React.Component {
    state = {
      Component: null,
    }

    UNSAFE_componentWillMount() {
      if (this.hasLoadedComponent()) {
        return;
      }

      loadComponent()
        .then(module => module.default)
        .then(Component => {
          this.setState({ Component });
        })
        .catch(err => {
          console.error('异步组件加载失败');
          throw err;
        });
    }
    
    hasLoadedComponent() {
      return this.state.Component != null;
    }

    render() {
      const { Component } = this.state;
      return Component ? <Component {...this.props} /> : null;
    }
  }
);

export default asyncComponent;
