// import Image from "next/image";
// import { Inter } from "next/font/google";
// import { useRouter } from "next/router";
// import { useState } from "react";
// import axios from "axios";

// export default function Search({ openMuduls, setOpenMuduls, user }) {
//     const [keyword, setKeyword] = useState("");
//     const [data, setData] = useState([]);
//     const [load, setLoad] = useState(false);

//     async function axiosSearch() {
//         setLoad(true);
//         try {
//             const response = await axios.get(
//             `http://localhost:3000/api/SearchMusic?name=${keyword}`
//             );
//             setData(response.data);
//             setLoad(false);
//         } catch (error) {
//             console.error(error);
//             alert("ลองใหม่อีกครั้ง");
//             setLoad(false);
//         }
//     }

//     const router = useRouter();

//     return (
//     <div
//         className={`w-full h-full rounded-lg ${
//         data ? "grid grid-rows-[10%_90%] gap-2" : "flex items-center"
//         }`}
//     >
//         <div className={`rounded-lg p-2 py-2`}>
//         <label className="flex">
//             <input
//             type="text"
//             name="name"
//             placeholder="Search..."
//             className={`border w-full border-gray-300 px-4 py-2 rounded-l-md focus:outline-none  ${
//                 load ? "border-2 border-yellow-400" : ""
//             }`}
//             onChange={(event) => setKeyword(event.target.value)}
//             />
//             <button
//             className={`bg-yellow-400 z-0 hover:bg-yellow-200 hover:text-yellow-400 ${
//                 load ? "bg-yellow-200 text-yellow-400 drop-shadow-xl" : " "
//             } cursor-pointer transition duration-500 ease-in-out transform hover:scale-105 font-bold px-4 py-2 rounded-r-md`}
//             onClick={axiosSearch}
//             >
//             Search
//             </button>
//         </label>
//         </div>

//         <div className="p-2 overflow-y-auto ">
//         {load ? (
//             <h1>loading...</h1>
//         ) : data.length > 0 ? (
//             <ul className="space-y-4 z-0 transition duration-500 ease-in-out transform scale-100">
//             {data.map((item, index) => (
//                 <li
//                 key={index}
//                 className="hover:drop-shadow-lg z-0 bg-white transition duration-300 ease-in-out transform hover:scale-105  hover:border-4 hover:border-yellow-400 cursor-pointer mx-4 p-2 rounded-md"
//                 onClick={() => {
//                     let url = item.url;
//                     let format = url.split("/").filter(Boolean).pop();
//                     console.log(url);
//                     console.log(format);
//                     console.log(item);
//                     if (user) {
//                     router.push({
//                         pathname: "/ChordPage",
//                         query: { id: format },
//                     });
//                     } else {
//                     setOpenMuduls("Login");
//                     alert("แอ๊ะๆ Login ก๊อนนน");
//                     }
//                 }}
//                 >
//                 {item.name}
//                 </li>
//             ))}
//             </ul>
//         ) : (
//             <p className="text-gray-500">ค้นหาเพลงสิ</p>
//         )}
//         </div>
//     </div>
//     );
// }

import Image from "next/image";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useState, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce"; // Import debounce from lodash

export default function Search({ openMuduls, setOpenMuduls, user }) {
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);

  const router = useRouter();

  const axiosSearch = useCallback(
    debounce(async (searchTerm) => {
      if (!searchTerm) {
        setData([]);
        return;
      }

      setLoad(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/SearchMusic?name=${searchTerm}`
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
        alert("ลองใหม่อีกครั้ง");
      } finally {
        setLoad(false);
      }
    }, 500),
    []
  ); // 500ms debounce time

  const handleInputChange = (event) => {
    const { value } = event.target;
    setKeyword(value);
    axiosSearch(value);
  };

  const handleItemClick = (item) => {
    const url = item.url;
    const format = url.split("/").filter(Boolean).pop();
    console.log(item)
    if (user) {
      router.push({
        pathname: "/ChordPage",
        query: { id: format },
      });
    } else {
      setOpenMuduls("Login");
      alert("แอ๊ะๆ Login ก๊อนนน");
    }
  };

  return (
    <div className={`w-full h-full rounded-lg ${data.length ? "grid grid-rows-[10%_90%] gap-2" : "flex items-center"}`}>
      <div className="rounded-lg p-2 py-2">
        <label className="flex">
          <input
            type="text"
            name="name"
            placeholder="Search..."
            value={keyword}
            className={`border w-full border-gray-300 px-4 py-2 rounded-l-md focus:outline-none ${load ? "border-2 border-yellow-400" : ""}`}
            onChange={handleInputChange}
          />
          <button
            className={`bg-yellow-400 z-0 hover:bg-yellow-200 hover:text-yellow-400 ${load ? "bg-yellow-200 text-yellow-400 drop-shadow-xl" : ""} cursor-pointer transition duration-500 ease-in-out transform hover:scale-105 font-bold px-4 py-2 rounded-r-md`}
            onClick={() => axiosSearch(keyword)}
          >
            Search
          </button>
        </label>
      </div>

      <div className="p-2 overflow-y-auto">
        {load ? (
          <h1>Loading...</h1>
        ) : data.length > 0 ? (
          <ul className="space-y-4 z-0 transition duration-500 ease-in-out transform scale-100">
            {data.map((item, index) => (
              <li
                key={index}
                className="hover:drop-shadow-lg z-0 bg-white transition duration-300 ease-in-out transform hover:scale-105 hover:border-4 hover:border-yellow-400 cursor-pointer mx-4 p-2 rounded-md"
                onClick={() => handleItemClick(item)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">ค้นหาเพลงสิ</p>
        )}
      </div>
    </div>
  );
}
