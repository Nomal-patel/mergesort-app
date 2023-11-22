import React from "react";
import {getMergeSortAnimations} from '../sortingAlgorithm/sortingAlgorithm.js';
import './MergesortlVisualizer.css';

const ANIMATION_SPEED_MS = 25;


// This is the main color of the array bars.
const PRIMARY_COLOR = '#E8C547';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = '#78290F';

export default class mergesortingAlgorithm extends React.Component{
    constructor(props){
        super(props);

        this.state={
            array:[],
        };
    }

    componentDidMount(){
        this.resetArray();
    }

    resetArray(){
        const array =[];

        for( let i=0; i<60; i++){
            array.push(randomIntFromInterval(5,600));
        }
        this.setState({array});
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('array-bar');
          const isColorChange = i % 3 !== 2;
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
          } else {
            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS);
          }
        }
      }
    

    render(){

        const {array} =this.state; 

        return(

            <div className="container">
                <div className="array-container">
                    {array.map((value,idx)=>(
                        <div className="array-bar" 
                        key={idx}
                        style={{height:`${value}px` }}
                        ></div>
                    ))}
                </div>
                    <div className="buttons">
                        <button onClick={() => this.resetArray()}>Generate New Array</button>
                        <button onClick={() => this.mergeSort()}>Merge Sort</button>

                    </div>
            </div>
        );
    }

    
        
    
}

function randomIntFromInterval(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}