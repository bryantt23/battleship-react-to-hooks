import React, { Component } from 'react';

export class BoardSection extends Component {
  ///maybe deal with it differently based on player or computer board
  render() {
    const { attacked, status, isComputer } = this.props;
    let message;
    if (status === undefined || (!attacked && isComputer)) {
      message = 'SEA';
    } else if (typeof status === 'object') {
      message = 'SHIP';
    } else {
      message = status; //should be a string
    }
    // console.log(message);
    return (
      <td
        disabled={attacked}
        style={{ height: 50, width: 50, display: 'inlineBlock' }}
        onClick={() => {
          // https:stackoverflow.com/questions/51549115/best-way-to-disabled-div-onclick-in-react
          !attacked && this.props.updateBoardSectionState();
        }}
      >
        {message}
      </td>
    );
  }
}

export default BoardSection;
