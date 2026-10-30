// Membuat tombol
let btnBackground = document.createElement("button");
btnBackground.textContent = "Ubah Latar Belakang";
btnBackground.type = "button";
btnBackground.className = "action-button";
btnBackground.onclick = function() {
 document.body.style.backgroundColor = "#e9edff";
};
let btnTextColor = document.createElement("button");
btnTextColor.textContent = "Ubah Warna Teks";
btnTextColor.type = "button";
btnTextColor.className = "action-button";
btnTextColor.onclick = function() {
 document.body.style.color = "#5143c8";
};
let btnIncreaseFont = document.createElement("button");
btnIncreaseFont.textContent = "Perbesar Font";
btnIncreaseFont.type = "button";
btnIncreaseFont.className = "action-button";
btnIncreaseFont.onclick = function() {
 let currentSize = parseInt(getComputedStyle(document.body).fontSize);
 document.body.style.fontSize = (currentSize + 1) + "px";
};
// Menambahkan tombol ke output
let outputDiv = document.getElementById("output3");
outputDiv.appendChild(btnBackground);
outputDiv.appendChild(btnTextColor);
outputDiv.appendChild(btnIncreaseFont);
