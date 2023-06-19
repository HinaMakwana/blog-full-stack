import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import Edit from "./editBlog";
import { useRouter } from "next/router";
import Logout from "./logout";

export default function Data() {
	const router = useRouter()
	const [data,setData] = useState<any[]>([])
	const token = getCookie('jwtToken')

	const getBlog = async () => {
		const set = await fetch('http://127.0.0.1:3000/blog/find',{
			method: 'GET',
			headers : {
				'Content-Type' :'application/json',
				'Authorization' : `Bearer ${token}`
			}
		})
		const output = await set.json()
		console.log('output',output);
		setData(output)
		if(set.status == 401){
			alert('user unauthorized')
			router.push('login')
		}
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
	useEffect(()=> {
		getBlog()
	},[])
	return (
		<div className="bg-white">
			<section className="text-gray-600 body-font overflow-hidden">
				<div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center ">
					<a href="" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
						<img src='blog_logo.jpg' className='h-7 w-7 rounded'></img>
						<span className="ml-3 text-xl text-black">Blogger</span>
					</a>
					<nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
						<a className="mr-5 hover:text-slate-500 text-black" href="viewBlog">View All Blogs</a>
						<a className="mr-5 hover:text-slate-500 text-black" href="addBlog">Create Blog</a>
						<a className="mr-5 hover:text-slate-500 text-black" href="contactUs">About Us</a>
					</nav>
					<Logout />
				</div>
				<div className="container px-5 py-24 mx-auto">
					<div className="flex flex-wrap -m-12">
						{
							data.map((blog)=> {
								return (
									<div className="p-12 md:w-1/2 flex flex-col items-start border-2">
										<span className="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest">{blog.category.categoryName}</span>
										<h2 className="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4">{blog.title}</h2>
										<p className="leading-relaxed mb-8">{blog.description}</p>
										<div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-100 mt-auto w-full">
										</div>
										<a className="inline-flex items-center">
											<img alt="blog" src="images.jpeg" className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center" />
											<span className="flex-grow flex flex-col pl-4">
												<span className="title-font font-medium text-gray-900">{blog.author.firstName}</span>
												<span className="text-gray-400 text-xs tracking-widest mt-0.5">{blog.author.email}</span>
											</span>
										</a>
										<div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-100 mt-auto w-full">
										</div>
										<div className="flex flex-row pt-5">
											<Edit blogData={blog.id}/>
											<button onClick={()=> deleteData(blog.id)} className="inline-flex items-center bg-gray-100 text-black border-0 py-1 px-5 mx-4 focus:outline-none hover:bg-indigo-600 hover:text-white rounded text-base mt-4 md:mt-0">
													Delete
											</button>
										</div>
									</div>
								)
							})
						}
					</div>
				</div>
			</section>
		</div>
	)
}