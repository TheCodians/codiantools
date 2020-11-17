import React from "react";

const Cards = ({name,email,id}) => {
  return(
      <div className='tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5'>
          <img alt='logo' src={`logo192.png`}/>
          <div>
              <h4>{name}</h4>
              <p>{email}</p>
          </div>
      </div>
  )
}

export default Cards;
