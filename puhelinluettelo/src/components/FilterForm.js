const FilterForm = (props) => {
    return (
    <div>
        filter shown with
        <input
        value={props.filterPersons}
        onChange={props.handleFilterChange}
        />
    </div>     
  
    )
  }
  
  export default FilterForm;