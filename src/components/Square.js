import React from 'react'

function Square(props) {
    return (
        <div className="square">
           <button className={props.value?"btn disabled":"btn"} onClick={props.onClick}>
             
               {props.value}
            </button> 
        </div>
    )
}

export default Square
