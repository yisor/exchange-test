/*
 * @Author: lsl
 * @Date: 2018-08-16 09:31:17
 * @Last Modified by: lsl
 * @Last Modified time: 2018-08-17 16:09:33
 */
import React from 'react';
import { Icon } from 'antd-mobile';
import PropTypes from 'prop-types';

const SearchBar = (props) => {
  const { disabled, placeholder, maxLength, onChange, onCancel, cancelText, showCancelButton } = props;
  return (
    <div style={styles.container}>
      <div style={styles.inputContainer}>
        <Icon type="search" size="xs" />
        <input
          style={styles.input}
          disabled={disabled}
          maxLength={maxLength}
          placeholder={placeholder}
          onChange={(e) => { onChange(e.target.value) }}
        />
      </div>
      {showCancelButton &&
        <span
          onClick={onCancel}
          style={{ marginRight: 10, fontSize: 14 }}
        >
          {cancelText}
        </span>
      }
    </div>
  );
};


SearchBar.propTypes = {
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  showCancelButton: PropTypes.bool,
  cancelText: PropTypes.string,
  onCancel: PropTypes.func,
};

SearchBar.defaultProps = {
  disabled: false,
  showCancelButton: false,
  cancelText: '取消',
};

export default SearchBar;

const styles = {
  container: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    display: 'flex',
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'start',
    alignItems: 'center',
    backgroundColor: '#F0F2F5',
    padding: '8px 6px',
  },
  input: {
    display: 'flex',
    flex: 1,
    fontSize: 14,
    marginLeft: 8,
    border: 'none',
    outline: 'medium',
    autoComplete: 'off',
    backgroundColor: '#F0F2F5',
  }
};