var items = JSON.parse(localStorage.getItem("items")) || [];
var inputField = document.getElementById("inputField");

function updateItemsList() {
    var itemsList = document.getElementById("itemsList");
    itemsList.innerHTML = "";
    items.forEach(function(item, index) {
        var listItem = document.createElement("li");
        listItem.textContent = item.text;
        listItem.classList.add("item");
        listItem.dataset.itemId = index;
        itemsList.appendChild(listItem);
    });
}

function openDrawer() {
    document.getElementById("drawer").style.width = "300px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeDrawer() {
    document.getElementById("drawer").style.width = "0";
    document.body.style.backgroundColor = "#f0f0f0";
}

function addItem() {
    var inputValue = inputField.value.trim();
    if (inputValue !== "") {
        var newItem = {
            text: inputValue
        };
        items.push(newItem);
        updateItemsList();
        localStorage.setItem("items", JSON.stringify(items));
        inputField.value = "";
    }
}

function editItem() {
    var selectedItem = document.querySelector(".item.selected");
    if (selectedItem) {
        inputField.value = selectedItem.textContent;
        inputField.dataset.itemId = selectedItem.dataset.itemId;
    }
}

function deleteItem() {
    var selectedItem = document.querySelector(".item.selected");
    if (selectedItem) {
        var itemId = selectedItem.dataset.itemId;
        items.splice(itemId, 1);
        updateItemsList();
        localStorage.setItem("items", JSON.stringify(items));
        inputField.value = "";
    }
}

function saveItem() {
    var inputValue = inputField.value.trim();
    var itemId = inputField.dataset.itemId;
    if (itemId !== "") {
        items[itemId].text = inputValue;
        updateItemsList();
        localStorage.setItem("items", JSON.stringify(items));
        inputField.value = "";
        inputField.dataset.itemId = "";
    }
}

function selectItem(event) {
    var selectedItem = event.target;
    if (selectedItem.classList.contains("item")) {
        var itemsList = document.getElementById("itemsList");
        var items = itemsList.getElementsByClassName("item");
        Array.from(items).forEach(function(item) {
            item.classList.remove("selected");
        });
        selectedItem.classList.add("selected");
    }
}

document.getElementById("openButton").addEventListener("click", openDrawer);
document.getElementById("closeButton").addEventListener("click", closeDrawer);
document.getElementById("addButton").addEventListener("click", addItem);
document.getElementById("editButton").addEventListener("click", editItem);
document.getElementById("deleteButton").addEventListener("click", deleteItem);
document.getElementById("saveButton").addEventListener("click", saveItem);
document.getElementById("itemsList").addEventListener("click", selectItem);
