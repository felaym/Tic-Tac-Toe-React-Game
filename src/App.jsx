import { useState } from 'react';

// Importing child components for the game
import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import { WINNING_COMBINATIONS } from './winning-combinations.js';
import GameOver from './components/GameOver.jsx';

// Initial empty state for the game board
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

// Function to determine the active player based on game turns
function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X'; // Default to 'X' as the first player

  // If the first player in the turns is 'X', the next player will be 'O'
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function App() {
  // State for player names and game turns
  const [players, setPlayers] = useState({
    'X': 'Player 1',
    'O': 'Player 2'
  });
  const [gameTurns, setGameTurns] = useState([]);

  // Determine the active player based on the game turns
  const activePlayer = deriveActivePlayer(gameTurns);

  // Create a copy of the game board to track the state
  let gameBoard = [...initialGameBoard.map(array => [...array])];

  // Populate the game board with the moves from the game turns
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, column } = square;

    gameBoard[row][column] = player;
  }

  // Variable to store the winner, if any
  let winner = null;

  // Check if any winning combination is met
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
    
    // If all three squares in a combination match, declare the winner
    if (
      firstSquareSymbol && 
      firstSquareSymbol === secondSquareSymbol && 
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol]; // Store the winner's name
    }
  }

  // Draw condition: all squares filled and no winner
  const draw = gameTurns.length === 9 && !winner;

  // Function to handle a player selecting a square
  function handleSelectSquare(rowIndex, columnIndex) {
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      // Add the new move to the list of game turns
      const updatedTurns = [
        { square: { row: rowIndex, column: columnIndex }, player: currentPlayer },
        ...prevTurns
      ];

      return updatedTurns;
    });
  }

  // Function to restart the game
  function handleRestart() {
    setGameTurns([]); // Clear game turns to reset the board
  }

  // Function to handle player name change
  function handlePlayerNameChange(symbolOfThePlayer, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbolOfThePlayer]: newName // Update player name for X or O
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        {/* Render player components */}
        <ol id="players" className="highlight-player">
          <Player 
            key="player-X" 
            initialName="Player 1" 
            symbol="X" 
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange} 
          />
          <Player 
            key="player-O" 
            initialName="Player 2" 
            symbol="O" 
            isActive={activePlayer === 'O'} 
            onChangeName={handlePlayerNameChange} 
          />
        </ol>

        {/* Show GameOver screen when there is a winner or a draw */}
        {(winner || draw) && (
          <GameOver symbol={winner} restart={handleRestart} />
        )}

        {/* Render the game board */}
        <GameBoard 
          onSelectSquare={handleSelectSquare} 
          board={gameBoard} 
        />
      </div>

      {/* Log component to show the moves history */}
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
