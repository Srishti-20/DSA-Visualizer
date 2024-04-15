// BubbleSort.js
const BubbleSort = (arr) => {
    const steps = [];
    const n = arr.length;
    let tempArr = [...arr];
    let swapped;
  
    do {
      swapped = false;
      for (let i = 0; i < n - 1; i++) {
        if (tempArr[i] > tempArr[i + 1]) {
          [tempArr[i], tempArr[i + 1]] = [tempArr[i + 1], tempArr[i]];
          steps.push([...tempArr]);
          swapped = true;
        }
      }
    } while (swapped);
    steps.push([...tempArr]);
  
    return steps;
  };
  
  export default BubbleSort;
  