import { useState } from 'react'
import { useRouter } from 'next/router'
import { getCookie, setCookie } from 'cookies-next'


export default function Home() {
  const router = useRouter()
  const [form, setForm] = useState({ email : '', password: ''})

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=> {
		const {name , value} = e.target as HTMLInputElement ;
        setForm((preform) => ({
			...preform ,
			[name] :value,
		  }));
    }
    const submit = async (e:React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      const a = await fetch('http://127.0.0.1:3000/admin/login',{
        method: 'POST',
        headers :{
          'Content-Type' :'application/json'
          },
        body: JSON.stringify(form)
      })
      const content = await a.json()
      console.log('res',content.token);
      setCookie("authToken",content.token,{
        path: '/',
        maxAge: 3600,
        sameSite: true,
        secure: true
      })
      if(a.status === 201) {
        alert('Login successful')
        router.push('main')
      } else if(a.status === 404) {
        alert('email or password invalid')
      } else if(a.status === 403) {
        alert('password invalid')
      }
    }
    const token = getCookie('authToken')
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      { token && router.push('main')}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex justify-center mt-60">
          <a href="" className="flex title-font font-medium text-gray-900 md:mb-0">
            <img src='blog_logo.jpg' className='h-7 w-7 rounded'></img>
            <span className="ml-3 text-xl text-black">Blogger</span>
          </a>
			  </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-slate-500 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={submit}
                className="flex w-full justify-center rounded-md bg-slate-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}
