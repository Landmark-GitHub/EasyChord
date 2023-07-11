import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import screenshot from '../image/screenshot.png';
import TableChords from '@/components/TableChords';

export default function Test () {

    const [loader, setLoader] = useState(false);
    const [text, setText] = useState([]);
    const [dochord, setDochord] = useState(false);

    const router = useRouter();
    const {idMusic} = router.query

    // console.log(idMusic)

    async function axiosText() {
        setLoader(true);
        try {
          const response = await axios.get(`http://localhost:3000/api/text?id=${idMusic}`);
          console.log(response.data)
          setText(response.data);
        } catch (error) {
          console.error('Error fetching text:', error);
        //   setText('error');
        } finally {
          setLoader(false);
        }
    }


    useEffect(() => {
        axiosText();
      }, []);

  return (

    <>
    {text ?     
        (loader ? 
            <>
        <p >loading...</p>
        <div>
            <button
            className='bg-red-700 text-white font-bold px-6 py-3 rounded-md'
            type='button'
            onClick={() => router.reload({query: {idMusic: idMusic}})}
            >
            Reload
            </button>
            <button
            className='bg-red-700 text-white font-bold px-6 py-3 rounded-md'
            type='button'
            onClick={() => console.log(idMusic)}
            >
            Reload12
            </button>
        </div>
        </>
        :         
        <main className='w-screen h-screen flex flex-col justify-between bg-white'>
            <header className=' bg-gray-300 h-1/6 flex items-center justify-center'>
                {/* <label>{text.chord}</label> */}
                {/* <TableChords chords={text.chord} /> */}
                <button 
                onClick={() => router.push('/')}
                className=' absolute top-5 left-5 bg-black text-red-50'>Back</button>
                <div className='w-2/3 h-full'>
                    <TableChords chords={text.chord} />
                </div>
            </header>

            <connent className='bg-gray-100 h-4/6 flex flex-col items-center justify-center p-2 duration-500 '>
                <div className='overflow-y-auto h-full'>
                    <Image className="w-full" src={screenshot} alt="/123" />
                </div>
            </connent>

            <footer className='bg-gray-300 h-1/6 p-2 flex items-center justify-center
                phone:bg-slate-600
                taplet:bg-red-600 
                laptop:bg-green-300
                dektop:bg-blue-600'>
                <div className='bg-blue-300 grid grid-rows-3 p-1 rounded-lg
                '>
                    <div className='bg-red-300 items-center'>
                        <label>{text.name}</label>
                    </div>
                    <div className='bg-red-900'>
                        Audio<br/>
                    </div>
                    <div className='bg-red-600 items-center'>
                        <label>{text.key}</label>
                    </div>
                    
                </div>
            </footer>
        </main> )
        : 
        <p>error</p>}
    </>

  )
}

