import React from "react";
import list from "../../data/Data";
import Cards from "./Card";
import "../../styles/amazon.css";

export default function Amazon({handleClick}) {
  return (
    <>
      <section>
        {list.map((item) => (
          <Cards key={item.id} item={item} handleClick={handleClick}/>
        ))}
      </section>
    </>
  );
}
