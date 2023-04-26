// Node class to represent the Huffman tree node
class Node {
  constructor(char, freq, left, right) {
    this.char = char;
    this.freq = freq;
    this.left = left;
    this.right = right;
  }
}

// Function to calculate the frequency of characters in a string
function calculateFrequency(str) {
  const freqMap = new Map();
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (freqMap.has(char)) {
      freqMap.set(char, freqMap.get(char) + 1);
    } else {
      freqMap.set(char, 1);
    }
  }
  return freqMap;
}

// Function to build the Huffman tree
function buildHuffmanTree(freqMap) {
  const pq = [...freqMap.entries()].map(
    ([char, freq]) => new Node(char, freq, null, null)
  );
  while (pq.length > 1) {
    pq.sort((a, b) => a.freq - b.freq);
    const left = pq.shift();
    const right = pq.shift();
    const parent = new Node(null, left.freq + right.freq, left, right);
    pq.push(parent);
  }
  return pq[0];
}

// Function to generate Huffman codes for characters
function generateHuffmanCodes(root) {
  const codes = new Map();
  function traverse(node, code) {
    if (node.char !== null) {
      codes.set(node.char, code);
    } else {
      traverse(node.left, code + "0");
      traverse(node.right, code + "1");
    }
  }
  traverse(root, "");
  return codes;
}

// Function to encode a string using Huffman encoding
function huffmanEncode(str) {
  const freqMap = calculateFrequency(str);
  const huffmanTree = buildHuffmanTree(freqMap);
  const huffmanCodes = generateHuffmanCodes(huffmanTree);
  let encoded = "";
  for (let i = 0; i < str.length; i++) {
    encoded += huffmanCodes.get(str[i]);
  }
  return encoded;
}

// Function to decode a Huffman-encoded string
function huffmanDecode(encoded, huffmanTree) {
  let decoded = "";
  let node = huffmanTree;
  for (let i = 0; i < encoded.length; i++) {
    if (encoded[i] === "0") {
      node = node.left;
    } else {
      node = node.right;
    }
    if (node.char !== null) {
      decoded += node.char;
      node = huffmanTree;
    }
  }
  return decoded;
}

// Example usage

function display(e) {
    e.preventDefault();
  let input = document.getElementById("string1").value;
//   document.getElementById("string2").innerHTML = input;
  const encoded = huffmanEncode(input);
  document.getElementById("string2").innerHTML=('Encoded:', encoded);
}
//   const decoded = huffmanDecode(encoded, buildHuffmanTree(calculateFrequency(input)));
//   console.log('Decoded:', decoded);
