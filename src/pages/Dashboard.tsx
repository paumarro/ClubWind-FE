import { useState } from 'react'
import { EventSection } from '../components/EventSection'
import { MemberSection } from '../components/MemberSection'
import useFetchData from '../hooks/fetchData'


const Dashboard: any = () => {
  const [count, setCount] = useState(0)

  const [loading, data] = useFetchData(
    'https://jsonplaceholder.typicode.com/todos/1'
  )


  return (
    <div className="overflow-hidden h-screen">
      <h1 className='text-xl text-[#00000080] mx-12 mb-[-38px] mt-10 '>Events</h1>
        <section className="ml-12 mb-5 flex flex-row ">
          
          <EventSection show="8"/>

        </section>
        <h1 className='text-xl text-[#00000080] mx-12 mt-[38px] mb-[-34px]'>Members</h1>
        <section className="mx-12 grid">
          
          <MemberSection />

        </section>

    </div>
    
  )
}

export default Dashboard
  