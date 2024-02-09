import React from 'react';

const Consoler = ({ nameArtist, keyMusic, swite, slide }) => {


  const scrollDown = () => {
    const scrollDuration = 30000; // Duration in milliseconds (10 seconds)
  
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
        <button className="hover:bg-green-300 h-1/5 w-full" onClick={scrollDown}>
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

    </div>
  );
};

export default Consoler;
