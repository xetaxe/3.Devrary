import { FormEvent, FormEventHandler, MouseEventHandler, useState } from "react";


function Category() {
	const [cat, setCat] = useState(0);

	function addCategory(e: FormEvent) {
		e.preventDefault()
		const InputNode = e.currentTarget.children[0] as HTMLInputElement;
		const newCategory: string = InputNode?.value;
		console.log(newCategory)

		if( newCategory !== null) {	
			const response = fetch('http://localhost:3000/api/categories', {
				method: 'post',
				headers: {
					'Accept': 'application/json, text/plain, */*',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					'name': newCategory
				})
			})
			// .then(res=>res.json())
			// .then(res => console.log(res));
		}

	}

	return (
		<>
		<div>Hola</div>
		<form onSubmit={addCategory}>
			<input type="text" name="category" placeholder="New Category"></input>
			<button type="submit"> Add Category </button>
		</form>
		</>
	);
}

export {Category}