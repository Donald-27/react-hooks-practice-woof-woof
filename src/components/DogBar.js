import React from "react";

function DogBar({ dogs, onSelectDog }) {
  return (
    <div id="dog-bar">
      {dogs.map((dog) => (
        <span key={dog.id} onClick={() => onSelectDog(dog)}>
          {dog.name}
        </span>
      ))}
    </div>
  );
}

export default DogBar;
