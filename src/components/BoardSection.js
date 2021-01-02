import React, { Component } from 'react';

export class BoardSection extends Component {
  ///maybe deal with it differently based on player or computer board
  render() {
    const message = this.props.boardState === undefined ? 'SEA' : 'SHIP';
    console.log(message);
    return (
      <td
        // disabled={this.props.boardState !== 'SEA'}
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
