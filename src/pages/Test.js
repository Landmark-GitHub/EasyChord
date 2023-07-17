import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import screenshot from '../image/screenshot.png';
import TableChords from '@/components/TableChords';

export default function Test() {
  const [loader, setLoader] = useState(false);
  const [text, setText] = useState({});
  const [dochord, setDochord] = useState(false);

  const [count, setCount] = useState(0);

  const router = useRouter();
  const { id } = router.query;

  async function axiosText() {
    // setLoader(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/text?id=${id}`);
      setText(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  }

  async function changKey(keyword) {
    if (keyword === 'Addkey') {
        setCount(count + 1)
        console.log(count);
        try {
            console.log('Addkey successfully added OKK ADDKEY +')
            const response = await axios.get(`http://localhost:3000/api/text?id=${id}&key=${keyword}&count=${count}`);
            setText(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            console.log('ok')
        }
    } else {
        setCount(count - 1);
        console.log(count);
        try {
            console.log('Addkey successfully added OKK ADDKEY +')
            const response = await axios.get(`http://localhost:3000/api/text?id=${id}&key=${keyword}&count=${count}`);
            setText(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            console.log('ok')
        }
    }
  }

  function parseChordsInText(musicText) {
    const chordRegex = /([A-Ga-g][#|b]?m?)/g;
    const chords = musicText.match(chordRegex);
    const parts = musicText.split(chordRegex);

    return parts.map((part, index) => {
      if (chords && chords[index]) {
        return (
          <p key={index}>
            {part}
            <span id="c_chord">{chords[index]}</span>
          </p>
        );
      } else {
        return <p key={index}>{part}</p>;
      }
    });
  }

  useEffect(() => {
    axiosText();
    setCount(0);
  }, [id]);

  return (
    <main className='w-screen h-screen flex flex-col justify-between bg-white overflow-hidden'>
      {text ? (
        loader ? (
          <>
            <p>loading...Jaa</p>
            <p>ID : {id}</p>
          </>
        ) : (
          <>
            <header className='bg-gray-300 h-1/6 py-3'>
              <button onClick={() => router.push('/')} className='absolute top-5 left-5 bg-black text-red-50'>
                Back
              </button>
              <div className='hover:h-full grid grid-cols-[20%_60%_20%]'>
                <label />

                <div className='bg-black opacity-75 hover:opacity-90 grid grid-cols-[20%_60%_20%] gap-1 p-1 text-white rounded-full'>
                  <label className='bg-green-500 rounded-l-full'>{id}</label>

                  <div className='grid grid-rows-[50%_50%]'>
                    {/* Use optional chaining */}
                    <div className='bg-red-300'>{text.name}</div>
                    <div className='bg-blue-300'>{text.capo}</div>
                  </div>

                  <div className='bg-green-500 rounded-r-full mr-2 flex justify-between'>
                    <label>
                      <button className='bg-red-300 p-2' onClick={() => changKey('Reducekey')}>
                        -
                      </button>
                    </label>
                    <label>{text?.key}</label>
                    <label>
                      <button className='bg-red-300 p-2' onClick={() => changKey('Addkey')}>
                        +
                      </button>
                    </label>
                  </div>
                </div>

                <label />
              </div>
            </header>

            <content className='bg-gray-100 h-4/6 flex flex-col items-center justify-center p-2 duration-500'>
              <div className='bg-red-300 w-2/3 p-2 overflow-y-auto h-full'>
                {loader ? (
                  <p>Loading Image...</p>
                ) : (
                    <div className='grid gap-4'>
                        {/* <p className="cv-th">{parseChordsInText(text.music)}</p> */}
                        <p>{text.music}</p>
                        <p class="cv-th">* ไม่อยาก <span id="c_chord">G</span>ให้คุณมีแฟน ไม่ได้อยาก<span id="c_chord">Gm</span>ให้คุณมีใคร </p>
                        <p class="cv-th">คนเดียวนี้นั้<span id="c_chord">F#m</span>นไว้ใจยาก มีแต่ผม<span id="c_chord">B7</span>ที่ไว้ใจได้ </p>
                        <p class="cv-th">ไม่อยาก<span id="c_chord">G</span>ให้คุณมีแฟน ไม่ได้อยาก<span id="c_chord">Gm</span>ให้คุณมีใคร </p>
                        <p class="cv-th">อยากให้มีแ<span id="c_chord">F#m</span>ค่ผมคนเดียว ได้ไหม<span id="c_chord">B7</span> </p>
                        <hr/>
                        <p class="cv-th">* ไม่อยาก <span id="c_chord">G</span>ให้คุณมีแฟน ไม่ได้อยาก<span id="c_chord">Gm</span>ให้คุณมีใคร </p>
                        <p class="cv-th">คนเดียวนี้นั้<span id="c_chord">F#m</span>นไว้ใจยาก มีแต่ผม<span id="c_chord">B7</span>ที่ไว้ใจได้ </p>
                        <p class="cv-th">ไม่อยาก<span id="c_chord">G</span>ให้คุณมีแฟน ไม่ได้อยาก<span id="c_chord">Gm</span>ให้คุณมีใคร </p>
                        <p class="cv-th">อยากให้มีแ<span id="c_chord">F#m</span>ค่ผมคนเดียว ได้ไหม<span id="c_chord">B7</span> </p>
                    </div>
                )}
              </div>
            </content>

            <footer className='h-1/6 flex items-center justify-center'>
              <div className='w-2/3 h-full'>
                <TableChords chords={text.chord} />
              </div>
            </footer>
          </>
        )
      ) : (
        <p>error</p>
      )}
    </main>
  );
}
