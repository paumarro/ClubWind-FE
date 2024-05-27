import { useState } from "react";
import { AddEvent } from "./AddEvent";
import { EventBox } from "./EventBox";
import { events }  from '../testData'
import { CarouselController } from "./CarouselController";

export const EventSection = (props) => {

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

        <div className="w-full flex">         
              <div id="eventsCarousel" className="transition-all translate-x flex gap-6 ease-in-out duration-500"
                    style={currentIndex !==0?{ transform: `translateX(-${currentIndex * (100 / show)}%)`}:{}}>
                <AddEvent /> 
                {events.map((event, index) => (
                      
                  <EventBox title={event.title} date={event.date} description={event.description} img={event.img} />
                
                ))}
              </div>
        </div>
      </div>

      
    </>  
  );
};
