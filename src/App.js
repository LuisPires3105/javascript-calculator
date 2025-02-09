import './App.css';
import React from 'react';

const initialState = {
  total_input:'',
  current_input:'',
  display: '0',
};

const operatorsRegex = /[-+*/]/;

class Calculator extends React.Component{
  constructor(props){
    super(props);
    this.state = initialState;
    this.onClick = this.onClick.bind(this);
  }

  onClick(e){
    const newChar = e.target.value;

    if(newChar==="AC"){
      
      this.setState(()=>
        {return initialState})
    
    }else if(newChar==="="){
      
      if(this.state.total_input === '' || (this.state.total_input.match(operatorsRegex) && this.state.total_input.length === 1) || this.state.total_input.match("NaN")){
        
        this.setState(()=> {return {total_input:'NaN',
          current_input:'',
          display: 'NaN',}});

      }else{

        const formula = this.state.display.match(operatorsRegex) ? this.state.total_input.slice(0,-1) : this.state.total_input;
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
          this.setState(()=>{return {total_input: numbers_array[0],
            current_input: '=',
            display: numbers_array[0],
          }});
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
        this.setState((prevState)=>{return {total_input: prevState.total_input + newChar + result,
          current_input: newChar,
          display: result.toString(),
        }})
      }

    }else if(newChar==="*" || newChar==="+" || newChar === "-" || newChar==="/"){
      
      if(this.state.current_input === "="){
        this.setState((prevState)=>
          {return {total_input: prevState.display + newChar,
          current_input:'',
          display: newChar,
        }})
        return;
      }

      if(this.state.display.match(operatorsRegex)){
        
        if(newChar === '-' && this.state.display.length === 1){

          this.setState((prevState)=>
            {return {total_input: prevState.total_input + newChar,
            current_input:'',
            display: prevState.display+newChar,
          }})

        }else if(this.state.display.length === 2){
          
          this.setState((prevState)=>
            {return {total_input: prevState.total_input.slice(0,-2) + newChar,
            current_input:'',
            display: newChar,
          }})
        
        }else{
          
          this.setState((prevState)=>
            {return {total_input: prevState.total_input.slice(0,-1) + newChar,
            current_input:'',
            display: newChar,
          }})
        
        }

      }else{

        this.setState((prevState)=>
          {return {total_input: prevState.total_input + newChar,
          current_input:'',
          display: newChar,
          }})

      }

    }
    else{

      if((this.state.current_input === '' || this.state.current_input.match(operatorsRegex) || this.state.current_input === '=') && newChar === '.'){
        const editedInput = "0"+newChar;
        this.setState((prevState)=>
          {return {total_input: prevState.total_input + editedInput,
          current_input:'',
          display: editedInput,
        }})
        return;
      }
      
      if(this.state.current_input === "="){
        this.setState((prevState)=>
          {return {total_input: newChar,
          current_input:'',
          display: newChar,
        }})
        return;
      }

      this.setState((prevState)=>
        {const prevStateNumber = prevState.current_input;
          if((prevStateNumber.indexOf('.')>-1 && newChar ==='.') || (newChar === '0' && prevState.current_input==='')){
            return prevState;
          }else{
            return {total_input: prevState.total_input + newChar,
        current_input: prevState.current_input + newChar,
        display: prevState.current_input + newChar,
        }}})

    }
  }

  render(){
    return <div id="calculator">
        <div id="display" className="calculator-display">
          <p id="display">{this.state.total_input}</p>
          <p id="display">{this.state.display}</p>
        </div>
        <div id="buttons" className="calculator-buttons">
          
          <button className = "calculator-button ac" onClick={this.onClick} value="AC" id="clear">AC</button>

          <button className = "calculator-button divide operations" onClick={this.onClick} value="/" id="divide">/</button>
          <button className = "calculator-button multiply operations" onClick={this.onClick} value="*" id="multiply">x</button>

          <button className = "calculator-button seven" onClick={this.onClick} value="7" id="seven">7</button>
          <button className = "calculator-button eight" onClick={this.onClick} value="8" id="eight">8</button>
          <button className = "calculator-button nine" onClick={this.onClick} value="9" id="nine">9</button>
          <button className = "calculator-button subtract operations" onClick={this.onClick} value="-" id="subtract">-</button>
          
          <button className = "calculator-button four" onClick={this.onClick} value="4" id="four">4</button>
          <button className = "calculator-button five" onClick={this.onClick} value="5" id="five">5</button>
          <button className = "calculator-button six" onClick={this.onClick} value="6" id="six">6</button>
          <button className = "calculator-button add operations" onClick={this.onClick} value="+" id="add">+</button>
          
          <button className = "calculator-button one" onClick={this.onClick} value="1" id="one">1</button>
          <button className = "calculator-button two" onClick={this.onClick} value="2" id="two">2</button>
          <button className = "calculator-button three" onClick={this.onClick} value="3" id="three">3</button>

          <button className = "calculator-button equals" onClick={this.onClick} value="=" id="equals">=</button>
          
          <button className = "calculator-button decimal" onClick={this.onClick} value="." id="decimal">.</button>
          <button className = "calculator-button zero" onClick={this.onClick} value="0" id="zero">0</button>
        </div>
      </div>
    
  }
}

function App() {
  return (
    <div className="App">
      <Calculator />
    </div>
  );
}

export default App;
