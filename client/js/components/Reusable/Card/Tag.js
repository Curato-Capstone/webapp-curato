// @flow
import React, { Component } from 'react';
import Radium from 'radium';

@Radium
export default class Tag extends Component {
  static defaultProps;

  props: {
    text: string
  };

  render() {
    let { text } = this.props;
    return (
      <div>
        <span style={STYLE.before}></span>
        <span style={STYLE.tag}>{text}</span>
        <span style={STYLE.after}></span>
      </div>
    );
  }
}

const STYLE = {
  tag: {
    display: "inline-block",
    lineHeight: "34px",
    width: "100px",
    padding: "0 10px",
    color: "#fff",
    borderRadius: "3px 0 0 3px",
    backgroundColor: "#34495e",
    color: "#fff",
  },
  before: {
    left: "129px",
    borderTop: "7.25px solid transparent",
    borderBottom: "7.5px solid transparent",
    borderLeft: "10px solid #34495e",
    position: "relative",
    content: ''
  },
  after: {
    position: "relative",
    content: '',
    top: "14px",
    right: "120px",
    float: "right",
    width: "5px",
    height: "5px",
    borderRadius: "6px",
    background: "#fff"
  }
}
