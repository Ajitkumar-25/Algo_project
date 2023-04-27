class HuffmanNode {
  constructor() {
    this.data = 0;
    this.c = "";
    this.left = this.right = null;
  }
}

const fmap = new Map();
function charFrequency(string) {
  var freq = {};
  for (var i = 0; i < string.length; i++) {
    var character = string.charAt(i);
    if (freq[character]) {
      freq[character]++;
    } else {
      freq[character] = 1;
    }
  }
  for (var i = 0; i < string.length; i++) {
    console.log(freq[string[i]]);
  }

  return freq;
}
function printCode(root, s) {
  if (root.left == null && root.right == null) {
    console.log(root.c + ":" + s + "<br>");
    fmap[root.c] = s;
    console.log(fmap);
    document.getElementById("string3").innerHTML += `${root.c} : ${s} \n`;
    return;
  }
  printCode(root.left, s + "0");
  printCode(root.right, s + "1");
}

function display(e) {
  e.preventDefault();
  let input = document.getElementById("string1").value;
  n = input.length;
  const freqarr = charFrequency(input);
  var x = input;
  x = Array.from(new Set(x.split(""))).toString();
  console.log(x);
  sss = input;
  input = "";
  for (var i = 0; i < x.length; i++) if (x[i] != ",") input += x[i];
  console.log(input);
  n = input.length;
  let q = [];

  for (let i = 0; i < n; i++) {
    let hn = new HuffmanNode();

    hn.c = input[i];
    hn.data = freqarr[input[i]];

    hn.left = null;
    hn.right = null;

    q.push(hn);
  }

  let root = null;
  q.sort(function (a, b) {
    return a.data - b.data;
  });
  while (q.length > 1) {
    let x = q[0];
    q.shift();
    let y = q[0];
    q.shift();
    let f = new HuffmanNode();
    f.data = x.data + y.data;
    f.c = "-";
    f.left = x;
    f.right = y;
    root = f;
    q.push(f);
    q.sort(function (a, b) {
      return a.data - b.data;
    });
  }
  printCode(root, "");
  let ans = 0;
  for (var j = 0; j < sss.length; j++) {
    document.getElementById("string2").innerHTML += fmap[sss[j]];
    ans += fmap[sss[j]].length;
  }

  for (var k = 0; k < input.length; k++) {
    document.getElementById("string4").innerHTML += `${input[k]} : ${
      freqarr[input[k]]
    }\n`;
  }
  document.getElementById("string5").innerHTML += ans;
}



function copy(e) {
  e.preventDefault();
  // Get the text field
  var copyText = document.getElementById("string2");

  // Select the text field
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);

  // Alert the copied text
  alert("Copied the text: " + copyText.value);
}

// To map each character its huffman value
let codes = {};

// To store the frequency of character of the input data
let freq = {};

// A Huffman tree node
class MinHeapNode {
  constructor(data, freq) {
    this.left = null;
    this.right = null;
    this.data = data;
    this.freq = freq;
  }

  // Define the comparison method for sorting the nodes in the heap
  compareTo(other) {
    return this.freq - other.freq;
  }
}

// Create an empty min-heap
let minHeap = [];

// Utility function to print characters along with their huffman value
function printCodes(root, str) {
  if (!root) {
    return;
  }
  if (root.data !== "$") {
    console.log(root.data + " : " + str);
  }
  printCodes(root.left, str + "0");
  printCodes(root.right, str + "1");
}

// Utility function to store characters along with their huffman value in a hash table
function storeCodes(root, str) {
  if (!root) {
    return;
  }
  if (root.data !== "$") {
    codes[root.data] = str;
  }
  storeCodes(root.left, str + "0");
  storeCodes(root.right, str + "1");
}

// Function to build the Huffman tree and store it in minHeap
function HuffmanCodes(size) {
  for (let key in freq) {
    minHeap.push(new MinHeapNode(key, freq[key]));
  }
  // Convert the array to a min-heap using the built-in sort method
  minHeap.sort((a, b) => a.compareTo(b));
  while (minHeap.length !== 1) {
    let left = minHeap.shift();
    let right = minHeap.shift();
    let top = new MinHeapNode("$", left.freq + right.freq);
    top.left = left;
    top.right = right;
    minHeap.push(top);
    // Sort the array to maintain the min-heap property
    minHeap.sort((a, b) => a.compareTo(b));
  }
  storeCodes(minHeap[0], "");
}

// Utility function to store map each character with its frequency in input string
function calcFreq(str) {
  for (let i = 0; i < str.length; i++) {
    let char = str.charAt(i);
    if (freq[char]) {
      freq[char]++;
    } else {
      freq[char] = 1;
    }
  }
}

// Function iterates through the encoded string s
// If s[i] == '1' then move to node.right
// If s[i] == '0' then move to node.left
// If leaf node, append the node.data to our output string
function decode_file(root, s) {
  let ans = "";
  let curr = root;
  let n = s.length;
  for (let i = 0; i < n; i++) {
    if (s.charAt(i) == "0") {
      curr = curr.left;
    } else {
      curr = curr.right;
    }

    // Reached leaf node
    if (!curr.left && !curr.right) {
      ans += curr.data;
      curr = root;
    }
  }
  return ans + "\0";
}

function display2(e) {
  e.preventDefault();
  let str = document.getElementById("string1").value;
  let encodedString = document.getElementById("string6").value;
  let decodedString = "";
  calcFreq(str);
  HuffmanCodes(str.length);
  // Function call
  decodedString = decode_file(minHeap[0], encodedString);
  console.log("\nDecoded Huffman Data:");
  console.log(decodedString);
  document.getElementById("string7").innerHTML = decodedString;
}
