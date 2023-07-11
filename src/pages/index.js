import { useRouter } from 'next/router';
import Login from '@/components/Login';
import Search from '@/components/Search';
import Image from 'next/image';
import profilePic from '../image/Screenshot_2023-07-08_232129-transformed.png'

export default function Home() {
  const router = useRouter();

  return (
    <main className="w-screen h-screen grid grid-cols-[50%_50%] ">

      <div className=''>
        <h1 className='z-0 text-5xl m-3'> EasyChord. </h1>
        <div className='z-20 absolute bottom-0 p-3'>
          &copy; {new Date().getFullYear()} EasyChord. All rights reserved.
        </div>
        <Image
          src={profilePic}
          alt="Picture of the author"
          className='z-10 absolute bottom-0'
          width={760}
          height={500} 
          blurDataURL="data:..." automatically provided
          placeholder="blur" // Optional blur-up while loading
        />
      </div>

      <footer className="text-sm grid grid-rows-[10%_80%_10%]">
        <div className=' bg-yellow-400 rounded-l-lg'>

          <button> LogIN </button>
          <button> SignIN </button>
          <button class="rounded-full ...">Save Changes</button>

        </div>
        <Search/>
        <div className=''></div>
      </footer>
    </main>
  );
}
