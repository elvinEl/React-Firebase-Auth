import React from 'react'
import toast from 'react-hot-toast'
import '../../styles/card.css'

export default function Card({item,handleClick}) {

  return (
    <div className='cards'>
        <div className='image_box'>
            <img src={item.img} alt="" />
        </div>
        <div className='details'>
            <p>{item.title}</p>
            <p>{item.author}</p>
            <p>{item.price}</p>
            <button onClick={()=>handleClick(item)}>Seçilmişlərə əlavə et</button>
        </div>

        </div>
  )
}
