  import {useState, useEffect} from 'react'
  import FilterForm from './components/FilterForm'
  import Persons from './components/Persons'
  import PersonForm from './components/NewPerson'
  import Notification from './components/Notification'
  import personService from './services/persons'

  const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filterPersons, setFilterPersons] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [status, setStatus] = useState('success');

    useEffect( () => {
      personService
      .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
          })
        },[])

        const personAdder = (event) => {
          event.preventDefault()
          const personObject = {
            name: newName,
            number: newNumber
          }
          const namesArray = persons.map(person => person.name);
          if (!namesArray.includes(newName)) {
            personService
            .create(personObject)
              .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson));
                setErrorMessage(`Added ${newName}`);
            })
            .catch(error => {
              setStatus("error");
              setErrorMessage(`Adding failed`);
              });
              setTimeout(() => {setErrorMessage(null)}, 2000);
              setStatus("success");
              
          } else if (window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)) {
              const personToBeChanged = persons.find(person => person.name === newName);
              const id = personToBeChanged.id;
              personToBeChanged.number = newNumber;
              personService
              .change(personToBeChanged, id)
                .then( () => {
                  setPersons(persons.map(person => {
                    if (person.name === newName) {
                      person.number = newNumber;
                    } 
                      return person;
                 }))
                 setErrorMessage(`Ghanged ${newName}:s number`);
                 })
                 .catch(error => {
                  setPersons(persons.filter(person => person.id !== id));        
                  setStatus("error");
                  setErrorMessage(`Change failed`);})    
            }
            setTimeout(() => {setErrorMessage(null)}, 2000);
            setStatus("success");
            setNewName('');
            setNewNumber('');
        }

    const personRemover = event => {
      const id = parseInt(event.currentTarget.id);
      const person = persons.find(person => person.id === id);
      if (window.confirm(`Delete ${person.name} ?`)) {
        personService
          .remove(id)
            .then( () => {
              setPersons(persons.filter(person => person.id !== id));
              setErrorMessage(`Removed ${person.name}`);
            })
            .catch(error => {
              setPersons(persons.filter(person => person.id !== id));
              setStatus("error");
              setErrorMessage(`Remove failed`);});
        }
        setTimeout(() => {setErrorMessage(null)}, 2000);
        setStatus("success");
    }

    const nameChanger = (event) => {
      setNewName(event.target.value);
    }

    const numberChanger = (event) => {
      setNewNumber(event.target.value);
    }
    const filter = (event) => {
      setFilterPersons(event.target.value);
    }

    return (
      <div>
        <h2>Phonebook</h2>
          <Notification message={errorMessage} status={status}/>
          <FilterForm filterPersons={filterPersons} handleFilterChange={filter}/>
        <h2>add a new</h2>
          <PersonForm addPerson={personAdder}
            newName={newName}
            handleNameChange={nameChanger}
            newNumber={newNumber}
            handleNumberChange={numberChanger}/>
        <h2>Numbers</h2>
        <Persons filterPersons={filterPersons} 
            removePerson={personRemover}
            persons={persons} />     
        </div>
    )
  }
  export default App;