import React from "react";
import Rank from "../Rank/Rank";

import "./FaceDetection.css";

const FaceDetection = ({ imageUrl, dataBox, image, name, entries }) => {
  if (dataBox) {
    console.log(dataBox.length);
    console.log(name);

    return (
      <div className="FaceDetection center mv5">
        <div className="mv1  white f3 ">
          {`${name}, your current entry count is ${entries}. `}
          <br />
        </div>
        <div className="mv1">
          <Rank rank={dataBox.length} />
        </div>
        <div className="absolute mv5 ">
          <img
            id="inputimage"
            src={imageUrl}
            alt=""
            width="500px"
            height="auto"
            refs="inputImg"
            className="mb6 center"
          />
          {dataBox.map((item, index) => {
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
                      item.region_info.bounding_box.bottom_row *
                        image.height *
                        0.5,
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
