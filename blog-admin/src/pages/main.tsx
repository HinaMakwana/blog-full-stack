import Dashboard from "@/components/dashboard";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import {Dropdown, Grid,Table,Text} from "@nextui-org/react"

export default function Main() {
	const [blog,setBlog] = useState()
	const [category,setCategory] = useState()
	const [user,setUser] = useState()
	const [userData,setData] = useState<any[]>([])
	const token = getCookie('authToken')
	const findCount = async () => {
		let countUser = await fetch('http://127.0.0.1:3000/user/count')
		const data = await countUser.json()
		setUser(data)
		let countCategory = await fetch('http://127.0.0.1:3000/category/count')
		const data1= await countCategory.json()
		setCategory(data1)
		let countBlog = await fetch('http://127.0.0.1:3000/blog/count')
		const data2 = await countBlog.json()
		setBlog(data2)
	}
	const findActive = async () => {
		const a = await fetch('http://127.0.0.1:3000/user/active',{
			method: 'GET',
			headers: {
				'Content-Type' :'application/json',
				'Authorization' : `Bearer ${token}`
			}
		})
		const content = await a.json()
		setData(content)
	}
	useEffect(()=> {
		findCount()
		findActive()
	},[])
	return (
		<div className="flex flex-row">
			<div className="">
				<Dashboard />
			</div>
			<div className="mt-40 mx-auto md:mx-60 sm:mx-10" id="box-container">
				<div className="flex flex-row flex-wrap">
					<div className="box box1 mr-32 mb-10">
						<div className="text">
							<h2 className="topic-heading">{user}</h2>
							<h2 className="topic">Total Users</h2>
						</div>
						<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-person-fill my-1 fill-slate-500" viewBox="0 0 16 16">
							<path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
						</svg>
					</div>

					<div className="box box2 mr-32 mb-10">
						<div className="text">
							<h2 className="topic-heading">{category}</h2>
							<h2 className="topic">Total Categories</h2>
						</div>
						<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-list-check fill-slate-500 my-1" viewBox="0 0 16 16">
							<path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
						</svg>
					</div>

					<div className="box box3">
						<div className="text">
							<h2 className="topic-heading">{blog}</h2>
							<h2 className="topic">Total Blogs</h2>
						</div>
						<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-folder2 fill-slate-500 my-1" viewBox="0 0 16 16">
							<path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 12.5v-9zM2.5 3a.5.5 0 0 0-.5.5V6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5zM14 7H2v5.5a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5V7z"/>
						</svg>
					</div>
				</div>
				<div className="mt-10">
					<h1 className="text-center mb-9">Active Users</h1>
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
							<Table.Column>Email</Table.Column>
							<Table.Column> </Table.Column>
							<Table.Column> </Table.Column>
						</Table.Header>
						<Table.Body>
						{
							userData.map((user)=> {
								let status;
								if(user.status == 'A'){status='Active'}
								return (
									<Table.Row key={user.id}>
										<Table.Cell>{user.firstName}</Table.Cell>
										<Table.Cell>{status}</Table.Cell>
										<Table.Cell>{user.email}</Table.Cell>
										<Table.Cell> </Table.Cell>
										<Table.Cell> </Table.Cell>
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