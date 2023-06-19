import Mycarousel from "@/components/carousel";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Search from "./search";

export default function Example() {
	const [data,setData] = useState<any[]>([])
	const [title,setTitle] = useState({title: ''})
  const router = useRouter()
  const viewAll = async() => {
		const a = await fetch('http://127.0.0.1:3000/blog/limit',{
			method: 'POST',
			headers: {
				'Content-Type' :'application/json'
			},
			body: JSON.stringify({limit : 8})
		})
		const content = await a.json()

		console.log('content',content);
		setData(content)
	}
	useEffect(()=> {
		viewAll()
	},[])
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
  return (
    <header className="text-gray-600 body-font min-h-screen">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center ">
        <a href="" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img src='blog_logo.jpg' className='h-7 w-7 rounded'></img>
          <span className="ml-3 text-xl text-white">Blogger</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 hover:text-slate-100" href="login">View All Blogs</a>
          <a className="mr-5 hover:text-slate-100" href="login">Create Blog</a>
          <a className="mr-5 hover:text-slate-100" href="contactUs">About Us</a>
        </nav>
        <button className="inline-flex items-center bg-gray-100 text-black border-0 py-1 px-5 mx-4 focus:outline-none hover:bg-indigo-600 hover:text-white rounded text-base mt-4 md:mt-0">
          <a href='/login'>
            Login
          </a>
        </button>
        <button className="inline-flex items-center bg-gray-100 text-black border-0 py-1 px-5 focus:outline-none hover:bg-indigo-600 hover:text-white rounded text-base mt-4 md:mt-0">
          <a href='/signup'>
            Sign up
          </a>
        </button>
      </div>
      <div className="mt-5">
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex justify-center mb-10" id="search">
              <form>
                <label htmlFor="title" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </div>
                  <input onChange={handleChange} type="search" id="title" name="title" className="block w-full w-[62vw] p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Blog. . ." required />
                  <button onClick={onRedirect} type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
              </form>
            </div>
            <div className="">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-5 text-center">Blog list</h2>
              <div className="relative flex flex-wrap mx-6 rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                {
                  data.map((blog)=> {
                    return (
                      <article key={blog.id} className="flex max-w-xl flex-col items-start justify-between ml-2 p-5 border-2 rounded h-72 w-72">
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

        </div>
      </div>
    </header>
  )
}
