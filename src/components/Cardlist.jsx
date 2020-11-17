import React from "react";
import Cards from "./Cards";

const CardList = ({ users }) => {
  return (
    <div>
      {users.map((user, i) => {
        return (
          <Cards
            key={i}
            id={users[i].id}
            name={users[i].name}
            email={users[i].email}
          />
        );
      })}
    </div>
  );
};

export default CardList;
