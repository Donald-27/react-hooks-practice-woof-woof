import React, { useEffect, useState } from "react";
import DogBar from "./DogBar";
import DogInfo from "./DogInfo";

function App() {
  const [dogs, setDogs] = useState([]);
  const [selectedDog, setSelectedDog] = useState(null);
  const [filterGoodDogs, setFilterGoodDogs] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/pups")
      .then((res) => res.json())
      .then(setDogs);
  }, []);

  function handleSelectDog(dog) {
    setSelectedDog(dog);
  }

  function handleToggleGoodness(updatedDog) {
    fetch(`http://localhost:3001/pups/${updatedDog.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isGoodDog: !updatedDog.isGoodDog }),
    })
      .then((res) => res.json())
      .then((newDog) => {
        setDogs((prevDogs) =>
          prevDogs.map((dog) => (dog.id === newDog.id ? newDog : dog))
        );
        setSelectedDog(newDog);
      });
  }

  const filteredDogs = filterGoodDogs
    ? dogs.filter((dog) => dog.isGoodDog)
    : dogs;

  return (
    <div className="App">
      <div id="filter-div">
        <button
          id="good-dog-filter"
          onClick={() => setFilterGoodDogs((prev) => !prev)}
        >
          Filter good dogs: {filterGoodDogs ? "ON" : "OFF"}
        </button>
      </div>
      <DogBar dogs={filteredDogs} onSelectDog={handleSelectDog} />
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        {selectedDog && (
          <DogInfo dog={selectedDog} onToggleGoodness={handleToggleGoodness} />
        )}
      </div>
    </div>
  );
}

export default App;
