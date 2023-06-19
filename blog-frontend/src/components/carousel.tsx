import { log } from "console";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

// interface Props {
// 	blogData: {
// 	  categoryName: string;
// 	};
//   }

export default function Mycarousel({blogData}:any) {
	const [data, setData] = useState<any[]>([])
	const token = getCookie('jwtToken')

	const viewAll = async() => {
		const a = await fetch('http://127.0.0.1:3000/blog/limit',{
			method: 'POST',
			headers: {
				'Content-Type' :'application/json'
			},
			body: JSON.stringify({limit : 8})
		})
		const content = await a.json()
		if(blogData){
			setData(blogData)
		}
		console.log('content',content);
		setData(content)
	}
	useEffect(()=> {
		viewAll()
	},[])
  return (
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
  );
}