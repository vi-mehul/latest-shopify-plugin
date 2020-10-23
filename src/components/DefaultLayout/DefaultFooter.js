import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

const DefaultFooter = (props) => {
 console.log("props",props)
    const { children, ...attributes } = props;

    return (
      <React.Fragment>
        {/*<span><a href="https://vishwainfoways.com">CoreUI</a> &copy; 2018 creativeLabs.</span>*/}
        <span className="ml-auto">Powered by <a href="http://searchtuls.com">Searchtuls</a></span>
      </React.Fragment>
    );
  
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
