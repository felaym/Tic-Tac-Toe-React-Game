export default function GameOver({ symbol, restart }) {
    return (
      <div id="game-over">
        <h2>Game Over!</h2>
        
        {/* If there's a winner, display the winning player's symbol */}
        {symbol && <p>{symbol} has won!</p>}
        
        {/* If no winner (a draw), display draw message */}
        {!symbol && <p>It's a draw!</p>}
        
        {/* Button to restart the game */}
        <p><button onClick={restart}>Rematch!</button></p>
      </div>
    );
  }
  