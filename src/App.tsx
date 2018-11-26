import React, { Component } from 'react';
import './App.css';

type Maybe<T> = T | null;

interface SquareProps {
  onClick: (event: any) => void;
  value: Maybe <string>;
}

function Square(props: SquareProps) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

interface BoardState {
  squares: Array< Maybe<string> >;
  xIsNext: boolean;
  wins: string;
}

class Board extends React.Component {
  state: BoardState;
  constructor() {
    super({});
    this.state = {
      squares: [null, null, null, null, null, null, null, null, null],
      xIsNext: true,
      wins: ''
    };
  }

  handleClick(i: number) {
    if (this.state.wins === '') {
      const squares = this.state.squares.slice();
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
      });
      this.checkWin(squares);
    }
  }
  checkWin(s: Array< Maybe<string> >): void {
    let winner: Maybe<string> = '';
    if (s[0] !== null && s[0] === s[1] && s[1] === s[2]) {
      winner = s[0];
    }
    if (s[3] !== null && s[3] === s[4] && s[4] === s[5]) {
      winner = s[3];
    }
    if (s[6] !== null && s[6] === s[7] && s[7] === s[8]) {
      winner = s[6];
    }

    if (s[0] !== null && s[0] === s[3] && s[3] === s[6]) {
      winner = s[0];
    }
    if (s[1] !== null && s[1] === s[4] && s[4] === s[7]) {
      winner = s[1];
    }
    if (s[2] !== null && s[2] === s[5] && s[5] === s[8]) {
      winner = s[2];
    }

    if (s[0] !== null && s[0] === s[4] && s[4] === s[8]) {
      winner = s[0];
    }
    if (s[2] !== null && s[2] === s[4] && s[4] === s[6]) {
      winner = s[2];
    }
    if (winner) {winner += " Wins!";}
    this.setState({ wins: winner });
  }

  renderSquare(i: number) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div>
        <div className="status">{status}</div> <div>{this.state.wins}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
