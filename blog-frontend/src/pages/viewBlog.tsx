import Logout from "@/components/logout"
import { getCookie } from "cookies-next"
import { useEffect, useState } from "react"

  export default function Viewblog() {
	const [data, setData] = useState<any[]>([])
	const token = getCookie('jwtToken')
	const viewAll = async() => {
		const a = await fetch('http://127.0.0.1:3000/blog/limit',{
			method: 'POST',
			headers: {
				'Content-Type' :'application/json',
				'Authorization' : `Bearer ${token}`
			},
			body: JSON.stringify({limit : 0})
		})
		const content = await a.json()
		console.log(content);
		setData(content)
	}
	useEffect(()=> {
		viewAll()
	},[])
	  return (
	  <header className="text-gray-600 body-font min-h-screen">
		<div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center ">
		  <a href="" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
			<img src='blog_logo.jpg' className='h-7 w-7 rounded'></img>
			<span className="ml-3 text-xl text-white">Blogger</span>
		  </a>
		  <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
			<a className="mr-5 hover:text-slate-100" href="viewBlog">View All Blogs</a>
			<a className="mr-5 hover:text-slate-100" href="addBlog">Create Blog</a>
			<a className="mr-5 hover:text-slate-100" href="contactUs">About Us</a>
			<a className="mr-5 hover:text-slate-100" href="myBlog">My Blogs</a>
		  </nav>
		  <Logout />
		</div>
		<div>
		  <label className="relative block">
			<span className="sr-only">Search</span>
			<span className="absolute inset-y-0 left-0 flex items-center pl-2">
			  <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20">
			  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
			  </svg>
			</span>
			<input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 m-auto shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search for anything..." type="text" name="search"/>
		  </label>
		</div>
		<div className="mt-5">
		  <div className="bg-white py-24 sm:py-32">
		  	<div className="relative flex flex-wrap mx-6 rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
				{
					data.map((blog)=> {

						return (
							<article className="flex max-w-xl flex-col items-start justify-between ml-2 p-5 border-2 rounded h-72 w-72">
								<div className="flex items-center gap-x-4 text-xs">
									<time dateTime="2020-03-16" className="text-gray-500">{blog.uploadedDate}</time>
									<a href="#" className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">{blog.category.categoryName}</a>
								</div>
								<div className="group relative">
									<h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
										<a href="#">
										<span className="absolute inset-0"></span>
										{blog.title}
										</a>
									</h3>
								<p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{blog.description}</p>
								</div>
								<div className="relative mt-8 flex items-center gap-x-4">
									<img src="images.jpeg" className="h-10 w-10" />
									<div className="text-sm leading-6">
										<a href="#">
											<span className="absolute inset-0"></span>
											{blog.author.firstName}
										</a>
									</div>
								</div>
							</article>
						)
					})
				}

			</div>
		  </div>
		</div>
	  </header>
	)
  }
