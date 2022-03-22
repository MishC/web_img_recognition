import React from "react";
import Rank from "../Rank/Rank";

import "./FaceDetection.css";

const FaceDetection = ({ imageUrl, dataBox, image }) => {
  if (dataBox) {
    console.log(dataBox.length);

    return (
      <div className="FaceDetection center ma mv5">
        <div className="mb5">
          <Rank rank={dataBox.length} />
        </div>
        <div className="absolute mv5">
          <img
            id="inputimage"
            src={imageUrl}
            alt=""
            width="500px"
            height="auto"
            refs="inputImg"
          />
          {dataBox.map((item, index) => {
            console.log(image.width);
            if (image.width) {
              return (
                <div
                  key={index}
                  className="bounding-box"
                  style={{
                    left: item.region_info.bounding_box.left_col * image.width,
                    right:
                      image.width -
                      item.region_info.bounding_box.right_col * image.width,
                    top: item.region_info.bounding_box.top_row * image.height,
                    bottom:
                      image.height -
                      item.region_info.bounding_box.bottom_row * image.height,
                  }}
                ></div>
              );
            } else return null;
          })}
        </div>
        <br />
      </div>
    );
  } else {
    return null;
  }
};

export default FaceDetection;
