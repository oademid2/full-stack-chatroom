
import React from 'react';
function CustomButton(props) {
  
    let customStyle={
        fontSize: "18px",
        backgroundColor: "rgb(0, 174, 255)",
        color: "white",
        borderRadius: "12px",
        border: "none",
        padding: "10px 20px"
    }
  
    customStyle =  {...customStyle, ...props.style}
    return (
        <button style={customStyle} onClick={props.onClick}>
                {props.text}
        </button>
  
    );
  }
  
  export default CustomButton;
  