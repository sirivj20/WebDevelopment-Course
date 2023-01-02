import React from "react";

const Rank = ({ name, entries }) => {
 // console.log({name},{entries})
  return (
    <div>
      <div className="white f3">{`${name}, your current rank is...`}</div>
      <div className="f2 white">{entries}</div>
    </div>
  );
};

export default Rank;
