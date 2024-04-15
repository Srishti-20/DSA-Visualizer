// BubbleSortVisualizer.js

import React, { useState, useEffect, useCallback } from 'react';
import './Bubble.css';
import BubbleSort from './BubbleSort';
import BubbleSortCodeBox from './BubbleSortCodeBox';

const BubbleSortVisualizer = () => {
  const [array, setArray] = useState([]);
  const [sorted, setSorted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState([]);
  const [speed, setSpeed] = useState('medium');
  const [stopSorting, setStopSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [pausedStep, setPausedStep] = useState(null);
  const [arrayLength, setArrayLength] = useState(10); // Default array length

  // Generate random array
  const generateArray = () => {
    const newArray = Array.from({ length: arrayLength }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
    setSorted(false);
    setCurrentStep(0);
  };

  // Perform bubble sort
  const bubbleSort = () => {
    const sortingSteps = BubbleSort(array);
    setSteps(sortingSteps);
    setSorted(true);
    setStopSorting(false);
    setIsPaused(false);
  };

  const stopSort = () => {
    setStopSorting(true);
    setIsPaused(false);
  };

  const pauseSort = () => {
    setIsPaused(true);
    setPausedStep(currentStep);
  };

  const resumeSort = () => {
    setIsPaused(false);
    setCurrentStep(pausedStep);
    setPausedStep(null);
  };

  // Get speed based on dropdown selection
  const getSpeed = useCallback(() => {
    switch (speed) {
      case 'slow':
        return 500;
      case 'medium':
        return 300;
      case 'fast':
        return 150;
      default:
        return 500;
    }
  }, [speed]);

  // Run sorting steps
  useEffect(() => {
    // Run sorting steps
    const playSound = (step, prevStep) => {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.type = 'sine';

      if (!stopSorting && sorted && currentStep < steps.length && !isPaused) {
        if (step.length === prevStep.length) {
          // If the array lengths are equal, check for element movement
          for (let i = 0; i < step.length; i++) {
            if (step[i] !== prevStep[i]) {
              // Play low-pitched sound if element is moving
              oscillator.frequency.value = 200;
              oscillator.start();
              setTimeout(() => {
                oscillator.stop();
              }, getSpeed());
              return;
            }
          }
        }
        // Play high-pitched sound if element reaches its position
        oscillator.frequency.value = 800;
        oscillator.start();
        setTimeout(() => {
          oscillator.stop();
        }, getSpeed());
      }
    };

    if (!stopSorting && sorted && currentStep < steps.length && !isPaused) {
      const step = steps[currentStep];
      const prevStep = currentStep > 0 ? steps[currentStep - 1] : [];
      const timeout = setTimeout(() => {
        setArray([...step]);
        playSound(step, prevStep);
        setCurrentStep(currentStep + 1);
      }, getSpeed());
      return () => clearTimeout(timeout);
    }
  }, [sorted, currentStep, steps, speed, getSpeed, stopSorting, isPaused]);

  // Function to determine color based on step
  const getItemColor = (value, currentIndex) => {
    if (currentStep >= steps.length || currentIndex >= steps[currentStep].length) {
      return 'green'; // Element has reached its correct position
    } else if (value === steps[currentStep][currentIndex]) {
      return 'red'; // Element is moving to its correct position
    } else {
      return ''; // Default color
    }
  };

  return (
    <div className="container">
      <div className="array-container">
        {array.map((value, idx) => (
          <div className="array-item" key={idx}>
            <div
              className="array-bar"
              style={{ height: `${value * 3}px`, backgroundColor: getItemColor(value, idx) }}
            ></div>
            <div className="array-value">{value}</div>
          </div>
        ))}
      </div>
  
      <div className="button-container">
        <button onClick={generateArray}>Generate New Array</button>
        <button onClick={bubbleSort}>Bubble Sort</button>
        <button onClick={stopSort}>Stop Sorting</button>
        {isPaused ? (
          <button onClick={resumeSort}>Resume Sorting</button>
        ) : (
          <button onClick={pauseSort}>Pause Sorting</button>
        )}
      </div>

      <div className="input-controls">
        {/* Array length input */}
        <div className="input-container">
          <label htmlFor="array-length">Array Length:</label>
          <input
            type="number"
            id="array-length"
            value={arrayLength}
            onChange={(e) => setArrayLength(parseInt(e.target.value))}
            min="1"
            max="100"
            className="input-field"
          />
        </div>
        {/* Speed dropdown */}
        <div className="speed-container">
          <label htmlFor="speed">Speed:</label>
          <select id="speed" onChange={(e) => setSpeed(e.target.value)} className="input-field">
            <option value="slow">Slow</option>
            <option value="medium">Medium</option>
            <option value="fast">Fast</option>
          </select>
        </div>
      </div>
      <div className='step-display'>
        <BubbleSortCodeBox currentStep={currentStep} />
      </div>
    </div>
  );
}  
export default BubbleSortVisualizer;