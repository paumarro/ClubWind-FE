import { useState } from "react";
import { AddEvent } from "./AddEvent";
import { EventBox } from "./EventBox";
import { events }  from '../testData'

export const UberCarousel = (props) => {

  const {show} = props
  
  const [currentIndex, setIndex] = useState(0);

  const handleNext = () => {
    const isLastEvent = currentIndex === events.length - 3;
    const newIndex = isLastEvent ? currentIndex : currentIndex + 1;
    setIndex(newIndex);
  };
  const handlePrevious = () => {
    const isFirstEvent = currentIndex === 0;
    const newIndex = isFirstEvent ? currentIndex : currentIndex - 1;
    setIndex(newIndex);
  };
  const handleStart = () => {
    setIndex(0);
  };


  return (
    <>
      <div className="w-full flex-col">
        <div className="relative w-full flex">
          <div className="w-1/5 h-full">
            <div id="eventsCarousel" className="snap-normal flex relative">
              <div className=" transition-all translate-x flex gap-6 ease-in-out duration-500"
                    style={{ transform: `translateX(-${currentIndex * (100 / show)}%)` }}>
                      <AddEvent />  
              {events.map((event, index) => (
                      
                      <EventBox title={event.title} date={event.date} description={event.description} />
                
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>



      <div className="absolute right-12 top-60 flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="gray"
          className=" w-12 h-12 px-3 mr-1  hover:fill-gray-700 "
        >
          <path d="M18.75 12.75h1.5a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5zM12 6a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 6zM12 18a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 18zM3.75 6.75h1.5a.75.75 0 100-1.5h-1.5a.75.75 0 000 1.5zM5.25 18.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 010 1.5zM3 12a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 013 12zM9 3.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM12.75 12a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0zM9 15.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
        </svg>

        <button className="mx-2" onClick={handleStart}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-10 h-10 bg-white rounded-full drop-shadow px-3 hover:bg-gray-100"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>

        <button className="mx-2" onClick={handlePrevious}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-10 h-10 bg-white rounded-full drop-shadow px-3 hover:bg-gray-100"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <button className="mx-2" onClick={handleNext}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-10 h-10 bg-white rounded-full drop-shadow px-3 hover:bg-gray-100"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </>
  );
};
