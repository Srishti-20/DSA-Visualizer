// BubbleSortCodeBox.js

import React from 'react';

const BubbleSortCodeBox = ({ currentStep }) => {
  const bubbleSortCode = `function bubbleSort(arr) {
....for (var i = 0; i < arr.length; i++) {
........for (var j = 0; j < (arr.length - i - 1); j++) {
............if (arr[j] > arr[j + 1]) {
............var temp = arr[j];
............arr[j] = arr[j + 1];
............arr[j + 1] = temp;
............}
........}
....}
....return arr;
}`;

  const codeLines = bubbleSortCode.split('\n');

  return (
    <div className="step-display">
      {codeLines.map((line, index) => (
        <div key={index} className={`code-line ${index === currentStep ? 'highlighted' : ''}`}>
          {line}
        </div>
      ))}
    </div>
  );
};

export default BubbleSortCodeBox;
