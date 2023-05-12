import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Amazon from "../components/card/Amazon";
import CardStar from "../components/card/CardStar";
import toast from "react-hot-toast";

function Products() {

  const getLocalCardData = () => {
    let localCardData = localStorage.getItem("productsElvin");
    if (localCardData === []) {
      return [];
    } else {
      return JSON.parse(localCardData);
    }
  };

  const [show, setShow] = useState(true);
  const [card, setCard] = useState(getLocalCardData());
  const handleClick = (item) => {
    toast.success("Səbətə əlavə edildi");
    if (card.indexOf(item) !== -1) return;
    setCard([...card, item]);
  };
  const handleChange = (item, d) => {
    const ind = card.indexOf(item);
    const arr = card;
    arr[ind].amount += d;
    if (arr[ind].amount === 0) arr[ind].amount = 1;
    setCard([...arr]);
  };

  useEffect(() => {
    localStorage.setItem("productsElvin", JSON.stringify(card));
  }, [card]);

  
  return (
    <div>
      <Navbar setShow={setShow} size={card.length} />
      {show ? (
        <Amazon handleClick={handleClick} />
      ) : (
        <CardStar card={card} setCard={setCard} handleChange={handleChange} />
      )}
    </div>
  );
}

export default Products;
