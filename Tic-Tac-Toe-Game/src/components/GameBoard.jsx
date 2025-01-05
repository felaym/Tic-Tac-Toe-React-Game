export default function GameBoard({ onSelectSquare, board }) {
    return (
      <ol id="game-board">
        {/* Loop through each row of the game board */}
        {board.map((row, rowIndex) => (
          <li key={rowIndex}>
            <ol>
              {/* Loop through each cell in the row */}
              {row.map((playerSymbol, columnIndex) => (
                <li key={columnIndex}>
                  {/* Button for each square */}
                  <button
                    onClick={() => onSelectSquare(rowIndex, columnIndex)} // Trigger the square selection handler
                    disabled={playerSymbol !== null} // Disable the button if the square is already taken
                  >
                    {playerSymbol} {/* Display the player symbol (X or O) */}
                  </button>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    );
  }
  