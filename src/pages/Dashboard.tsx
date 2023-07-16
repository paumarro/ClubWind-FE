import { useState } from 'react'
import { Carousel } from '../components/Carousel'
import { MemberBox } from '../components/MemberBox'
import useFetchData from '../hooks/fetchData'


const Dashboard: any = () => {
  const [count, setCount] = useState(0)

  const [loading, data] = useFetchData(
    'https://jsonplaceholder.typicode.com/todos/1'
  )


  return (
    <div className="overflow-hidden">
      <div className='grid'>
        <h1 className='text-2xl px-12 py-4 my-8  flex '>Hello, <strong className="font-semibold z-52 ml-2">Benjamin Blümchen!</strong > <p className='absolute right-12 text-base m-1'>Log Out</p></h1>
        
      </div>
      <h1 className='font-semibold text-2xl mx-12 my-10 '>Upcoming Events</h1>
        <div className="ml-12 mb-5 flex flex-row ">
          
          
          <Carousel show="8"/>


        </div>
      <h1 className='font-semibold text-2xl mx-12 mt-14 mb-10'>Members</h1>
        <div className="mx-12 flex ">
          <MemberBox />

        </div>

    </div>
    
  )
}

export default Dashboard
  