import { useState } from 'react';

export default function Player({ initialName, symbol, isActive, onChangeName }) {
  // State for managing the editing mode and player name
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  // Toggles the editing state when the edit button is clicked
  function handleEditClick() {
    setIsEditing(editing => !editing); // Toggle editing mode

    // If exiting edit mode, update the player name through the parent component
    if (isEditing) {
      onChangeName(symbol, playerName); // Notify parent (App) of name change
    }
  }

  // Handles changes to the player name in the input field
  function handleChange(event) {
    setPlayerName(event.target.value); // Update player name state
  }

  // If editing, show input field, otherwise display the name as text
  let editablePlayerName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    editablePlayerName = <input type="text" required placeholder={playerName} onChange={handleChange} />;
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {/* Display player name or input field depending on editing state */}
        {editablePlayerName}
        
        {/* Display player symbol */}
        <span className="player-symbol">{symbol}</span>
      </span>
      
      {/* Edit/Save button to toggle between editing modes */}
      <button onClick={handleEditClick}>
        {isEditing ? 'Save' : 'Edit'}
      </button>
    </li>
  );
}
