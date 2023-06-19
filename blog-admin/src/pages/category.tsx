import Dashboard from "@/components/dashboard";
import Modal1 from "@/components/modal1";
import { getCookie } from "cookies-next";
import { useEffect,useState } from "react";
import {Dropdown, Grid,Table,Text} from "@nextui-org/react"
import Edit from "@/components/edit";
import Active from "@/components/dropdownActive";

export default function Category() {
	const [state,setState] = useState<any[]>([])
	const [title,setTitle] = useState({title: ''})
	const token = getCookie('authToken')
	const getData = async () => {
		const a = await fetch('http://127.0.0.1:3000/category',{
			method: 'GET',
			headers:{
				'Content-Type' :'application/json'
			}
		})
		const content = await a.json()
		setState(content)

	}
	const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()
		const { name, value } = e.target;
		setTitle((preform) => ({
		  ...preform,
		  [name]: value,
		}));
	  };
	const onRedirect = async (e:React.MouseEvent<HTMLButtonElement>) =>{
		e.preventDefault()
		const a = await fetch('http://127.0.0.1:3000/category/search',{
			method: 'POST',
			headers: {
				'Content-Type' :'application/json'
			},
			body: JSON.stringify(title)
		})
		const content = await a.json()
		setState(content)
	}
	useEffect(()=> {
		getData()
	},[])
	const deleteData = async (categoryName : string) => {
		const a = await fetch('http://127.0.0.1:3000/category',{
			method: 'DELETE',
			headers:{
				'Content-Type' :'application/json',
				'Authorization' : `Bearer ${token}`
			},
			body: JSON.stringify({name: categoryName})
		})
		console.log('a',await a.json());

	}

	return (
		<div>
			<div className="flex flex-row">
				<Dashboard />
				<div className="absolute top-32 right-48" id="search">
					<form>
						<label htmlFor="title" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
								<svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
							</div>
							<input onChange={handleChange} type="search" id="title" name="title" className="block w-full w-[54vw] p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search title. . ." required />
							<button onClick={onRedirect} type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
						</div>
					</form>
				</div>
				<div className="absolute top-32 right-10">
					<Modal1 />
				</div>
				<div className="my-60 mx-5 w-[80vw]" id="table">
					<Table
						aria-label="Example table with static content"
						css={{
							height: "auto",
							minWidth: "100%",
						}}
					>
						<Table.Header>
							<Table.Column>Name</Table.Column>
							<Table.Column>Status</Table.Column>
							<Table.Column> </Table.Column>
							<Table.Column> </Table.Column>
							<Table.Column> </Table.Column>
						</Table.Header>
						<Table.Body>
						{
							state.map((category)=> {
								let status;
								if(category.status == 'A'){status='Active'}
								else {status = 'Inactive'}
								return (
									<Table.Row key={category.id}>
										<Table.Cell>{category.categoryName}</Table.Cell>
										<Table.Cell>{status}</Table.Cell>
										<Table.Cell>
											<Active categoryData={category} />
										</Table.Cell>
										<Table.Cell>
											<Edit categoryData={category}/>
										</Table.Cell>
										<Table.Cell>
											<button onClick={()=> deleteData(category.categoryName)}>
												<img src="delete.svg" className="h-5 w-5" />
											</button>
										</Table.Cell>
									</Table.Row>
								);
							})
						}
						</Table.Body>
					</Table>
				</div>
			</div>
		</div>
	)
}
