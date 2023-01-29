import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "01764224847" },
  ]);
  const [newName, setNewName] = useState("bia");
  const [newNumber, setNewNumber] = useState("01794334642");

  const handleChange = (event) => {
    console.log("bia", event.target);
    setNewName(event.target.value);
  };
  const handleChangeNumber = ({ target: { value } }) => {
    setNewNumber(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newName.trim() === "" || newNumber.trim() === "") {
      return;
    }

    if (
      persons.some(
        (person) => person.name === newName || person.number === newNumber
      )
    ) {
      alert(`${newName} or ${newNumber} already added`);
      return;
    }

    // if (newNumber.trim() === "") {
    //   return;
    // }

    // if (persons.some((person) => person.number === newNumber)) {
    //   alert(`${newNumber} already added`);
    //   return;
    // }
    setPersons([...persons, { name: newName, number: newNumber }]);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleChange} value={newName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleChangeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      <ul>
        {persons.map((person, index) => {
          const { name, number } = person;

          return (
            <li key={index}>
              {name}: {number}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
