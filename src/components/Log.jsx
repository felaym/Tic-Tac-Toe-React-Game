export default function Log({ turns }) {
    return (
      <ol id="log">
        {/* Loop through the turns and display each one in a list item */}
        {turns.map(turn => (
          <li key={`${turn.square.row}${turn.square.column}`}>
            {/* Display the player and the square they selected */}
            {turn.player} selected {turn.square.row}, {turn.square.column}
          </li>
        ))}
      </ol>
    );
  }
  