import {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
	const [groceries, setGroceries] = useState([])
	const [current, setCurrent] = useState('')

	const groceryHook = () => {
		axios
			.get('http://localhost:3001/groceries')
			.then(response=>{
				setGroceries(response.data)
			})
	}

	useEffect(groceryHook, [])


	const deleteItem = (id) => {
		console.log(id)
		axios
			.delete(`http://localhost:3001/groceries/${id}`)
			.then(response=>{
				setGroceries(groceries.filter(item=>item.id!==id))
				console.log('response',response)
			})
	}

	const GroceryList = (props) => {

	return(
	<div>
		<h3> Groceries </h3>
		<ul>
			{props.groceries.map(item => 
				<li key={item.id}> {item.name} 
					<button onClick={()=>deleteItem(item.id)}> x </button>
				</li>
				)}
		</ul>
	</div>
	)
}

	const newGrocery = (event) => {
		event.preventDefault()
		const newItem = {name: current}
		axios.post('http://localhost:3001/groceries', newItem)
			.then(response=>{
		setGroceries(groceries.concat(response.data))
		})
		setCurrent('')
	}

  return (
	<div>
		<GroceryList groceries={groceries} />
		<form onSubmit={newGrocery}>
			<input value={current} 
			type="text" onChange={(event)=>setCurrent(event.target.value)}
			onClick={(event)=>event.target.value=''} />
			<button type="submit"> Add </button>
		</form>
	</div>
  );
}

export default App;
