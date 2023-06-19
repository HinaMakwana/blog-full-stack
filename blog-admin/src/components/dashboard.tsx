import Link from "next/link";
import Profile from "./profile";


export default function Dashboard() {
	return (
		<div className="flex flex-row">
			<div className="-mt-60 bg-slate-500 h-[124.6vh] w-72" id="dashboard">
				<aside className='w-full md:w-60  '>
					<div className="sm:mx-auto sm:w-full sm:max-w-sm flex justify-center mt-64">
						<a href="" className="flex title-font font-medium text-gray-900 md:mb-0">
							<img src='blog_logo.jpg' className='h-7 w-7 rounded'></img>
							<span className="ml-3 text-xl text-black">Blogger</span>
						</a>
					</div>
					<nav className="mt-10">
						<div className="bg-transperent mx-8">
							<Link href='main' className="flex flex-row hover:bg-slate-400  rounded">
								<svg xmlns="http://www.w3.org/2000/svg" width="19" height="16" fill="currentColor" className="bi bi-house stroke-black my-1" viewBox="0 0 19 16">
									<path fillRule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
									<path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
								</svg>Dashboard
							</Link>
						</div>
						<div className="bg-transperent mx-8 py-5">
							<Link href='user' className="flex flex-row hover:bg-slate-400 rounded">
								<svg xmlns="http://www.w3.org/2000/svg" width="19" height="16" fill="currentColor" className="bi bi-person-fill stroke-black my-1" viewBox="0 0 16 16">
									<path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
								</svg>Users
							</Link>
						</div>
						<div className="bg-transperent mx-8">
							<Link href='category' className="flex flex-row hover:bg-slate-400 rounded">
							<svg xmlns="http://www.w3.org/2000/svg" width="19" height="16" fill="currentColor" className="bi bi-list-check stroke-black my-1" viewBox="0 0 16 16">
								<path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
							</svg>Category
							</Link>
						</div>
						<div className="bg-transperent mx-8 py-5">
							<Link href='blog' className="flex flex-row hover:bg-slate-400  rounded">
							<svg xmlns="http://www.w3.org/2000/svg" width="19" height="16" fill="currentColor" className="bi bi-folder2 stroke-black my-1" viewBox="0 0 16 16">
								<path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 12.5v-9zM2.5 3a.5.5 0 0 0-.5.5V6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5zM14 7H2v5.5a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5V7z"/>
							</svg>Blog
							</Link>
						</div>
					</nav>
				</aside>
			</div>
			<div className="absolute right-3 top-2 flex flex-col">
				<div className="">
					<Profile />
				</div>
				<div>

				</div>
			</div>
		</div>
	)
}