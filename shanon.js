
function display(e)
{ 
  e.preventDefault();
// Define a function to recursively perform the Shannon-Fano encoding
function shannonFano(input) {
    // Base case: if the input is a single character, return it with a code of 0
    if (input.length === 1) {
      return [{char: input, code: '0'}];
    }
    
    // Calculate the frequency of each character in the input
    const freq = {};
    for (let i = 0; i < input.length; i++) {
      const char = input[i];
      freq[char] = (freq[char] || 0) + 1;
    }
   
   
    // Convert the frequency object into an array of {char, freq} objects
    const freqArray = Object.keys(freq).map(char => ({char, freq: freq[char]}));
    
    // Sort the frequency array in descending order by frequency
    freqArray.sort((a, b) => b.freq - a.freq);
    
    // Calculate the cumulative frequency of the array
    let cumulativeFreq = 0;
    for (let i = 0; i < freqArray.length; i++) {
      cumulativeFreq += freqArray[i].freq;
      freqArray[i].cumulativeFreq = cumulativeFreq;
    }
    
    // Divide the frequency array into two halves based on the cumulative frequency
    const midpoint = cumulativeFreq / 2;
    let leftSum = 0;
    let i;
    for (i = 0; i < freqArray.length; i++) {
      leftSum += freqArray[i].freq;
      if (leftSum >= midpoint) {
        break;
      }
    }
    const leftArray = freqArray.slice(0, i+1);
    const rightArray = freqArray.slice(i+1);
    
    // Recursively encode the left and right halves of the input
    const leftEncoding = shannonFano(leftArray.map(item => item.char).join(''));
    const rightEncoding = shannonFano(rightArray.map(item => item.char).join(''));
    
    // Prepend '0' to the left half's codes and '1' to the right half's codes
    leftEncoding.forEach(item => item.code = '0' + item.code);
    rightEncoding.forEach(item => item.code = '1' + item.code);
    
    // Combine the encodings for the left and right halves and return the result
    return leftEncoding.concat(rightEncoding);
  }
  
  function getFrequency(string) {
    var freq = {};
    for (var i=0; i<string.length;i++) {
        var character = string.charAt(i);
        if (freq[character]) {
           freq[character]++;
        } else {
           freq[character] = 1;
        }
    }

    return freq;
}
 

   
    let input = document.getElementById("string1").value;
    const encoding=shannonFano(input);
    // console.log(encoding);
    let output = document.getElementById("string2");
    for (let i = 0; i < encoding.length; i++) {
        output.innerHTML+=(encoding[i].char + " - " + encoding[i].code+"\n");
    } 
    
    //frequency
   
    let freq = getFrequency(input);
    // console.log(freq);
    let output1 = document.getElementById("string3");

    for (let i in freq) {
        output1.innerHTML+=(i + " - " + freq[i]+"\n");

    
    }


    //space calculation
     let spaced=(input.length)*8;
      let s=0;
    for(let i=0;i<encoding.length;i++)
    {   
        s+=encoding[i].code.length*freq[encoding[i].char];
    }
      let ans=spaced-s;
     let space=document.getElementById("string4");
      space.innerHTML+="space before: " + spaced + "\n" + "space after" + s + "\n" + "space saved" +ans;  
      // console.log(s);
      }
