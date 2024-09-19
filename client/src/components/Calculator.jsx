import React, { useState } from 'react';
import Display from './Display';
import ButtonPanel from './Buttonpanel';

function Calculator() {
  const [displayValue, setDisplayValue] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  // Handle the button clicks
  const handleButtonClick = (name) => {
    if (!isNaN(name) || name === '.') {
      handleNumberInput(name);
    } else if (['+', '-', '*', '/'].includes(name)) {
      handleOperatorInput(name);
    } else if (name === '=') {
      handleEquals();
    } else if (name === 'C') {
      clearDisplay();
    }
  };

  // Handle number input
  function handleNumberInput(name) {
    if (waitingForSecondOperand) {
      setDisplayValue(name);
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(prev => prev === '0' ? name : prev + name);
    }
  }

  // Handle operator input
  function handleOperatorInput(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (operator && waitingForSecondOperand) {
      setOperator(nextOperator);
      return;
    }

    if (firstOperand == null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, operator, inputValue);
      setDisplayValue(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  }

  // Handle equals ('=') button
  function handleEquals() {
    const inputValue = parseFloat(displayValue);

    if (operator && !waitingForSecondOperand) {
      const result = calculate(firstOperand, operator, inputValue);
      setDisplayValue(String(result));
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecondOperand(false);
    }
  }

  // Perform the calculation
  function calculate(first, operator, second) {
    switch (operator) {
      case '+':
        return first + second;
      case '-':
        return first - second;
      case '*':
        return first * second;
      case '/':
        return second !== 0 ? first / second : 'Error';
      default:
        return second;
    }
  }

  // Clear the display and reset the state
  function clearDisplay() {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  }

  return (
    <div className="calculator">
      <Display value={displayValue} />
      <ButtonPanel onButtonClick={handleButtonClick} />
    </div>
  );
}

export default Calculator;
