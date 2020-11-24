import React from 'react';

function ImagePopup () {
    return (
        <div id="popup-image" className="popup">
        <div className="popup__container">
          <img src="" className="popup__card-image" alt="card" />
          <img
            src="<%=require('./images/close.svg')%>"
            alt=""
            className="popup__close"
            id="popup-image-close"
          />
        </div>
      </div>
    )
}

export default ImagePopup;