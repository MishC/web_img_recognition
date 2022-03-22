import React from "react";

const Rank = ({ rank }) => {
  if (rank) {
    return (
      <div className="Rank white f3 mb5">
        {"Number of faces detected "}
        {rank}
      </div>
    );
  } else return null;
};
export default Rank;
