import { useEffect, useRef, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [Userdata, setUserdata] = useState([])
  const [index, setindex] = useState(3)
  const topRef = useRef(null)

  const getdata = async () => {
    const data = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=15`)
    setUserdata(data.data)
  }
  useEffect(() => {
    getdata()
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  },[index])
  

  let printUserData = <h1 className='text-gray-50'>NO DATA AVAILABLE</h1>

  if (Userdata.length > 0) {
    printUserData = Userdata.map((elem, idx) => {
      return (
        <a href={elem.url} target="_blank" rel="noreferrer" key={idx}>
          <div className='w-full overflow-hidden rounded-xl bg-zinc-900'>
            <img
              className='block aspect-[3/3] w-full object-cover'
              src={elem.download_url}
              alt={`Photo by ${elem.author}`}
              loading='lazy'
            />
            <h2 className='truncate px-3 py-2'>{elem.author}</h2>
          </div>
        </a>
      )
    })
  }

  return (
    <div ref={topRef} className='bg-black h-auto p-4 '>
      <div className='grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6 bg-black text-white font-bold'>
        {printUserData}
      </div>
      <div className='flex justify-center gap-6 items-center p-4 mt-4'>
        <button
          disabled={index === 1}
          onClick={() => setindex(index - 1)}
          className='rounded bg-amber-500 px-4 py-2 font-semibold text-black cursor-pointer active:scale-90 disabled:cursor-not-allowed disabled:opacity-50'
        >
          Prev
        </button>
        <h2 className='text-white font-bold text-xl'>Page {index}</h2>
        <button  onClick={()=>{
          setindex(index+1)
        }} className='bg-amber-500 text-black cursor-pointer active:scale-95 rounded px-4 py-2 font-semibold'>Next</button>
      </div>
    </div>
  )
}

export default App
