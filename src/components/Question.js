import React, { useState, useEffect, Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
//import axios from 'axios';

function Question () {

  
  
    const[ref, setRef] = useState(React.useRef(new Array()));
    const[ref2, setRef2] = useState(React.useRef(new Array()));
    const [data, setData] = useState([])
  
    useEffect(async () => {
  
      const response = await fetch('https://opentdb.com/api.php?amount=10');
  
      const _data = await response.json();
      
      const newAnswers = _data.results.map((category) => {
  
        const incorrectAnswersIndexes = category.incorrect_answers.length;
        const randomIndex = Math.round(
          Math.random() * (incorrectAnswersIndexes - 0) + 0
        );
  
        category.incorrect_answers.splice(randomIndex, 0, category.correct_answer);
        
        return {
          ...category,
          answers: category.incorrect_answers,
        };
      });

      
      setData(_data.results);
  
    },[]);
    
    const checkAnswer = (correct, given,i, j) => {
      //console.log(correct.correct_answer);
      
      
      var temp = ref.current[i].length;
       
        for(var j = 0 ; j < temp ; j++){
          ref.current[i][j].setAttribute("disabled",true);
        }
        if(correct.correct_answer === given){
          ref2.current[i].style.color = "green";
        }
        else{
          ref2.current[i].style.color = "red";
        }
        
    }
    
//onClick={this.checkAnswer(post.answer,text)}

    return (

       <div>
      <ul>
      {data.map((post,itemKey) => (
        <li key={post.id} align="start">
            <div>
                <p ref={node => {ref2.current[itemKey] = node;ref.current[itemKey] = new Array();}} >{post.question}</p>
                {post.incorrect_answers.map((text, index) =>(
                  <button ref={node => { ref.current[itemKey].push(node)}} id={post.id} onClick={() => checkAnswer(post,text,itemKey,index)} disabled={false}>{text}</button>
                ))}
                
                
               
            </div>
        </li>
    ))
      }
      </ul>
      </div>

    );
  }
  
export default Question;
