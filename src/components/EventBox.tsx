import React from 'react'


const date = "Sunday, 14 March"

export const EventBox:any = ({title, date, description}) => {

  EventBox.defaultProps = {
    title: "Event Title",
    date: "Sunday, 14 March",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
  }

  
    return (
      <div className="drop-shadow w-80 h-350 rounded-xl bg-white flex flex-col justify-center border-none hover:drop-shadow-sm hover:scale-95 duration-100 ease-in-out">
        
        <img className="fixed top-0 w-lg rounded-t-xl " src="https://picsum.photos/id/11/400/200" alt={title} />
            <div className="mt-32 mx-7">
                <h2 className=" text-lg font-medium">{title}</h2>
                <p className="text-sm text-[#468FE5]">{date}</p>
                <p className=" my-6 text-sm text-gray-700">{description}</p>
            </div>

            <div id="attandance">
                
            </div>

      </div>
    )
};

