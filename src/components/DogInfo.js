import React from "react";

function DogInfo({ dog, onToggleGoodness }) {
  return (
    <div id="dog-info">
      <img src={dog.image} alt={dog.name} />
      <h2>{dog.name}</h2>
      <button onClick={() => onToggleGoodness(dog)}>
        {dog.isGoodDog ? "Good Dog!" : "Bad Dog!"}
      </button>
    </div>
  );
}

export default DogInfo;
