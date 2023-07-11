import { useRouter } from 'next/router';
import Search from '@/components/Search';
import Image from 'next/image';
import profilePic from '../image/Screenshot_2023-07-08_232129-transformed.png'
import { useState } from 'react';

export default function Home() {

  const [openMuduls, setOpenMuduls] = useState(false);

  const router = useRouter();

  return (
    <main className="w-screen h-screen grid grid-cols-[50%_50%] overflow-hidden">

      <div className=''>
        <h1 className='z-0 text-5xl m-3'> EasyChord. </h1>
        <label className='z-20 absolute bottom-0 p-3 font-bold'>
          &copy; {new Date().getFullYear()} EasyChord. All rights reserved.
        </label>
        <Image
          src={profilePic}
          alt="Picture of the author"
          className='z-10 absolute bottom-0'
          width={740}
          height={500} 
          blurDataURL="data:..." automatically provided
          placeholder="blur" // Optional blur-up while loading
        />
      </div>

      <content className="grid grid-rows-[10%_80%_10%]">

        <div className=' bg-yellow-400 p-4 rounded-l-lg grid grid-cols-[60%_20%_20%] gap-2'>
          <label/>
          <button class="cursor-pointer transition duration-500 ease-in-out transform hover:scale-105 hover:text-white hover:border-white border-4 border-yellow-400 font-bold rounded-full"
          onClick={() => setOpenMuduls('Login')}
          >Login</button>
          <button class="cursor-pointer transition duration-500 ease-in-out transform hover:scale-105 hover:text-white hover:border-white border-4 border-yellow-400 font-bold rounded-full"
          onClick={() => setOpenMuduls('Register')}
          >Register</button>
        </div>

        <Search/>

        <div className=''></div>
      </content>

      {openMuduls && openMuduls === "Login" &&(
        <div className='fixed z-10 inset-0 overflow-y-auto'>
          <div className='flex items-center justify-center min-h-screen'>
            <div className='fixed inset-0 transition-opacity'>
              <div className='absolute inset-0 bg-black opacity-75'
              onClick={() => setOpenMuduls(false)}></div>
            </div>
            <from>

            </from>
          </div>
        </div>
      )}

      {openMuduls && openMuduls === "Register" &&(
        <div className='fixed z-10 inset-0 overflow-y-auto'>
          <div className='flex items-center justify-center min-h-screen'>
            <div className='fixed inset-0 transition-opacity'>
              <div className='absolute inset-0 bg-black opacity-75'
              onClick={() => setOpenMuduls(false)}></div>
            </div>
            <from className='bg-white rounded-lg shadow-xl transform transition-all sm:w-3/4 md:w-2/3 lg:w-1/2 p-4' onClick={(e) => e.stopPropagation()}>
              <div className='grid grid-cols-2 gap-2 w-full'>
                123
              </div>
            </from>
          </div>
        </div>
      )}

    </main>
  
  );
}



// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

// if (openMuduls && openMuduls === 'login') {
//   return(
//     <div className="bg-black bg-opacity-40 min-h-screen flex items-center justify-center">
//       <Modal
//         aria-labelledby="spring-modal-title"
//         aria-describedby="spring-modal-description"
//         open={openMuduls}
//         onClose={() => setOpenMuduls(false)}
//         closeAfterTransition
//         // slots={{ backdrop: Backdrop }}
//         slotProps={{
//           backdrop: {
//             TransitionComponent: Fade,
//           },
//         }}
//       >
//         {/* <Fade in={open}> */}
//           <Box sx={style}>
//             <Typography id="spring-modal-title" variant="h6" component="h2">
//               Text in a modal
//             </Typography>
//             <Typography id="spring-modal-description" sx={{ mt: 2 }}>
//               Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//             </Typography>
//           </Box>
//         {/* </Fade> */}
//       </Modal>
//     </div>
//   )
// }

