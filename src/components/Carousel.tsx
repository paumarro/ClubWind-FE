import { useState } from "react";
import { AddEvent } from "./AddEvent";
import { EventBox } from "./EventBox";
import { events }  from '../testData'
import { CarouselController } from "./CarouselController";

export const Carousel = (props) => {

  const {show} = props
  
  const [currentIndex, setIndex] = useState(0);

  const handleNext = () => {
    const isLastEvent = currentIndex + 4 >= events.length;
    const newIndex = isLastEvent ? currentIndex : currentIndex + 4;
    setIndex(newIndex);
  };
  const handlePrevious = () => {
    const isFirstEvent = currentIndex === 0;
    const newIndex = isFirstEvent ? currentIndex : currentIndex - 4;
    setIndex(newIndex);
  };
  const handleStart = () => {
    setIndex(0);
  };


  return (
    <>
      <div className="w-full flex-col mb-10">
        
      <CarouselController handleStart={handleStart} handleNext={handleNext} handlePrevious={handlePrevious} />

        <div className="relative w-full flex">
          <div className="w-1/5 h-full">
            <div id="eventsCarousel" className="snap-normal flex relative">
              <div className=" transition-all translate-x flex gap-6 ease-in-out duration-500"
                    style={{ transform: `translateX(-${currentIndex * (100 / show)}%)` }}>
                      <AddEvent />  
              {events.map((event, index) => (
                      
                      <EventBox title={event.title} date={event.date} description={event.description} img={event.img} />
                
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </>  
  );
};
