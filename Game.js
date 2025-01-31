import Footer from './Footer';
import { useState } from 'react';
import './CssCode/Game.moduel.css'

function Game() {
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [board, setBoard] = useState(Array(9).fill(''));
  const [gameOver, setGameOver] = useState(false);
  const [status, setStatus] = useState('Player X\'s turn');
  const [winningSquares, setWinningSquares] = useState([]);
  const [namex, setnamex] = useState('');
  const [nameo, setnameo] = useState('');

  function checkWinner(board) {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setGameOver(true);
        setStatus(`${board[a] === 'X' ? (namex || 'X') : (nameo || 'O')} wins!`);
        setWinningSquares([a, b, c]);
        return true; 
      }
    }

    if (!board.includes('')) {
      setGameOver(true);
      setStatus('It\'s a draw!');
      return true; 
    }

    return false; 
  }

  function handleCellClick(index) {
    if (board[index] || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

   
    if (checkWinner(newBoard)) {
      return; 
    }

    
    const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
    setCurrentPlayer(nextPlayer);
    setStatus(`Player ${nextPlayer === 'X' ? (namex || 'X') : (nameo || 'O')}'s turn`);
  }

  function resetGame() {
    setBoard(Array(9).fill(''));
    setGameOver(false);
    setCurrentPlayer('X');
    setStatus(`Player ${namex || 'X'}'s turn`);
    setWinningSquares([]);
  }

  function name(e, player) {
    const playerName = e.target.value;
    if (player === 'X')
       {
      setnamex(playerName);
    }
     else if (player === 'O') 
      {
      setnameo(playerName);
    }
  }

  return (
    <div>
      <div className='container'>
        <div className='row'>
          <h4 style={{ textAlign: 'center', padding: '30px' }}>Tic Tac Toe</h4>

          <div className='col-6 pt-5'>
            <div className='container vh-50 d-flex justify-content-center align-items-center'>
              <div className="board">
                {board.map((value, index) => (
                  <div
                    key={index}
                    className={`square ${winningSquares.includes(index) ? 'winning' : ''}`}
                    id={`square-${index}`}
                    onClick={() => handleCellClick(index)}
                  >
                    {value}
                  </div>
                ))}
              </div>
            </div>
            <div className="status">
              <p>{status}</p>
              <button className='btn btn-warning' onClick={resetGame}>Restart Game</button>
            </div>
          </div>

          <div className='col-6 pt-5'>
            <input className='form-control' onChange={e => name(e, 'X')} placeholder='X Player Name' /><br />
            <input className='form-control' onChange={e => name(e, 'O')} placeholder='O Player Name' />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Game;