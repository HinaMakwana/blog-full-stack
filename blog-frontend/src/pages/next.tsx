import Mycarousel from "@/components/carousel";
import Logout from "@/components/logout";

export default function Next() {
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
				<a className="mr-5 hover:text-slate-100" href="myBlog">My Blog</a>
				<a className="mr-5 hover:text-slate-100" href="contactUs">About Us</a>
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
					<Mycarousel />

				</div>
			</div>
		</header>
	)
}