//JavaScript code for the above approach
function shannon(l, h, p) {
  let pack1 = 0,
    pack2 = 0,
    diff1 = 0,
    diff2 = 0;
  let i, d, k, j;
  if (l + 1 == h || l == h || l > h) {
    if (l == h || l > h) return;
    p[h].arr[++p[h].top] = 0;
    p[l].arr[++p[l].top] = 1;
    return;
  } else {
    for (i = l; i <= h - 1; i++) pack1 = pack1 + p[i].pro;
    pack2 = pack2 + p[h].pro;
    diff1 = pack1 - pack2;
    if (diff1 < 0) diff1 = diff1 * -1;
    j = 2;
    while (j != h - l + 1) {
      k = h - j;
      pack1 = pack2 = 0;
      for (i = l; i <= k; i++) pack1 = pack1 + p[i].pro;
      for (i = h; i > k; i--) pack2 = pack2 + p[i].pro;
      diff2 = pack1 - pack2;
      if (diff2 < 0) diff2 = diff2 * -1;
      if (diff2 >= diff1) break;
      diff1 = diff2;
      j++;
    }
    k++;
    for (i = l; i <= k; i++) p[i].arr[++p[i].top] = 1;
    for (i = k + 1; i <= h; i++) p[i].arr[++p[i].top] = 0;
    shannon(l, k, p);
    shannon(k + 1, h, p);
  }
}

function sortByProbability(n, p) {
  let i, j;
  let temp;
  for (j = 1; j <= n - 1; j++) {
    for (i = 0; i < n - 1; i++) {
      if (p[i].pro > p[i + 1].pro) {
        temp = p[i];
        p[i] = p[i + 1];
        p[i + 1] = temp;
      }
    }
  }
}

function display(n, p) {
  let i, j;
  document.write("\n\n\n Symbol Probability Code" + "<br>");
  for (i = n - 1; i >= 0; i--) {
    document.write(`${p[i].sym} 	 ${p[i].pro} 	 `);
    for (j = 0; j <= p[i].top; j++) document.write(p[i].arr[j]);

    document.write("<br>");
  }
}

//Driver code

document.write("Enter number of symbols : ");
let n = 5;
document.write(n + "<br>");
let p = [];
let total = 0;
for (let i = 0; i < n; i++) {
  document.write(" Enter symbol " + (i + 1) + " : ");
  let ch = String.fromCharCode(65 + i);
  document.write(ch + "<br>");
  p.push({ sym: ch, pro: 0, arr: [], top: -1 });
}
let x = [0.22, 0.28, 0.15, 0.3, 0.05];
for (let i = 0; i < n; i++) {
  document.write("Enter probability of " + p[i].sym + " : ");
  document.write(x[i] + "<br>");
  p[i].pro = x[i];
  total = total + p[i].pro;
  if (total > 1) {
    document.write("Invalid. Enter new values");
    total = total - p[i].pro;
    i--;
  }
}
p[n - 1].pro = 1 - total;
sortByProbability(n, p);
for (let i = 0; i < n; i++) p[i].top = -1;
shannon(0, n - 1, p);
display(n, p);


