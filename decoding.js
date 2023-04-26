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

// Driver code
let str = "geeksforgeeks";
let encodedString = "";
let decodedString = "";
calcFreq(str);
HuffmanCodes(str.length);
console.log("Character With their Frequencies:")
let keys = Array.from(Object.keys(codes))
keys.sort()
for (var key of keys)
	console.log(key, codes[key])

for (var i of str)
	encodedString += codes[i]

console.log("\nEncoded Huffman data:")
console.log(encodedString)

// Function call
decodedString = decode_file(minHeap[0], encodedString)
console.log("\nDecoded Huffman Data:")
console.log(decodedString)
