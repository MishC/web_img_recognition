import React from "react";
import "./ImageLinkForm.css";
const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div className="ImageLinkForm mt5">
      <p className="f5">
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
