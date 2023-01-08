
const GroceryList = (props) => {
	return(
	<div>
		<h3> Groceries </h3>
		<ul>
			{props.groceries.map(item=> <li key={item.id}> {item.name} </li>)}
		</ul>
	</div>
	)
}

export default GroceryList
