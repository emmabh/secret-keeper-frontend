import React from "react";
import PropTypes from 'prop-types';
import './returnedSecret.css'

export default class ReturnedSecret extends React.Component {
    static propTypes = {
      value: PropTypes.string,
    };
    
    render() {
      
      let returnedSecret;
      returnedSecret = (
        <p>{this.props.value}</p>   
      );
      return (
        
        <div className="component-returnedSecret">
          {returnedSecret}
        </div>
      );
    }
  }