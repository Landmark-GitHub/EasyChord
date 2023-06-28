import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TableChords from '@/components/TableChords';

const ChordPage = () => {
  const [loader, setLoader] = useState(false);
  const [nameMusic, setNameMusic] = useState('....');
  const [image, setImage] = useState('');
  const [test, setTest] = useState('');

  const [text, setText] = useState([]);

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
    // axiosTest();
  }, []);

  return (
    <div>
      {loader ? (
        <div>loading...</div>
      ) : (
        <>
        <div className='flex'>
          {image && <img src={image} alt="ProflieArts" />}
          <div className='p-2'>
            <label>{text.name}</label><br/>
            <span>{text.key}</span>
          </div>
        </div>
        <div className=''>
          <TableChords
            chords = {text.chord}
          />
        </div>
        </>
      )}
    </div>

  );
};

export default ChordPage;
