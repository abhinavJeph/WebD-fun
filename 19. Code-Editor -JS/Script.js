const darkBtn = document.querySelector(".btn-dark");
const lightBtn = document.querySelector(".btn-light");
const runBtn = document.querySelector(".btn-run");
const liveBtn = document.querySelector(".live");
const liveCheckbox = document.getElementById("liveCheckbox");

const left = document.querySelector(".left");
const right = document.querySelector(".right");
const bar = document.querySelector(".bar");

const editor = document.querySelector(".editor");
const iframe = document.querySelector(".iframe");

const drag = (e) => {
  document.selection
    ? document.selection.empty()
    : window.getSelection().removeAllRanges();
  left.style.width = e.pageX - bar.offsetWidth / 2 + "px";
};

function runCode() {
  iframe.src = "data:text/html;charset-utf-8," + encodeURI(editor.textContent);
  window.addEventListener("load", restyle);
}

function restyle() {
  let doc = iframe.contentDocument;
  doc.body.innerHTML =
    doc.body.innerHTML +
    `<style>
      body
          {padding :0;
          margin:0}
      </style>`;
}

window.addEventListener("load", () => {
  editor.innerText = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      
      <style>
      body {
        background-color: yellow;
      }
      </style>

  </head>
  <body>

      Enter Your Code Here..
  
      </body>
  </html>`;
});

bar.addEventListener("mousedown", () => {
  document.addEventListener("mousemove", drag);
});

bar.addEventListener("mouseup", () => {
  document.removeEventListener("mousemove", drag);
});

darkBtn.addEventListener("click", () => {
  editor.style.backgroundColor = "#333";
  editor.style.color = "#fff";
});

lightBtn.addEventListener("click", () => {
  editor.style.backgroundColor = "#fff";
  editor.style.color = "#000";
});

runBtn.addEventListener("click", runCode);
window.addEventListener("load", runCode);

liveBtn.addEventListener("click", () => {
  liveCheckbox.checked = liveCheckbox.checked ? false : true;
  if (liveCheckbox.checked) {
    editor.addEventListener("keyup", runCode);
  }
});
