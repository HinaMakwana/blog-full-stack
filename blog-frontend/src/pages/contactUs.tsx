import { getCookie } from "cookies-next"


export default function Contact() {
	const token = getCookie('jwtToken')
	return (
		<section className="text-gray-600 body-font relative bg-white">
			<div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center ">
				<a href="" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
					<img src='blog_logo.jpg' className='h-7 w-7 rounded'></img>
					<span className="ml-3 text-xl text-black">Blogger</span>
				</a>
			</div>
			<div className="container px-5 py-20 mx-auto">
				<div className="flex flex-col text-center w-full mb-12">
				<h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-black">Contact Us</h1>
				<p className="lg:w-2/3 mx-auto leading-relaxed text-base text-black">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify.</p>
				</div>
				<div className="lg:w-1/2 md:w-2/3 mx-auto">
					<div className="flex flex-wrap -m-2">
						<div className="p-2 w-1/2">
						<div className="relative">
							<label htmlFor="name" className="leading-7 text-sm text-black">Name</label>
							<input type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
						</div>
						</div>
						<div className="p-2 w-1/2">
							<div className="relative">
								<label htmlFor="email" className="leading-7 text-sm text-black">Email</label>
								<input type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
							</div>
						</div>
						<div className="p-2 w-full">
							<div className="relative">
								<label htmlFor="message" className="leading-7 text-sm text-black">Message</label>
								<textarea id="message" name="message" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
							</div>
						</div>
						<div className="p-2 w-full">
							<button className="flex mx-auto text-black bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}