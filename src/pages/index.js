import { useRouter } from 'next/router';
import Search from '@/components/Search';
import Image from 'next/image';
import profilePic from '../image/Screenshot_2023-07-08_232129-transformed.png'
import { useState } from 'react';

export default function Home() {

  const [openMuduls, setOpenMuduls] = useState(false);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);

  const [user, setUser] = useState(true);

  const router = useRouter();

  return (
    <main className="w-screen h-screen grid grid-cols-[50%_50%] overflow-hidden">

      <div className=''>
        <h1 className='z-0 text-5xl m-3 sx:hidden'> EasyChord. </h1>
        <label className='z-20 absolute bottom-0 p-3 font-bold'>
          &copy; {new Date().getFullYear()} EasyChord. All rights reserved.
        </label>
        <Image
          src={profilePic}
          alt="Picture of the author"
          className='absolute bottom-0'
          width={740}
          height={500} 
          // blurDataURL="data:..." automatically provided
          // placeholder="blur" // Optional blur-up while loading
        />
      </div>

      <content className="grid grid-rows-[10%_80%_10%]">
        <div className=' bg-yellow-400 rounded-l-lg pr-4'>
          {user ? 
          <div className="w-full h-full grid grid-cols-[60%_40%] gap-2 pr-2">     
            <label/>
            <div className="flex justify-end items-center gap-2 cursor-pointer"
            onClick={() => {
              setMenu(true)
              // alert('LOCKOUT')
            }}>
              <label className="font-bold text-lg ">username</label>
              <div className="bg-slate-100 rounded-full w-12 h-12">img</div>
            </div>

            {menu && (
              <>
            <div className="fixed inset-0 z-10 transition-opacity">
              <div
                className="absolute inset-0 z-10 bg-black opacity-75"
                onClick={
                  () => {
                    setMenu(false)
                    setSearch(false)
                  }
                }
              ></div>
            </div>  
            <div className={`absolute ${search ? 'h-3/4' : ''} w-1/4 z-20 p-0 top-6 right-0 mt-12 mr-2 bg-white rounded-md shadow-lg`}>
              <ul className={`py-2 ${search ? 'h-full':''}`}>
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleMenuItemClick('profile')}
                >
                  Profile
                </li>
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => setSearch(!search)}
                >
                  Search
                </li>
             
                {search && 
                <li
                  className="h-4/6 my-2"
                >
                  <Search
                    user={user}
                  />
                </li>
                }
         

                <li
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleMenuItemClick('turner')}
                >
                  Turner
                </li>
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-red-300"
                  onClick={() => setUser(false)}
                >
                  Lockout
                </li>
              </ul>
            </div>
            </>
          )}  

          </div>        
          :
          <div className="w-full h-full grid grid-cols-[60%_20%_20%] gap-2 p-4 pr-2">
            <label className='text-yellow-400 text-4xl font-bold cursor-pointer transition duration-500 ease-in transform hover:scale-105 hover:text-white'> EasyChord </label>
            <button class="cursor-pointer transition duration-500 ease-in-out transform hover:scale-105 hover:text-white hover:border-white border-4 border-yellow-400 font-bold rounded-full"
            onClick={() => setOpenMuduls('Login')}
            // onClick={() => setUser(true)}
            >Login</button>
            <button class="cursor-pointer transition duration-500 ease-in-out transform hover:scale-105 hover:text-white hover:border-white border-4 border-yellow-400 font-bold rounded-full"
            onClick={() => setOpenMuduls('Register')}
            >Register</button>
          </div>
          }
        </div>

        <Search
          openMuduls={openMuduls}
          setOpenMuduls={setOpenMuduls}
          user={user}
        />

        <div className=''>
          Context ME
        </div>
      </content>

      {openMuduls && openMuduls === "Login" &&(
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 transition-opacity">
              <div
                className="absolute inset-0 bg-black opacity-75"
                onClick={() => setOpenMuduls(false)}
              ></div>
            </div>
            <form className="bg-yellow-400 rounded-lg h-screen shadow-xl transform transition-all sm:w-3/4 md:w-2/3 lg:w-1/2 p-4" onClick={(e) => e.stopPropagation()}>

              <div>
                <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0">
                  <div href="/">
                    <h3 className="text-4xl font-bold text-yellow-600">
                      EasyChord
                    </h3>
                  </div>
                  <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
                    <form>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 undefined"
                        >
                          Email
                        </label>
                        <div className="flex flex-col items-start">
                          <input
                            type="email"
                            name="email"
                            className="block w-full mt-1 border-yellow-400 border-2 hover:border-4 hover:scale-105 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-700 undefined"
                        >
                          Password
                        </label>
                        <div className="flex flex-col items-start">
                          <input
                            type="password"
                            name="password"
                            className="block w-full mt-1 border-yellow-400 border-2 hover:border-4 hover:scale-105 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          />
                        </div>
                      </div>
                      <a
                        href="#"
                        className="text-xs text-yellow-600 hover:text-yellow-400 hover:underline"
                      >
                        Forget Password?
                      </a>
                      <div className="flex items-center mt-4">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform hover:scale-105 bg-yellow-600 rounded-md hover:bg-yellow-400 focus:outline-none focus:bg-yellow-600"
                        onClick={() => {
                          setUser(true)
                          setOpenMuduls(false)
                          setMenu(false)
                        }}
                        >
                          Login
                        </button>
                      </div>
                    </form>
                    <div className="mt-4 text-grey-600">
                      Already have an account?{" "}
                      <span>
                        <a className="text-yellow-600 hover:text-yellow-400 hover:underline" href="#">
                          Log in
                        </a>
                      </span>
                    </div>
                    <div className="flex items-center w-full my-4">
                      <hr className="w-full" />
                      <p className="px-3 ">OR</p>
                      <hr className="w-full" />
                    </div>
                    <div className="my-6 space-y-2">
                      <button
                        aria-label="Login with Google"
                        type="button"
                        className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 32 32"
                          className="w-5 h-5 fill-current"
                        >
                          <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                        </svg>
                        <p>Login with Google</p>
                      </button>
                      <button
                        aria-label="Login with GitHub"
                        role="button"
                        className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 32 32"
                          className="w-5 h-5 fill-current"
                        >
                          <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
                        </svg>
                        <p>Login with GitHub</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {openMuduls && openMuduls === "Register" && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 transition-opacity">
              <div
                className="absolute inset-0 bg-black opacity-75"
                onClick={() => setOpenMuduls(false)}
              ></div>
            </div>
            <form className="bg-yellow-400 rounded-lg shadow-xl transform transition-all sm:w-3/4 md:w-2/3 lg:w-1/2 p-4" onClick={(e) => e.stopPropagation()}>

              <div>
                <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0">
                  <div href="/">
                    <h3 className="text-4xl font-bold text-yellow-600">
                      EasyChord
                    </h3>
                  </div>
                  <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
                    <form>
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 undefined"
                        >
                          Name
                        </label>
                        <div className="flex flex-col items-start">
                          <input
                            type="text"
                            name="name"
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 undefined"
                        >
                          Email
                        </label>
                        <div className="flex flex-col items-start">
                          <input
                            type="email"
                            name="email"
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-700 undefined"
                        >
                          Password
                        </label>
                        <div className="flex flex-col items-start">
                          <input
                            type="password"
                            name="password"
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label
                          htmlFor="password_confirmation"
                          className="block text-sm font-medium text-gray-700 undefined"
                        >
                          Confirm Password
                        </label>
                        <div className="flex flex-col items-start">
                          <input
                            type="password"
                            name="password_confirmation"
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          />
                        </div>
                      </div>
                      <a
                        href="#"
                        className="text-xs text-yellow-600 hover:underline"
                      >
                        Forget Password?
                      </a>
                      <div className="flex items-center mt-4">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-yellow-700 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600">
                          Register
                        </button>
                      </div>
                    </form>
                    <div className="mt-4 text-grey-600">
                      Already have an account?{" "}
                      <span>
                        <a className="text-yellow-600 hover:underline" href="#">
                          Log in
                        </a>
                      </span>
                    </div>
                    <div className="flex items-center w-full my-4">
                      <hr className="w-full" />
                      <p className="px-3 ">OR</p>
                      <hr className="w-full" />
                    </div>
                    <div className="my-6 space-y-2">
                      <button
                        aria-label="Login with Google"
                        type="button"
                        className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 32 32"
                          className="w-5 h-5 fill-current"
                        >
                          <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                        </svg>
                        <p>Login with Google</p>
                      </button>
                      <button
                        aria-label="Login with GitHub"
                        role="button"
                        className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 32 32"
                          className="w-5 h-5 fill-current"
                        >
                          <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
                        </svg>
                        <p>Login with GitHub</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

    </main>
  );
}
