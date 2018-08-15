import React from 'react';
import { Icon } from 'antd-mobile';
import PropTypes from 'prop-types';

const SearchBar = (props) => {
  const { disabled, placeholder, maxLength, onChange } = props;
  return (
    <div style={{ backgroundColor: 'white' }}>
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
    </div>
  );
}


SearchBar.propTypes = {
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  onChange: PropTypes.func,
  disabled: PropTypes.bool
}

SearchBar.defaultProps = {
  disabled: false
}

export default SearchBar;

const styles = {
  inputContainer: {
    display: 'flex',
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'start',
    alignItems: 'center',
    backgroundColor: '#F0F2F5',
    padding: "8px 6px",
  },
  input: {
    display: 'flex',
    flex: 1,
    fontSize: 14,
    marginLeft: 8,
    border: 'none',
    outline: 'medium',
    autoComplete: "off",
    backgroundColor: '#F0F2F5',
  }
}