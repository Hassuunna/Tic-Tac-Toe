import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square (props){
	return (
		<button className="square" onClick={props.onClick}>
		  {props.value}
		</button>
	  );
}

class Board extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			squares: Array(9).fill(null),
			xIsNext: true,
		}
	}

	handleClick(i) {
		const squares = this.state.squares.slice()
		if (squares[i] || calculateWinner(squares)) return
		else squares[i] = this.state.xIsNext? 'X': 'O'
		this.setState({
			squares: squares, 
			xIsNext: !this.state.xIsNext
		})
	}

	renderSquare(i) {
		return <Square 
			value={this.state.squares[i]}
			onClick= {()=> { this.handleClick(i)}}
		 />;
	}
  
	render() {
		const winner = calculateWinner(this.state.squares);
		let status; 
		switch (winner) {
			case 'X':
			case 'O':
				status = 'Winner: ' + winner;
				break;
			case 'Tie':
				status = winner;
				break;
			default:
				status = 'Next player: ' + (this.state.xIsNext? 'X' : 'O');
				break;
		}
	  return (
		<div>
		  <div className="status">{status}</div>
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

function calculateWinner(squares) {
	const lines = [
	  [0, 1, 2],
	  [3, 4, 5],
	  [6, 7, 8],
	  [0, 3, 6],
	  [1, 4, 7],
	  [2, 5, 8],
	  [0, 4, 8],
	  [2, 4, 6],
	];
	for (let i in lines) {
	  const [a, b, c] = lines[i];
	  if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
		return squares[a];
	  }
	}
	let tie = 0
	for(let square of squares) {
		tie += square==null ? 0 : 1;
	}
	return tie===9 ? 'Tie' : null;
  }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
