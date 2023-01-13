import {useState, useEffect} from 'react'
import groceryService from './services/groceries'
import './index.css'

const App = () => {
	const [groceries, setGroceries] = useState([])
	const [current, setCurrent] = useState('')

	const groceryHook = () => {
		groceryService.getAll()
		.then(startGroceries=>setGroceries(startGroceries))
		}

	useEffect(groceryHook, [])

	const deleteItem = (id) => {
		groceryService.remove(id)
		setGroceries(groceries.filter(item=>item.id!==id))
		}

		const replaceItem = (id) => {
			const replacement = {name: current}
			groceryService.update(id, replacement).then(replacement=>
			setGroceries(groceries.map(item=>item.id===id?replacement:item)))
			setCurrent('')
		}

	const GroceryList = (props) => {

				return(
					<div>
						<h3> Groceries </h3>
						<ul>
							{props.groceries.map(item => 
								<li key={item.id} onClick = {()=>replaceItem(item.id)}> {item.name} 
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
		groceryService.create(newItem)
			.then(newGroceries=>{
		setGroceries(groceries.concat(newGroceries))
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
