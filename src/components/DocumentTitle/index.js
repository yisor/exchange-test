/*
 * @Author: lsl
 * @Date: 2018-08-14 17:00:27
 * @Last Modified by: lsl
 * @Last Modified time: 2018-08-17 16:01:05
 * @Desc 修改单页应用Title
 */
import React from 'react';
import PropTypes from 'prop-types';

export default class ReactDocumentTitle extends React.Component {

  componentDidMount() {
    this.setTitle();
  }

  componentDidUpdate() {
    this.setTitle();
  }

  setTitle() {
    const { title } = this.props;
    document.title = title;
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

ReactDocumentTitle.propTypes = {
  title: PropTypes.string.isRequired
};