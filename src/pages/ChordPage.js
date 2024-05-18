// import React, { useEffect, useRef, useState } from 'react';
// import { useRouter } from 'next/router';
// import axios from 'axios';
// import TableChords from '@/components/TableChords';
// import Consoler from '@/components/Consoler';
// import { PacmanLoader } from 'react-spinners';

// const ChordPage = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const [loader, setLoader] = useState(false);
//   const [image, setImage] = useState('');

//   const [text, setText] = useState([]);
//   const [key, setKey] = useState(0)
//   const [dochord, setDochord] = useState(false);

//   async function plusKey() {
//     setKey(key+1)
//     setLoader(true);
//     if (key < 0) {
//       var temp = key * -1
//       const response = await axios.get(`/api/text?id=${id}&key=Reducekey&count=${temp}`);
//       setText(response.data);
//       setLoader(false)
//     }else{
//       const response = await axios.get(`/api/text?id=${id}&key=Addkey&count=${key}`);
//       setText(response.data);
//       setLoader(false)
//     }
//   }
  
//   async function minusKey() {
//     setKey(key-1)
//     setLoader(true);
//     if (key < 0) {
//       var temp = key * -1
//       const response = await axios.get(`/api/text?id=${id}&key=Reducekey&count=${temp}`);
//       setText(response.data);
//       setLoader(false)
//     }else{
//       const response = await axios.get(`/api/text?id=${id}&key=Addkey&count=${key}`);
//       setText(response.data);
//       setLoader(false)
//     }
//   }

//   async function axiosText() {
//     setLoader(true);
//     try {
//       const response = await axios.get(`/api/text?id=${id}`);
//       setText(response.data);
//     } catch (error) {
//       console.error('Error fetching text:', error);
//       setText('error');
//     } finally {
//       setLoader(false);
//     }
//   }

//   const axiosImage = async () => {
//     try {
//       const response = await axios.get('/api/image');
//       setImage(response.data);
//       console.log(response.data)
//     } catch (error) {
//       console.error('Error fetching image:', error);
//       setImage('error');
//     }
//   };


//   useEffect(() => {
//     axiosText();
//     // axiosImage();
//   }, []);

//   return (
//     <main>
//       {loader ? (
//         <div>
//           loading...JA=={id}<br />
//           <PacmanLoader color="#36d7b7" />
//         </div>
//       ) : (
//         <div>
//           <div id="container" className={`w-full`}>
//             {text.lines}
//             {key}
//           </div>

//           <div
//             id="controller-bar"
//             className="relative flex text-white bg-slate-900 h-1/5 w-full p-2 gap-2"
//             style={{ position: 'fixed', bottom: 0, width: '100%' }}
//           >
//             <div className="bg-white w-1/5 flex items-center justify-center">
//               {image && <img className='object-cover w-full h-full' src={image} alt="ProflieArts" />}
//             </div>
//             {dochord  ? (
//               <div className="relative w-4/5 h-full overflow-y-auto">
//                 <TableChords chords={text.chord} />
//                 <button
//                   className="bg-red-300 p-1 absolute top-0 left-0"
//                   onClick={() => {
//                     setDochord(false);
//                   }}
//                 >
//                   DoCHORD
//                 </button>
//               </div>
//             ) : (
//               <div className=" w-4/5 h-full">
//                 <Consoler
//                   nameArtist={text.name}
//                   keyMusic={text.key}
//                   swite={setDochord}
//                   plusKey={plusKey}
//                   minusKey={minusKey}
//                 />
//               </div>
//             )}
//           </div>

//         </div>
//       )}
//     </main>
//   );
// };

// export default ChordPage;


// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import axios from 'axios';
// import TableChords from '@/components/TableChords';
// import Consoler from '@/components/Consoler';
// import { PacmanLoader } from 'react-spinners';

// const ChordPage = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const [loader, setLoader] = useState(false);
//   const [image, setImage] = useState('');
//   const [text, setText] = useState([]);
//   const [key, setKey] = useState(0);
//   const [dochord, setDochord] = useState(false);

//   useEffect(() => {
//     if (id) {
//       axiosText();
//     }
//   }, [id]);

//   const axiosText = async () => {
//     setLoader(true);
//     try {
//       const response = await axios.get(`/api/text?id=${id}`);
//       setText(response.data);
//     } catch (error) {
//       console.error('Error fetching text:', error);
//       setText('error');
//     } finally {
//       setLoader(false);
//     }
//   };

