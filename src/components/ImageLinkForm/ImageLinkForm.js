import React from "react";
import "./ImageLinkForm.css";
const ImageLinkForm = ({ onInputChange, onButtonSubmit, name, entries }) => {
  const nameUpper = name
    .split()
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="ImageLinkForm mt5">
      <div className="mv1  white f3 ">
        {`${nameUpper}, your current entry count is ${entries}. `}
        <br />
      </div>

      <p className="f4 black">
        This magic brain will detect faces in your picture. Give it a try!
      </p>
      <div className="center f4 pa2 ">
        <div className=" form pa4 br3 shadow-5 center ">
          <input
            type="tex"
            placeholder="URL of the image"
            className="w-60"
            onChange={onInputChange}
          />
          <button
            onClick={onButtonSubmit}
            className="w-20 gnov f4 link ph3 pv2 dib white bg-light-purple"
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
