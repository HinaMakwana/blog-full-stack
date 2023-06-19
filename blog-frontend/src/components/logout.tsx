import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/router";


export default function Logout() {
	const token = getCookie('jwtToken')
	const router = useRouter()
	const deleteBlog = async () => {
		const set = await fetch('http://127.0.0.1:3000/user/logout',{
			method: 'POST',
			headers : {
				'Content-Type' :'application/json',
				'Authorization' : `Bearer ${token}`
			}
		})
		console.log('output data',set);
		if(set.status == 201){
			alert('Logout successfully')
			deleteCookie('jwtToken')
			router.push('/')
		}
	}
	return (
		<div>
			<button onClick={deleteBlog} className="inline-flex items-center bg-gray-100 text-black border-0 py-1 px-5 mx-4 focus:outline-none hover:bg-indigo-600 hover:text-white rounded text-base mt-4 md:mt-0">
						Logout
			</button>
		</div>
	)
}