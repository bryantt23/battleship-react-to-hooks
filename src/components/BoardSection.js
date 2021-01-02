import React, { Component } from 'react';

export class BoardSection extends Component {
  ///maybe deal with it differently based on player or computer board
  render() {
    const { attacked, status } = this.props;
    let message;
    if (status === undefined) {
      message = 'SEA';
    } else if (typeof status === 'object') {
      message = 'SHIP';
    } else {
      message = status; //should be a string
    }
    console.log(message);
    return (
      <td
        disabled={attacked}
        style={{ height: 50, width: 50, display: 'inlineBlock' }}
        onClick={() => {
          this.props.getLocation();
        }}
      >
        {message}
      </td>
    );
  }
}

export default BoardSection;
