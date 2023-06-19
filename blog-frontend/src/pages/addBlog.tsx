import Logout from "@/components/logout";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function Addblog() {
	const router = useRouter()
	const [form, setForm] = useState({title : '',description:'',imageUrl:'',category:''})
	const [data, setData] = useState<any[]>([])
	const token = getCookie('jwtToken')

	const createBlog = async () => {
		console.log(form);
		const findId = await fetch('http://127.0.0.1:3000/category/findOne',{
			method: 'POST',
			headers: {
				'Content-Type' :'application/json'
			},
			body: JSON.stringify({name: form.category})
		})
		const finalData =await findId.json()

		const set = await fetch('http://127.0.0.1:3000/blog',{
			method: 'POST',
			headers : {
				'Content-Type' :'application/json',
				'Authorization' : `Bearer ${token}`
			},
			body : JSON.stringify({...form,category : finalData.id})
		})
		const output = await set.json()
		if(set.status === 201) {
			alert('Successfully added blog')
			router.push('viewBlog')
		} else if(set.status == 401) {
			alert('User unauthorized')
		} else if(set.status === 500) {
			alert('something went wrong')
		}

	}
	const getData = async () => {
		const a = await fetch('http://127.0.0.1:3000/category',{
			method: 'GET',
			headers:{
				'Content-Type' :'application/json'
			}
		})
		const content = await a.json()
		console.log(content);
		setData(content)
	}
	const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=> {
		const {name , value} = e.target
        setForm((preform) => ({
			...preform ,
			[name] :value,
		  }));
    }

	useEffect(()=> {
		getData()
	},[])
	return (
		<div>
			<div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center ">
				<a href="" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
					<img src='blog_logo.jpg' className='h-7 w-7 rounded'></img>
					<span className="ml-3 text-xl text-white">Blogger</span>
				</a>
				<nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
					<a className="mr-5 hover:text-slate-100 text-white" href="viewBlog">View All Blogs</a>
					<a className="mr-5 hover:text-slate-100 text-white" href="addBlog">Create Blog</a>
					<a className="mr-5 hover:text-slate-100 text-white" href="contactUs">About Us</a>
					<a className="mr-5 hover:text-slate-100" href="myBlog">My Blogs</a>
				</nav>
				<Logout />
			</div>
			<div className="min-h-screen bg-white flex justify-center">
				<div className="relative flex flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none mt-40">
					<h3 className="block text-center font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
						Blog
					</h3>
					<form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
						<div className="mb-4 flex flex-col gap-6">
							<div className="relative h-11 w-full min-w-[200px]">
								<input
								className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
								id="title"
								name="title"
								onChange={handleChange}
								/>
								<label htmlFor='title' className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
								Title
								</label>
							</div>
							<div>
								<div className="relative w-full min-w-[200px]">
									<textarea
									className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
									id='description'
									name='description'
									value={form.description}
									onChange={handleChange}
									/>
									<label htmlFor="description" className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
										Description of Blog
									</label>
								</div>
							</div>
							<div className="relative h-10 w-full min-w-[200px]">
								<select id="category" name="category" onChange={handleChange} className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
									{
										data.map((category)=>{
											return (
												<option value={category.categoryName}>{category.categoryName}</option>
											)
										})
									}
								</select>
								<label htmlFor="category" className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
									Select a Category
								</label>
							</div>
						</div>
						<button
						className="mt-6 block w-full select-none rounded-lg bg-violet-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
						type="button"
						data-ripple-light="true"
						onClick={createBlog}
						>
						Add
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}