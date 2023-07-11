import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';

const inter = Inter({ subsets: ['latin'] });

export default function Search() {
  const [keyword, setKeyword] = useState('');
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);

  async function axiosSearch() {
    setLoad(true);
    try {
      const response = await axios.get(`/api/SearchMusic?name=${keyword}`);
      setData(response.data);
      setLoad(false);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const router = useRouter();

  return (
      <div className='bg-gray-100 h-full flex flex-col items-center justify-center p-2 duration-500 '>
          <div className=' w-2/3 px-3 rounded-lg drop-shadow-xl transition duration-700 ease-in-out transform'>
              <div className='m-4 rounded-lg grid grid-rows-2 gap-2'>
                  <h1 className='text-black font-bold text-4xl'>EasyChord</h1>
                  <label className='mt-1.5 flex'>
                      <input
                          type='text'
                          name='name'
                          placeholder='Search...'
                          className='border w-full border-gray-300 px-4 py-2 rounded-l-md focus:outline-none'
                          onChange={(event) => setKeyword(event.target.value)}
                      />
                      <button
                          className=' bg-slate-200 cursor-pointer transition duration-500 ease-in-out transform hover:scale-105 font-bold px-4 py-2 rounded-r-md'
                          onClick={axiosSearch}
                      >
                          Search
                      </button>
                  </label>
              </div>
              <div className='m-4 mt-2 w-full max-h-96 transition duration-500 ease-in-out transform overflow-y-auto'>

                  {load ? <h1>loading...</h1> : (data.length > 0 ? (
                      <ul className='space-y-4'>
                          {data.map((item, index) => (
                              <li
                                  key={index}
                                  className='hover:drop-shadow-lg bg-white transition duration-500 ease-in-out transform hover:scale-105 cursor-pointer px-4 py-2 rounded-md'
                                  onClick={() => {
                                      let url = item.url
                                      let format = url.split('/').filter(Boolean).pop();
                                      console.log(url)
                                      router.push({
                                          pathname: '/Test',
                                          query: { idMusic: format },
                                      })
                                  }}
                              >
                                  {item.name}
                              </li>
                          ))}
                      </ul>
                  ) : (
                      <p className='text-gray-500'>ค้นหาเพลงสิไอสัส</p>
                  ))}

              </div>
          </div>
      </div>
  );
}
