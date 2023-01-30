import { useState } from "react";
import { Field } from "./components/field";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [formState, setFormState] = useState({
    name: "bia",
    number: "01794334642",
  });

  const { name: newName, number: newNumber } = formState;

  const [filter, setFilter] = useState("");

  const handleChangeForm = ({ target: { value, name } }) => {
    setFormState({ ...formState, [name]: value });
  };

  const handleChangeFilter = ({ target: { value } }) => {
    setFilter(value);
  };
  const filterPersons = (person) => {
    const escape = (regExp) => {
      return regExp.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    };
    console.log("2", escape(filter));
    const regExp = new RegExp(`${escape(filter)}`, "gi");
    return person.name.match(regExp);
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
      <h1>Phonebook</h1>

      <span>filter shown with </span>
      <input
        placeholder="SEARCH!!!"
        onChange={handleChangeFilter}
        type="text"
      />

      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:{" "}
          <input name="name" onChange={handleChangeForm} value={newName} />
        </div>
        <div>
          number:{" "}
          <input name="number" value={newNumber} onChange={handleChangeForm} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      <ul>
        {persons.filter(filterPersons).map((person, index) => {
          const { name, number } = person;

          return (
            <li key={index}>
              <Field value={name} />: <Field value={number} />
              {/* {name}: {number} */}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
