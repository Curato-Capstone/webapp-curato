// @flow
import React, { Component } from 'react';
import Radium from 'radium';

import { primaryColor, secondaryColor } from 'utils/colors';

@Radium
export default class MessageBar extends Component {
  static defaultProps;

  props: {
    message: string,
    type: "warning" | "success" | "failure"
  };

  render() {
    const { message, type } = this.props;

    return (
      <span style={STYLES.form(type)}>
        <p>{message}</p>
      </span>
    );
  }
}

const STYLES = {
  form: (type) =>  {
    if (type === "warning") {
      return STYLES.warning;
    } else if (type === "success") {
      return STYLES.success;
    } else {
      return STYLES.failure;
    }
  },


  warning: {
    backgroundColor: "#FFF176",
    width: "100%",
    height: "5%",
    display: "inline",
    position: "absolute",
    bottom: 0,
    left: 0,
    textAlign: "center"
  },

  success: {
    backgroundColor: "#81C784",
    width: "100%",
    height: "5%",
    display: "inline",
    position: "absolute",
    bottom: 0,
    left: 0,
    textAlign: "center"
  },

  failure: {
    backgroundColor: "#E57373",
    width: "100%",
    height: "5%",
    display: "inline",
    position: "absolute",
    bottom: 0,
    left: 0,
    textAlign: "center"
  }
}
