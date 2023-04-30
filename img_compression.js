function display(e) {
  e.preventDefault();

  AmagiLoader.show();
  setTimeout(() => {
    AmagiLoader.hide();
  }, 3000);

  class HuffmanEncoder {
    constructor() {
      this.freq = {};
      this.tree = {};
      this.codes = {};
      this.bits = 0;
    }

    // Calculate frequency of each character in the image

    calculateFrequency(imageData) {
      const pixels = imageData.data;

      for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const key = `${r},${g},${b}`;

        if (key in this.freq) {
          this.freq[key] += 1;
        } else {
          this.freq[key] = 1;
        }
      }
    }

    // Build Huffman tree
    
    buildTree() {
      const nodes = [];

      for (let key in this.freq) {
        const node = { key, freq: this.freq[key], left: null, right: null };
        nodes.push(node);
      }

      while (nodes.length > 1) {
        nodes.sort((a, b) => a.freq - b.freq);

        const left = nodes.shift();
        const right = nodes.shift();
        const parent = { key: null, freq: left.freq + right.freq, left, right };
        nodes.push(parent);
      }

      this.tree = nodes[0];
    }

    // Generate Huffman codes
    generateCodes(node, code) {
      if (!node.left && !node.right) {
        this.codes[node.key] = code;
        this.bits += this.freq[node.key] * code.length;
      } else {
        this.generateCodes(node.left, code + "0");
        this.generateCodes(node.right, code + "1");
      }
      // console.log(code);
    }

    // Compress image using Huffman encoding
    compress(imageData) {
      this.calculateFrequency(imageData);
      this.buildTree();
      this.generateCodes(this.tree, "");

      const pixels = imageData.data;
      const compressedPixels = [];
      let compressedBits = "";

      for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const key = `${r},${g},${b}`;
        compressedBits += this.codes[key];
      }

      for (let i = 0; i < compressedBits.length; i += 8) {
        compressedPixels.push(parseInt(compressedBits.slice(i, i + 8), 2));
      }

      return new Uint8ClampedArray(compressedPixels);
    }
  }


// starting 

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();

  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const encoder = new HuffmanEncoder();
    const compressedPixels = encoder.compress(imageData);

    // console.log("Original Image Size:", imageData.data.length);
    // console.log("code",imageData.data);
    // console.log("Compressed Image Size:", compressedPixels.length);
    // console.log("code",compressedPixels);
    // console.log("Compression Ratio:", imageData.data.length / compressedPixels.length);

    // console.log(imageData.data);
    // console.log(compressedPixels);

    let save = imageData.data.length - compressedPixels.length;
    document.getElementById("string2").innerHTML =
      "Total space consumed before encoding : " +
      imageData.data.length +
      " bits\n\n" +
      "Total space consumed after encoding : " +
      compressedPixels.length +
      " bits\n\n" +
      "Space saved : " +
      save +
      " bits\n\n" +
      "compression ratio :" +
      imageData.data.length / compressedPixels.length;

    // let initial = document.getElementById("string3");
    // initial.innerHTML+= imageData.data;
    // let final = document.getElementById("string4");
    // final.innerHTML += compressedPixels;

    console.log(imageData.data);
    console.log(compressedPixels);
  };

  var fileInput = document.getElementById("img");
  var filename = fileInput.files[0].name;
  img.src = filename;


}
