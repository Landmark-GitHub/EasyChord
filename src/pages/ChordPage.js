import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import TableChords from '@/components/TableChords';
import Consoler from '@/components/Consoler';
import { PacmanLoader } from 'react-spinners';
import screenshot from '../pages/screenshot.png';

const ChordPage = () => {
  const [loader, setLoader] = useState(false);
  const [image, setImage] = useState('');
  const [test, setTest] = useState('');

  const [text, setText] = useState([]);
  const [dochord, setDochord] = useState(false);

  const [slideDown, setSlideDown] = useState(false);


  async function axiosText() {
    setLoader(true);
    try {
      const response = await axios.get('/api/text');
      setText(response.data);
    } catch (error) {
      console.error('Error fetching text:', error);
      setText('error');
    } finally {
      setLoader(false);
    }
  }

  const axiosImage = async () => {
    try {
      const response = await axios.get('/api/image');
      setImage(response.data);
    } catch (error) {
      console.error('Error fetching image:', error);
      setImage('error');
    }
  };

  const axiosTest = async () => {
    try {
      const response = await axios.get('/api/test');
      setTest(response.data);
    } catch (error) {
      console.error('Error fetching test:', error);
      setTest('error');
    }
  };

  useEffect(() => {
    axiosText();
    axiosImage();
    axiosTest();
  }, []);

  const scrollDown = () => {
    const scrollDuration = 300000; // Duration in milliseconds (10 seconds)
  
    const start = window.pageYOffset;
    const documentHeight = document.documentElement.scrollHeight;
    const distance = documentHeight - start;
    const startTime = performance.now();
  
    const easeInOutQuad = (t) => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };
  
    const scroll = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const scrollPosition = easeInOutQuad(elapsedTime / scrollDuration) * distance + start;
      window.scrollTo(0, scrollPosition);
  
      if (elapsedTime < scrollDuration) {
        requestAnimationFrame(scroll);
      }
    };
  
    requestAnimationFrame(scroll);
  };

  return (
    <main>
      {loader ? (
        <div>
          loading...<br />
          <PacmanLoader color="#36d7b7" />
        </div>
      ) : (
        <div>
          <div id="container" className={`w-full`}>
            <Image className="bg-slate-500 p-2 w-full" src={screenshot} alt="/123" />
          </div>
          <div className="bg-red-900 h-3/6 w-full py-11 gap-2">
            123
          </div>

          <div
            id="controller-bar"
            className="relative flex text-white bg-slate-900 h-1/5 w-full p-2 gap-2"
            style={{ position: 'fixed', bottom: 0, width: '100%' }}
          >
            <div className="bg-white w-1/5 flex items-center justify-center">
              {image && <img className='object-cover w-full h-full' src={image} alt="ProflieArts" />}
            </div>
            {dochord  ? (
              <div className="relative w-4/5 h-full overflow-y-auto">
                <TableChords chords={text.chord} />
                <button
                  className="bg-red-300 p-1 absolute top-0 left-0"
                  onClick={() => {
                    setDochord(false);
                  }}
                >
                  DoCHORD
                </button>
              </div>
            ) : (
              <div className=" w-4/5 h-full">
                <Consoler
                  nameArtist={text.name}
                  keyMusic={text.key}
                  swite={setDochord}
                />
              </div>
            )}
          </div>

        </div>
      )}
    </main>
  );
};

export default ChordPage;
