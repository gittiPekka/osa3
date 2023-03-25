import Person from './Person'

const Persons = (props) => {
    const personsToShow = props.persons.filter(person => person.name.includes(props.filterPersons));
    return (
        <ul>
        {personsToShow.map(person =>
         <Person key={person.id} person={person} removePerson={props.removePerson}/>)}
        </ul>
  )}
  
  export default Persons;