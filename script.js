class HuffmanNode {
  constructor() {
    this.data = 0;
    this.c = "";
    this.left = this.right = null;
  }
}

let q = [];

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
  //code in 5th block
   let len=input.length*8;
   let save=len-ans;
  document.getElementById("string5").innerHTML = 
    "Total space consumed before encoding : "+ len+"bits\n\n"
    + "Total space consumed after encoding : "+ans+ "bits\n\n"
    + "Space saved : "+ save+" bits\n\n";
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
  alert("The text have been copied to the clipboard. ");
}


function display2(e)
{
  e.preventDefault();
  let str = document.getElementById("string6").value;

  let root = q[0];
  console.log(root);
  for(let i=0;i<str.length;i++)
  {
     if(root.c == '-')
     {
      if(str[i] == '0')
      {
        root=root.left;
        if(root.c != '-')
        {
          document.getElementById("string7").innerHTML += root.c;
          console.log(root.c);
          root=q[0];
        }
      }
      else
      {
        root=root.right;
        if(root.c != '-')
        {
          document.getElementById("string7").innerHTML += root.c;
          console.log(root.c);
          root=q[0];
        }
      }
     }
  }


}