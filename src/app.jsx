import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const handleChange = (event) => {
    console.log("bia", event.target);
    setNewName(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (newName.trim() === "") {
      return;
    }

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} already added`);
      return;
    }
    setPersons([...persons, { name: newName }]);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleChange} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      <ul>
        {persons.map((person, index) => {
          const { name } = person;
          return <li key={index}>{name}</li>;
        })}
      </ul>
    </div>
  );
};

export default App;
