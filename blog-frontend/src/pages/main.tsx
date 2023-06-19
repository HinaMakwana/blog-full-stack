import Mycarousel from "@/components/carousel"
import { getCookie } from "cookies-next"
import { useRouter } from "next/router"

  export default function Example() {
	const router = useRouter()
	  const token = getCookie('jwtToken')
	  console.log('token',token);

	  if(token) {
		router.push('next')
	  } else {
		router.push('login')
	  }
	  return (
		<div className="min-h-screen">
		</div>
	)
  }
