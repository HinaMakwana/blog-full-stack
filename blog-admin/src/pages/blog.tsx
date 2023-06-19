import Dashboard from "@/components/dashboard";
import {FormElement, Table} from "@nextui-org/react"
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";

export default function Blog() {
	const router = useRouter()
	const token = getCookie('authToken')
	const [data,setData] = useState<any[]>([])
	const [title,setTitle] = useState({title: ''})
	const viewAll = async() => {
		const a = await fetch('http://127.0.0.1:3000/blog/limit',{
			method: 'POST',
			headers: {
				'Content-Type' :'application/json'
			},
			body: JSON.stringify({limit : 0})
		})
		const content = await a.json()
		console.log(content);
		setData(content)
	}
	const deleteData = async (id : string) => {
		const a = await fetch('http://127.0.0.1:3000/blog',{
			method: 'DELETE',
			headers:{
				'Content-Type' :'application/json',
				'Authorization' : `Bearer ${token}`
			},
			body: JSON.stringify({id: id})
		})
		console.log('a',await a.json());

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
		const a = await fetch('http://127.0.0.1:3000/blog/search',{
			method: 'POST',
			headers: {
				'Content-Type' :'application/json'
			},
			body: JSON.stringify(title)
		})
		const content = await a.json()
		setData(content)
	}
	useEffect(()=> {
		viewAll()

	},[])
	return (
		<div>
			<div className="flex flex-row">
				<Dashboard />
				<div className="absolute top-32 right-32" id="search">
					<form>
						<label htmlFor="title" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
								<svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
							</div>
							<input onChange={handleChange} type="search" id="title" name="title" className="block w-full w-[62vw] p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search title. . ." required />
							<button onClick={onRedirect} type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
						</div>
					</form>
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
							<Table.Column>Author</Table.Column>
							<Table.Column>Category</Table.Column>
							<Table.Column> </Table.Column>
						</Table.Header>
						<Table.Body>
						{
							data.map((blog)=> {
								return (
									<Table.Row key={blog.id}>
										<Table.Cell>{blog.title}</Table.Cell>
										<Table.Cell>{blog.author.firstName}</Table.Cell>
										<Table.Cell>{blog.category.categoryName}</Table.Cell>
										<Table.Cell>
											<button onClick={()=> deleteData(blog.id)}>
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