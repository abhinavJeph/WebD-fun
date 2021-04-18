const li = document.querySelectorAll("li");
const arrayLi = Array.from(li);

li.forEach((item) =>
  item.addEventListener("click", function (e) {
    const index = arrayLi.indexOf(item);
    if (e.target.classList.contains("data-up")) {
      if (index > 0) {
        console.log("Move up");
        var aboveItem = li.item(index - 1);
        var ItemHTML = item.innerHTML;

        item.innerHTML = aboveItem.innerHTML;
        aboveItem.innerHTML = ItemHTML;
      }
    } else if (e.target.classList.contains("data-down")) {
      if (index < arrayLi.length - 1) {
        console.log("Move down");
        var downItem = li.item(index + 1);
        var ItemHTML = item.innerHTML;
        item.innerHTML = downItem.innerHTML;
        downItem.innerHTML = ItemHTML;
      }
    }
  })
);
