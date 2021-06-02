import React from "react";

const CardItem = ({ item }) => {
  return (
    <div className="card-item">
      <h4>{item.title}</h4>
      <p>{item.body}</p>
    </div>
  );
};

export default CardItem;
