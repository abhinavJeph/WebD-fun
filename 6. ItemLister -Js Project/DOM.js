// DOCUMENT OBJECT MODEL

// EXAMINE THE DOCUMENT OBJECTS
// console.dir(document)
// console.log(document.URL)
// console.log(document.head)
// console.log(document.body)
// console.log(document.domain)
// console.log(document.title)
// console.log(document.all)
// document.all[6].textContent = "changed Title"

// GET ELEMENT BY ID
// let mainHeader = document.getElementById("main-header")
// mainHeader.style.borderBottom = "10px solid darkGrey"
// document.getElementById("header-title").textContent = "Buffallo"
// document.getElementById("header-title").innerText = "Buffallo"  // It thinks of style too

// GET ELEMENTs BY CLASSNAME
// var items = document.getElementsByClassName("list-group-item")
// for (let i = 0; i < items.length; i++) {
//     const item = items[i];
//     item.textContent = `chiku ${i}`
// }
// items[1].style.backgroundColor = "yellow"

// GET ELEMENT BY TAG NAME
// const li = document.getElementsByTagName("li")
// li[2].textContent = "list 2"

// QUERY SELECTOR
// let header = document.querySelector("#main-header")
// header.style.borderBottom = " 10px solid grey"
// let input = document.querySelector("input")
// input.value = "Balle balle"
// let submit  = document.querySelector(`input[type = "submit"]`)
// submit.value = "Done dna done"

// QUERY SELECTOR ALL
// var title = document.querySelectorAll(".title")
// title.forEach(title =>{
//     title.textContent += ` hihi ${title.textContent}`
// })
// let odd = document.querySelectorAll("li:nth-child(odd)")
// odd.forEach(oddItem =>{
//     oddItem.style.backgroundColor = "grey"
// })

// TRAVERSING THE DOM
// var itemList = document.querySelector("#items")
// console.log(item)
// // Parent Node
// console.log(itemList.parentNode)
// console.log(itemList.parentNode.parentNode.parentNode)
// // Parent Element
// console.log(itemList.parentElement)

// childNodes
// console.log(itemList.childNodes)   // with text (space wali lines)
// children
// console.log(itemList.children) // without text

// First child
// console.log(itemList.firstChild) //text
// console.log(itemList.firstElementChild)

// // Last child
// console.log(itemList.lastChild)
// itemList.lastElementChild.textContent = "yo yo bantai raper"

// next siblings
// console.log(itemList.nextSibling)
// console.log(itemList.nextElementSibling) // null because no element

// previous siblings
// console.log(itemList.previousSibling)
// console.log(itemList.previousElementSibling)

// //CREATE ELEMENT
// var newDiv = document.createElement("div")
// newDiv.id = "divID"
// newDiv.className = "Hello"
// newDiv.innerHTML = "123 new Div is here"
// newDiv.style.backgroundColor = "yellow"
// let divText = document.createTextNode("This is textNode")
// newDiv.appendChild(divText)
// newDiv.setAttribute("title","buffallo")
// console.log(newDiv)

// var someDiv = document.querySelector("header .col-md-6");
// var h1 = document.querySelector("header h1");
// someDiv.insertBefore(newDiv, h1);


// EVENT LISTNER

// HTML added 
// <br>
// <div id="output" style="width: 1065px; height: 200px; text-align: center;">output</div>
// <button class="btn btn-dark" id="button">Click Here</button>

// var button = document.getElementById("button")

// button.addEventListener("click",()=> alert("clicked"))

// button.addEventListener("click", buttonClick)

// function buttonClick(e){
//     // document.getElementById("header-title").textContent = "changed"
//     // document.querySelector("#main").style.backgroundColor = "grey"
//     // console.log(e)

//     // console.log(e.target)
//     // console.log(e.target.id)

//     var output = document.getElementById("output")
//     // output.style.border = "4px dotted yellow"
//     // output.innerHTML = "<h3>"+e.target.id+"</h3>"  

//     // console.log(e.clientX)
//     // console.log(e.clientY)

//     // console.log(e.offsetX)
//     // console.log(e.offsetY)

//     // console.log(e.altKey)
//     // console.log(e.ctrlKey)
//     // console.log(e.shiftKey)
// }

// button.addEventListener("click",runEvent)
// button.addEventListener("dblclick",runEvent)
// button.addEventListener("mouseup",runEvent)
// button.addEventListener("mousedown",runEvent)

// function runEvent(e){
//     console.log(e.type)
//     console.log(e.target.value)
// }

// var output = document.getElementById("output")

// output.addEventListener("mouseenter",runEvent)
// output.addEventListener("mouseleave",runEvent)

// output.addEventListener("mouseover",runEvent)
// output.addEventListener("mouseout", runEvent)

// output.addEventListener("mousemove", function (e){
//     output.innerHTML = `<h3>MouseX : ${e.offsetX}</h3><h3>MouseY : ${e.offsetY}</h3>`
//     document.body.style.backgroundColor = `rgb(${e.offsetX},${e.offsetY},50)`
// })

// var inputItem = document.querySelector(`input[type="text"]`)
// var form = document.querySelector("form")

// inputItem.addEventListener("keydown",runEvent)
// inputItem.addEventListener("keyup",runEvent)
// inputItem.addEventListener("keypress",runEvent)
// inputItem.addEventListener("focus",runEvent)
// inputItem.addEventListener("blur",runEvent)

// inputItem.addEventListener("cut",runEvent)
// inputItem.addEventListener("paste",runEvent)

// inputItem.addEventListener("input",runEvent)

// form.addEventListener("submit",(e)=>{
//     e.preventDefault()
//     console.log(e.target)
// })



