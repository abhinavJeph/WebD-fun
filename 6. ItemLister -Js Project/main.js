var form = document.getElementById("addForm")
var itemList = document.getElementById("items")
var filter = document.getElementById("filter")

//Add Item
form.addEventListener("submit",addItem)
//Remove Item
itemList.addEventListener("click",removeItem)
//Filter Item
filter.addEventListener("keyup",filterItems)


//Add item funciton
function addItem(e){
    e.preventDefault()
    // get Input value
    var newItem = document.getElementById("item").value
    
    //create Element
    var li = document.createElement("li")
    li.className = "list-group-item"
    // Adding value to new element
    li.appendChild(document.createTextNode(newItem))

    //Creating delet button
    var deleteBtn = document.createElement("button")
    deleteBtn.className = "btn btn-danger btn-sm float-right delete"
    deleteBtn.appendChild(document.createTextNode("X"))

    //Adding delete button to item
    li.appendChild(deleteBtn);

    //Adding element to the item-list
    itemList.appendChild(li)    
}

// Remove item function
function removeItem(e){
    if(e.target.classList.contains("delete")){
        if(confirm("Are you sure ?")){
            var item = e.target.parentElement
        itemList.removeChild(item)
        }
    } 
}

//Filter item function
function filterItems(e){
    // text of filter bar
    var text = e.target.value.toLowerCase()
    // Get list of item
    var items = itemList.getElementsByTagName("li")
    
    // for each item in items
    Array.from(items).forEach((item) =>{
        var itemText = item.firstChild.textContent.toLowerCase()
        //check if text of item includes text of filter
        if(itemText.includes(text)){
            item.style.display = "block"
        }
        else{
            item.style.display = "none"
        }
    })
}
