import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TableChords from '@/components/TableChords';

const ChordPage = () => {
  const [loader, setLoader] = useState(false);
  const [nameMusic, setNameMusic] = useState('....');
  const [image, setImage] = useState('');
  const [test, setTest] = useState('');

  const [text, setText] = useState([]);
  const [dochord, setDochord] = useState(false);

  let chordC = process.env.CHROD_C

  async function axiosText () {
    setLoader(true);
    try {
      const response = await axios.get('/api/text');
      setText(response.data);
      // console.log(response.data);
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
  }

  useEffect(() => {
    axiosText();
    axiosImage();
    axiosTest();
  }, []);

  return (
    <main>
      {loader ? (
        <div>loading...</div>
      ) : (
        <>
          <div className='relative flex text-white bg-slate-900 h-2/6 w-full p-2' style={{ position: 'fixed', bottom: 0, width: '100%'}}>
            {image && <img src={image} alt="ProflieArts" />}
            {dochord ? (
              <div className='bg-blue-300 relative w-full z-0 flex flex-col items-center'>
                <div className='bg-blue-800 flex w-full h-full overflow-x-auto p-1'>
                  <TableChords
                    chords={text.chord}
                  />
                </div>
                <button 
                  className='bg-red-300 p-1 absolute top-0 left-0'
                  onClick={() => {setDochord(false)}}
                >
                  DoCHORD
                </button>
              </div>
            ) : (
              <div className='p-2'>
                <label>{text.name}</label><br/>
                <span>{text.key}</span>
                <button 
                  className='bg-red-300 p-2'
                  onClick={() => {setDochord(true)}}
                >
                  DoCHORD
                </button>
              </div>
            )}
          </div>
          <div className='w-full h-full'>
            {image && <img src={test} alt="123123456" />}
          </div>
        </>
      )}
    </main>

  );
};

export default ChordPage;
