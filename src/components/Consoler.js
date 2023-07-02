import React from 'react';

const Consoler = ({ nameArtist, keyMusic, swite, slide }) => {
  return (
    <div className=" bg-slate-400 h-full w-full flex">
      <div id="controller-music" className="bg-slate-600 w-4/5 h-full items-center text-center">
        <div className='h-1/2 flex flex-col items-center justify-center'>
            <label className='text-xl'>{nameArtist}</label>
            <span className='text-lg'>{keyMusic}</span>
        </div>

        <div className='h-1/2 flex items-center justify-between px-24'>
            <button className="bg-blue-500 p-2">Back</button>
            ||
            <button className="bg-blue-500 p-2">Next</button>
        </div>
      </div>

      <div className='overflow-y-auto p-1 w-1/5'>
        Mode
        <button className="hover:bg-blue-300 h-1/5 w-full" onClick={() => swite(true)}>
          dochord
        </button>
        <button className="hover:bg-blue-300 h-1/5 w-full" onClick={() => {console.log('Slide Start')}}>
          Slide
        </button> 
        <button className="hover:bg-blue-300 h-1/5 w-full" onClick={() => {console.log('Slide Start')}}>
          Slide
        </button> 
        <button className="hover:bg-blue-300 h-1/5 w-full" onClick={() => {console.log('Slide Start')}}>
          Slide
        </button> 
        <button className="hover:bg-blue-300 h-1/5 w-full" onClick={() => {console.log('Slide Start')}}>
          Slide
        </button> 
      </div>

      {/* <div id="mode-music" className="bg-green-300 grid grid-rows-5 p-1 items-center w-full">
        <button className="bg-blue-300 p-2 h-full" onClick={() => swite(true)}>
          DoCHORD
        </button>
        <button className="bg-blue-300 p-2" onClick={() => {console.log('Slide Start')}}>
          Slide
        </button> 
        <button className="bg-blue-300 p-2" onClick={() => swite(true)}>
          DoCHORD
        </button>
        <button className="bg-blue-300 p-2" onClick={() => swite(true)}>
          DoCHORD
        </button>
        <button className="bg-blue-300 p-2" onClick={() => swite(true)}>
          DoCHORD
        </button>
      </div> */}

    </div>
  );
};

export default Consoler;
