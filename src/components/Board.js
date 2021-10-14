import React from 'react'
import Square from './Square'

function Board(props) {
    return (
        <div className="board">
            <div className="board-info">
                <Square onClick={() => props.onClick(0)} value={props.values[0]} />
                <Square onClick={() => props.onClick(1)} value={props.values[1]} />
                <Square onClick={() => props.onClick(2)} value={props.values[2]} />      
            </div>
            <div className="board-info">
                <Square onClick={()=> props.onClick(3)} value={props.values[3]} />
                <Square onClick={()=> props.onClick(4)} value={props.values[4]} />
                <Square onClick={()=> props.onClick(5)} value={props.values[5]} />
            </div>
            <div className="board-info">
                <Square onClick={()=> props.onClick(6)} value={props.values[6]} />
                <Square onClick={()=> props.onClick(7)} value={props.values[7]} />
                <Square onClick={()=> props.onClick(8)} value={props.values[8]} />   
            </div>
        </div>
    )
}

export default Board
