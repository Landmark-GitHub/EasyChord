import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [keyword, setKeyword] = useState('');
  const [data, setData] = useState([]);

  async function axiosSearch() {
    try {
      const response = await axios.get(`/api/SearchMusic?name=${keyword}`);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const router = useRouter();

  return (
    <main className='w-screen h-screen flex flex-col justify-between'>
      
      <div className='bg-red-300 h-1/6'>123</div>

      <div className='bg-slate-900 h-full flex flex-col items-center justify-center p-2'>
        <div className='bg-white'>
          <label className='font-bold'>EasyChord</label>
          <div className='bg-white p-2 rounded-full'>
            <input
              type='text'
              name='name'
              placeholder='Search...'
              onChange={(event) => setKeyword(event.target.value)}
            />
            <button onClick={axiosSearch}>Search</button>
          </div>
          <div className='p-5'>
            List<br />
            {data && data.map((item, index) => 
            <li 
            key={index} 
            className=' hover:bg-slate-500 '
            onClick={() => {console.log(item.url)}}>
              {item.name}</li>)}
          </div>
        </div>
      </div>


      <div className='bg-red-300 h-1/6'>
        <button className='bg-red-700 p-3' type='button' onClick={() => router.push('/ChordPage')}>
          Click me
        </button>
      </div>

    </main>
  );
}