//   const adjustKey = async (operation) => {
//     setLoader(true);
//     try {
//       const newKey = operation === 'add' ? key + 1 : key - 1;
//       setKey(newKey);
//       const temp = Math.abs(newKey);
//       const keyType = newKey < 0 ? 'Reducekey' : 'Addkey';
//       const response = await axios.get(`/api/text?id=${id}&key=${keyType}&count=${temp}`);
//       setText(response.data);
//     } catch (error) {
//       console.error('Error adjusting key:', error);
//     } finally {
//       setLoader(false);
//     }
//   };

//   const axiosImage = async () => {
//     try {
//       const response = await axios.get('/api/image');
//       setImage(response.data);
//     } catch (error) {
//       console.error('Error fetching image:', error);
//       setImage('error');
//     }
//   };

//   return (
//     <main>
//       {loader ? (
//         <div>
//           Loading... JA=={id}
//           <br />
//           <PacmanLoader color="#36d7b7" />
//         </div>
//       ) : (
//         <div>
//           <div id="container" className="w-full">
//             {text.lines && text.lines.join('\n')}
//             <div>Key: {key}</div>
//           </div>

//           <div
//             id="controller-bar"
//             className="relative flex text-white bg-slate-900 h-1/5 w-full p-2 gap-2"
//             style={{ position: 'fixed', bottom: 0, width: '100%' }}
//           >
//             <div className="bg-white w-1/5 flex items-center justify-center">
//               {image && <img className="object-cover w-full h-full" src={image} alt="Profile Arts" />}
//             </div>
//             {dochord ? (
//               <div className="relative w-4/5 h-full overflow-y-auto">
//                 <TableChords chords={text.chord} />
//                 <button
//                   className="bg-red-300 p-1 absolute top-0 left-0"
//                   onClick={() => setDochord(false)}
//                 >
//                   DoCHORD
//                 </button>
//               </div>
//             ) : (
//               <div className="w-4/5 h-full">
//                 <Consoler
//                   nameArtist={text.name}
//                   keyMusic={text.key}
//                   swite={setDochord}
//                   plusKey={() => adjustKey('add')}
//                   minusKey={() => adjustKey('subtract')}
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </main>
//   );
// };

// export default ChordPage;


import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import TableChords from '@/components/TableChords';
import Consoler from '@/components/Consoler';
import { PacmanLoader } from 'react-spinners';

const ChordPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loader, setLoader] = useState(false);
  const [image, setImage] = useState('');
  const [text, setText] = useState({ lines: [] });
  const [key, setKey] = useState(0);
  const [dochord, setDochord] = useState(false);

  useEffect(() => {
    if (id) {
      axiosText();
    }
  }, [id]);

  const axiosText = async () => {
    setLoader(true);
    try {
      const response = await axios.get(`/api/text?id=${id}`);
      setText(response.data);
    } catch (error) {
      console.error('Error fetching text:', error);
      setText({ lines: ['error'] });
    } finally {
      setLoader(false);
    }
  };

  const adjustKey = async (operation) => {
    setLoader(true);
    try {
      const newKey = operation === 'add' ? key + 1 : key - 1;
      setKey(newKey);
      const temp = Math.abs(newKey);
      const keyType = newKey < 0 ? 'Reducekey' : 'Addkey';
      const response = await axios.get(`/api/text?id=${id}&key=${keyType}&count=${temp}`);
      setText(response.data);
    } catch (error) {
      console.error('Error adjusting key:', error);
    } finally {
      setLoader(false);
    }
  };

  const renderTextWithHTML = (lines) => {
    const htmlContent = lines.join('<br/>');
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
  };

  return (
    <main>
      {loader ? (
        <div>
          Loading... JA=={id}
          <br />
          <PacmanLoader color="#36d7b7" />
        </div>
      ) : (
        <div>
          <div id="container" className="w-full p-4 text-center">
            {renderTextWithHTML(text.lines)}
            <div>Key: {key}</div>
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
              {image && <img className="object-cover w-full h-full" src={image} alt="Profile Arts" />}
            </div>
            {dochord ? (
              <div className="relative w-4/5 h-full overflow-y-auto">
                <TableChords chords={text.chord} />
                <button
                  className="bg-red-300 p-1 absolute top-0 left-0"
                  onClick={() => setDochord(false)}
                >
                  DoCHORD
                </button>
              </div>
            ) : (
              <div className="w-4/5 h-full">
                <Consoler
                  nameArtist={text.name}
                  keyMusic={text.key}
                  swite={setDochord}
                  plusKey={() => adjustKey('add')}
                  minusKey={() => adjustKey('subtract')}
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
