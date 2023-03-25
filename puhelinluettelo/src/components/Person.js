  const Person = (props) => {
    return (
      <li>
        {props.person.name} {props.person.number}
        <span> <button id={props.person.id} onClick={props.removePerson}>delete</button></span>
      </li>
    )
  }

export default Person;