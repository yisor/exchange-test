/*
 * @Author: lsl 
 * @Date: 2018-08-14 17:00:27 
 * @Last Modified by: lsl
 * @Last Modified time: 2018-08-14 17:01:37
 * @Desc 修改单页应用Title
 */
import React from 'react';
import PropTypes from 'prop-types';

export default class ReactDocumentTitle extends React.Component {

  setTitle() {
    const { title } = this.props
    document.title = title
  }

  componentDidMount() {
    this.setTitle()
  }

  componentDidUpdate() {
    this.setTitle()
  }

  render() {
    return React.Children.only(this.props.children)
  }
}

ReactDocumentTitle.propTypes = {
  title: PropTypes.string.isRequired
}