import React from 'react'


const date = "Sunday, 14 March"

export const EventBox:any = ({title, date, description, img}) => {

  EventBox.defaultProps = {
    title: "Event Title",
    date: "Sunday, 14 March",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    img: "https://picsum.photos/id/1068/400/200"
  }

  
    return (
      <div className=" w-80 h-350 rounded-xl bg-white flex flex-col border-none hover:drop-shadow-md hover:scale-105 duration-500 ease-out">
        
        <div className="mt-8 mx-7 mb-auto">
            <h1 className=" text-xl font-medium">{title}</h1>
            <p className="text-sm text-[#468FE5]">{date}</p>
            <p className=" my-6 text-sm text-gray-700">{description}</p>
        </div>

        <div className="" id="attandance">
            
        <img className="w-lg rounded-b-xl bg-fixed" src={img} alt={title} />
        </div>
      </div>
    )
};

