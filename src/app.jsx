import { useState, useEffect } from "react";
import { Field } from "./components/field";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [formState, setFormState] = useState({
    name: "bia",
    number: "01794334642",
  });

  useEffect(() => {
    const getPersons = async () => {
      try {
        const response = await axios.get("/api/persons");
        const { data } = response;
        if (!data) {
          throw new Error("no data");
        }
        setPersons(data);
      } catch (error) {
        console.log(error);
      }
    };

    getPersons();
  }, []);

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

  const setName = (id) => (name) => {
    setPersons(
      persons.map((person, index) =>
        index === id ? { ...person, name: name } : person
      )
    );
  };

  const setNumber = (id) => (number) => {
    setPersons(
      persons.map((person, index) =>
        index === id ? { ...person, number: number } : person
      )
    );
  };

  const setKeyPerson = (key, id) => (value) => {
    setPersons(
      persons.map((person, index) =>
        index === id ? { ...person, [key]: value } : person
      )
    );
  };

  const handleRemove = (id) => () => {
    setPersons(persons.filter((person, index) => index !== id));
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
              <Field value={name} setValue={setKeyPerson("name", index)} />:{" "}
              <Field value={number} setValue={setKeyPerson("number", index)} />{" "}
              <button onClick={handleRemove(index)}>remove</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
