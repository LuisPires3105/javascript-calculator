import './App.css';
import { useState } from 'react';

const operatorsRegex = /[-+*/]/;

function App() {
  const [totalInput, setTotalInput] = useState('');
  const [currentInput, setCurrentInput] = useState('');
  const [display, setDisplay] = useState('0');

  function onClick(event){
    const newChar = event.target.value;
    if(newChar==="AC"){
      
      setTotalInput('');
      setCurrentInput('');
      setDisplay('0');
    
    }else if(newChar==="="){
      
      if(totalInput === '' || (totalInput.match(operatorsRegex) && totalInput.length === 1) || totalInput.match("NaN")){
        
        setTotalInput('NaN');
        setCurrentInput('');
        setDisplay('NaN');

      }else{

        const formula = display.match(operatorsRegex) ? totalInput.slice(0,-1) : totalInput;
        const simplified_formula = formula.replaceAll("--","+").replaceAll("+-","-").replaceAll("*-","*(-)").replaceAll("/-","/(-)")
        
        const numbers_array = simplified_formula.split(operatorsRegex).filter(value => value !== "(").map(value=>{
          if(value[0]===')'){
            return "-"+value.slice(1);
          }else{
            return value;
          }
        });
        
        const operators_array = simplified_formula.split(/[0-9]+/).filter(value=>value!==".").map(value => value.length > 1 ? value[0]:value);
        
        let result = 0.0;

        if(numbers_array.length === 1 && 2 === operators_array.length){
          setTotalInput(numbers_array[0]);
          setCurrentInput('=');
          setDisplay(numbers_array[0]);
          return;
          
        } else if(numbers_array.length === operators_array.length){

          numbers_array.shift();

        } else{
          
          operators_array.shift();
          result = parseFloat(numbers_array.shift());
          
        }

        let iter = 0;

        numbers_array.forEach(number => {
          switch(operators_array[iter]){
              case '*':
                result = result * parseFloat(number);
                break;
              case '+':
                result = result + parseFloat(number);
                break;
              case '/':
                result = result / parseFloat(number);
                break;
              case '-':
                result = result - parseFloat(number);
                break;
              default:
                break;
          }
          iter+=1;
        });
        
        setTotalInput(totalInput + newChar + result);
        setCurrentInput('=');
        setDisplay(result.toString());
        
      }

    }else if(newChar==="*" || newChar==="+" || newChar === "-" || newChar==="/"){
      
      if(currentInput === "="){

        setTotalInput(display + newChar);
        setCurrentInput('');
        setDisplay(newChar);
        return;
      
      }

      if(display.match(operatorsRegex)){
        
        if(newChar === '-' && display.length === 1){

          setTotalInput(totalInput + newChar);
          setCurrentInput('');
          setDisplay(display+newChar);

        }else if(display.length === 2){
          
          setTotalInput(totalInput.slice(0,-2) + newChar);
          setCurrentInput('');
          setDisplay(newChar);
        
        }else{
          
          setTotalInput(totalInput.slice(0,-1) + newChar);
          setCurrentInput('');
          setDisplay(newChar);
        
        }

      }else{

        setTotalInput(totalInput + newChar);
        setCurrentInput('');
        setDisplay(newChar);

      }

    }
    else{

      if((currentInput === '' || currentInput.match(operatorsRegex) || currentInput === '=') && newChar === '.'){
        
        const editedInput = "0"+newChar;
        setTotalInput(totalInput + editedInput);
        setCurrentInput('');
        setDisplay(editedInput);
        return;

      }
      
      if(currentInput === "="){

        setTotalInput(newChar);
        setCurrentInput('');
        setDisplay(newChar);
        return;

      }

      if((currentInput.indexOf('.')>-1 && newChar ==='.') || (newChar === '0' && currentInput==='')){
        return;
      }

      setTotalInput(totalInput + newChar);
      setCurrentInput(currentInput + newChar);
      setDisplay(currentInput + newChar);

    }
  }

  return (
    <div className="App">
      <div id="calculator">
        <div id="display-div" className="calculator-display">
          <p id="display-input">{totalInput}</p>
          <p id="display">{display}</p>
        </div>
        <div id="buttons" className="calculator-buttons">
          
          <button className = "calculator-button ac" onClick={onClick} value="AC" id="clear">AC</button>

          <button className = "calculator-button divide operations" onClick={onClick} value="/" id="divide">/</button>
          <button className = "calculator-button multiply operations" onClick={onClick} value="*" id="multiply">x</button>

          <button className = "calculator-button seven" onClick={onClick} value="7" id="seven">7</button>
          <button className = "calculator-button eight" onClick={onClick} value="8" id="eight">8</button>
          <button className = "calculator-button nine" onClick={onClick} value="9" id="nine">9</button>
          <button className = "calculator-button subtract operations" onClick={onClick} value="-" id="subtract">-</button>
          
          <button className = "calculator-button four" onClick={onClick} value="4" id="four">4</button>
          <button className = "calculator-button five" onClick={onClick} value="5" id="five">5</button>
          <button className = "calculator-button six" onClick={onClick} value="6" id="six">6</button>
          <button className = "calculator-button add operations" onClick={onClick} value="+" id="add">+</button>
          
          <button className = "calculator-button one" onClick={onClick} value="1" id="one">1</button>
          <button className = "calculator-button two" onClick={onClick} value="2" id="two">2</button>
          <button className = "calculator-button three" onClick={onClick} value="3" id="three">3</button>

          <button className = "calculator-button equals" onClick={onClick} value="=" id="equals">=</button>
          
          <button className = "calculator-button decimal" onClick={onClick} value="." id="decimal">.</button>
          <button className = "calculator-button zero" onClick={onClick} value="0" id="zero">0</button>
        </div>
      </div>
    </div>
  );
}

export default App;
