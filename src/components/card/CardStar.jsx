import React, { useState, useEffect } from "react";
import "../../styles/card.css";
import toast from 'react-hot-toast'

const CardStar = ({ card, setCard, handleChange }) => {
  const [price, setPrice] = useState([]);

  const handleRemove = (id) => {

    const arr = card.filter((item) => item.id !== id);
    setCard(arr);
    handlePrice();
    toast.success("Məhsul səbətdən silindi")

  };

  const handlePrice = () => {
    let ans = 0;
    card.map((item) => (ans += item.amount * item.price));
    setPrice(ans);
  };

  useEffect(() => {
    handlePrice();
  });

  return (
   <article>
    {card.map((item)=>(
        <div className='cart_box' key={item.id}>
            <div className='cart_img'>
                <img src={item.img} alt="" />
                <p>{item.title}</p>
            </div>
            <div>
                <button onClick={()=> handleChange(item,1)}>+</button>
                <button>{item.amount}</button>
                <button onClick={()=> handleChange(item,-1)}>-</button>
            </div>
            <div>
                <span>{item.price} Azn</span>
                <button onClick={()=> handleRemove(item.id)}>Sil</button>
            </div>
        </div>
    ))}
    <div className='total'>
        <span>Ümumi Dəyər</span>
        <span>{price}-AZN</span>
    </div>
   </article>
  )
}

export default CardStar;