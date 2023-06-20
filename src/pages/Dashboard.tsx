import { useEffect, useState } from 'react'
import { AddEvent } from '../components/AddEvent'
import { UberCarousel } from '../components/Carousel'
import { Carousel } from '../components/Carousel2'
import { EventBox } from '../components/EventBox'
import { MemberBox } from '../components/MemberBox'
import useFetchData from '../hooks/fetchData'


const Dashboard: any = () => {
  const [count, setCount] = useState(0)

  const [loading, data] = useFetchData(
    'https://jsonplaceholder.typicode.com/todos/1'
  )


  return (
    <div className="overflow-hidden">
      <h1 className='text-3xl px-12 py-12 '>Hello, <strong className="font-semibold z-52">Benjamin Blümchen!</strong ></h1>
      <h1 className='font-semibold text-2xl mx-12 my-10 '>Upcoming Events</h1>
        <div className="ml-12 mb-5 flex flex-row ">
          
          
          <UberCarousel show="8"/>


        </div>
      <h1 className='font-semibold text-2xl mx-12 mt-14 mb-10'>Members</h1>
        <div className="mx-12 flex ">
          <MemberBox />

        </div>

    </div>
    
  )
}

export default Dashboard
  