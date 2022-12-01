import { FormEvent, useState } from "react";
import { useQuery } from "react-query";


function Category() {
	const [resultMessage, setResultMessage] = useState("");
	const [searchCategories, setSearchCategories] = useState("");
	const [resultCategories, setResultCategories] = useState("");

	function addCategory(e: FormEvent) {
		e.preventDefault()
		const InputNode = e.currentTarget.children[0] as HTMLInputElement;
		const newCategory: string = InputNode?.value;
		console.log(newCategory);

		if( newCategory !== null && newCategory !== undefined && newCategory.length > 0 ) {	
			try {
				(async () => {
					const response = await fetch('http://localhost:3000/api/categories', {
						method: 'post',
						headers: {
							'Accept': 'application/json, text/plain, */*',
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							'name': newCategory
						})
					})

					if (!response.ok) {
						throw new Error("Network response was not OK!");
					}
	
					const result = await response.json();
					console.log(result);

					setResultMessage(result.message);
				})();
			} catch (e) {
				console.log(e);
			}

		} else {
			setResultMessage("Category cannot be empty!");
		}
	}

	const fetchCategories = async () => {
		const data = await fetch(`http://localhost:3000/api/categories/getCategories?name=${searchCategories}`, {
			method: 'GET',
			headers: {
				accept: 'application/json',
			},
		});
		return data.json()
	}

	const { isLoading, error, data } = useQuery<any, Error>('categoriesData', fetchCategories)

	console.log(data);

	// if (isLoading) return 'Loading...'

	// if (error) return 'An error has occurred: ' + error.message


	// function searchCategories(e: FormEvent) {
	// 	e.preventDefault()
	// 	const InputNode = e.currentTarget as HTMLInputElement;
	// 	const searchCategories: string = InputNode?.value;
	// 	console.log(searchCategories);

	// 	if( searchCategories !== null && searchCategories !== undefined) {	
	// 		try {
	// 			(async () => {
	// 				const response = await fetch(`http://localhost:3000/api/categories/getCategories?name=${searchCategories}`) 

	// 				if (!response.ok) {
	// 					throw new Error("Error while searching categories");
	// 				}
	
	// 				const result = await response.json();
	// 				console.log(result);


	// 				setResultCategories(result.categories);
	// 			})();
	// 		} catch (e) {
	// 			console.log(e);
	// 		}

	// 	} else {
	// 		setResultCategories("Cannot search category");
	// 	}

	// }

	return (
		<>
			<div>Hola</div>
			<form onSubmit={addCategory}>
			<input type="text" name="category" onChange={(e) => setSearchCategories(e.currentTarget.value)} placeholder="New Category"></input>
				<button type="submit"> Add Category </button>
			</form>
			<div>
			 {isLoading ? "Loading..." : error ? "An error has occurred" : data?.categories}
			</div>
			<div>
				{resultMessage}
			</div>
		</>
	);
}

export {Category}