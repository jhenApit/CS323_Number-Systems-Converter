import React, { useState } from 'react';
import './index.scss';

const baseDictionary = {
  Binary: {
    label: 'Binary',
    regexPattern: /^[01]+$/,
  },
  Decimal: {
    label: 'Decimal',
    regexPattern: /^\d+$/,
  },
  Hexadecimal: {
    label: 'Hexadecimal',
    regexPattern: /^[0-9A-Fa-f]+$/,
  },
  Octal: {
    label: 'Octal',
    regexPattern: /^[0-7]+$/,
  },
};

function FormConverter() {
  const [inputValue, setInputValue] = useState('');
  const [fromBase, setFromBase] = useState(baseDictionary['Binary'].label);
  const [toBase, setToBase] = useState(baseDictionary['Binary'].label);
  const [convertedValue, setConvertedValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const isInputEmpty = (input) => {
    // Check if input is empty
    if (input === '') {
      setErrorMessage('Input cannot be empty');
      setConvertedValue('');
      return false;
    }
    return true;
  };  
  
  const isInputValid = (input, base) => {
    // Check if input is valid
    const regexPattern = baseDictionary[base]?.regexPattern;
    return regexPattern && regexPattern.test(input);
  };

  const convertBase = () => {
    // Validation
    if (!isInputEmpty(inputValue)) return;

    if (!isInputValid(inputValue, fromBase)) {
      setErrorMessage('Invalid input. Please try again.');
      setConvertedValue('');
      return;
    }
      
    // Conversion
    let parsedValue;
    switch (fromBase) {
      case 'Binary':
        parsedValue = parseInt(inputValue, 2);
        break;
      case 'Decimal':
        parsedValue = parseInt(inputValue, 10);
        break;
      case 'Hexadecimal':
        parsedValue = parseInt(inputValue, 16);
        break;
      case 'Octal':
        parsedValue = parseInt(inputValue, 8);
        break;
      default:
        return false;
    }

    // Output
    setErrorMessage('');
    switch (toBase) {
      case 'Binary':
        setConvertedValue(parsedValue.toString(2));
        break;
      case 'Decimal':
        setConvertedValue(parsedValue.toString(10));
        break;
      case 'Hexadecimal':
        setConvertedValue(parsedValue.toString(16));
        break;
      case 'Octal':
        setConvertedValue(parsedValue.toString(8));
        break;
      default:
        return false;
    }
  };

  const renderBaseDropdown = (value, onChange) => (
    <select
      className="form-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {Object.keys(baseDictionary).map((base) => (
        <option key={base} value={base}>
          {baseDictionary[base].label}
        </option>
      ))}
    </select>
  );

  const resetForm = () => {
    setInputValue('');
    setConvertedValue('');
    setErrorMessage('');
    setFromBase(baseDictionary['Binary'].label);
    setToBase(baseDictionary['Binary'].label);
  };

  return (
    <div className='converter-container gap-2 p-5'>
      <div className="form-converter">
        <div className="input">
          <label className='fw-bold fs-4'>Enter a Number:</label>
          <input
            id="numberInput"
            type="text"
            className="form-control"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{
              borderColor: errorMessage ? 'red' : ''
            }}
          />
        </div>

        <fieldset className='my-3'>
          <label className='fw-semibold fs-5'>From Base:</label>
          {renderBaseDropdown(fromBase, setFromBase)}
        </fieldset>

        <fieldset className='my-3'>
          <label className='fw-semibold fs-5'>To Base:</label>
          {renderBaseDropdown(toBase, setToBase)}
        </fieldset>

        <fieldset className="row my-3">
          <div className="col-md-6">
            <button
              type="button"
              className="btn btn-primary action-btn"
              onClick={convertBase}
            >
              Convert
            </button>
          </div>
          <div className="col-md-6">
            <button
              type="button"
              className="btn btn-info action-btn"
              onClick={resetForm}
            >
              Reset
            </button>
          </div>
        </fieldset>

      </div>
      <div className="converted-result">
        <label className='fw-bold fs-4'>Result:</label>
        <input
          id="numberOutput"
          type="text"
          className="form-control"
          value={convertedValue || errorMessage}
          readOnly
          style={{
            borderColor: errorMessage ? 'red' : ''
          }}
        />
      </div>
    </div>
  );
}

export default FormConverter;