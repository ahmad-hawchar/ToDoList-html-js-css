let span_content = [];
document.addEventListener("DOMContentLoaded", function () {
    async function addListItem(event) {
        event.preventDefault();
        let input = document.getElementById("textInput");
        let li = document.createElement("li");
        li.classList.add("listItem");
        let parag = document.createElement("span");
        parag.classList.add("parag")
        li.appendChild(parag)
        parag.innerText = input.value;
        span_content.push(input.value);
        li.innerHTML += ('<div><input type="button" onclick="handleEdit(this)" value="edit" />' +
            '<input type="button" onclick="handleDelete(this)" value="delete" /><input type="button" onclick="handleDone(this)" value="done"/></div>')
        if (li.innerText != "" && li.innerText.trim().length > 0) {
            list.appendChild(li);
            save()
        }
        input.value = "";
    }
    let list = document.getElementById("list");
    let form = document.querySelector("form");
    form.addEventListener("submit", addListItem);
});
function handleSearch(input) {
    value = input.value;
    let count = -1;
    const expression = new RegExp(value, 'gi');
    let parags = document.querySelectorAll(".parag");
    for (let i of parags) {
        count++;
        i.innerHTML = span_content[count];
        let test = false;
        let replacedText = i.innerHTML.replace(expression, (match) => {
            test = true;
            return ('<span class="highlight">' + match + '</span>');
        });
        if (test) {
            i.innerHTML = replacedText;
            i.parentNode.style.display = "flex"
        }
        else {
            i.parentNode.style.display = "none"
        }
    }
}
function handleEdit(button) {
    if (button.value == "edit") {
        let listItem = button.parentElement.parentNode;
        let spanToEdit = listItem.querySelector('span');
        let span_value = spanToEdit.innerText;
        let textArea = document.createElement("input");
        textArea.value = span_value;
        textArea.style.width = "390px";
        listItem.replaceChild(textArea, spanToEdit)
        button.value = "save";
        save();
    }
    else {
        let listItem = button.parentElement.parentNode;
        let buttons = listItem.querySelector("div").querySelectorAll("input");
        let textarea = listItem.querySelector('input');
        let textArea_value = textarea.value;
        let span = document.createElement("span");
        span.classList.add("parag");
        span.textContent = textArea_value;
        if (buttons[2].style.backgroundColor == 'green') {
            alert("test")
            span.classList.add('crossed');
        }
        listItem.replaceChild(span, textarea)
        button.value = "edit";
        parags = document.querySelectorAll(".parag");
        for (let i = 0; i < parags.length; i++) {
            span_content[i] = parags[i].textContent;
        }
        save()
    }
}
function handleDelete(item) {
    let list = document.getElementById("list");
    list.removeChild(item.parentNode.parentNode);
    save();
}
function handleDone(item) {
    if (item.parentNode.parentNode.querySelector("span").classList.contains("crossed")) {
        item.parentNode.parentNode.querySelector("span").classList.remove("crossed");
        item.classList.remove('crossed');
        item.style.backgroundColor = "";
        save();
    }
    else {
        item.parentNode.parentNode.querySelector("span").classList.add("crossed");
        item.style.backgroundColor = "green";
        save()
    }
}
function deleteAll() {
    let items = document.querySelectorAll(".crossed");
    for (let i = 0; i < items.length; i++) {
        items[i].parentNode.parentNode.removeChild(items[i].parentNode);
    }
    save();
}
function filterDone() {
    items = document.querySelectorAll(".listItem");
    for (let i of items) {
        if (i.querySelector("span").classList.contains("crossed")) {
            i.style.display = "none"
        }
        else {
            i.style.display = "flex"
        }
    }
}
function filtertodo() {
    items = document.querySelectorAll(".listItem");
    for (let i of items) {
        if (!i.querySelector("span").classList.contains("crossed")) {
            i.style.display = "none"
        }
        else {
            i.style.display = "flex"
        }
    }
}
function removeFilters() {
    items = document.querySelectorAll(".listItem");
    for (let i of items) {
        i.style.display = "flex"
    }
}
function save() {
    let span_content2 = [];
    let span_element = [];
    span_content = [];
    let listitems = document.querySelectorAll("li");
    for (let i of listitems) {
        let span = i.querySelector("span");
        span_element = {
            content: "",
            bool: false
        };
        span_element.content = span.textContent;
        span_content.push(span.textContent);
        span_element.bool = span.classList.contains("crossed");
        span_content2.push(span_element);
    }
    localStorage.setItem("listItems", JSON.stringify(span_content2));
}
function handleLoad() {
    listItems = JSON.parse(localStorage.getItem("listItems"));
    let list = document.getElementById("list");
    for (let i of listItems) {
        let li = document.createElement("li");
        li.classList.add("listItem");
        let parag = document.createElement("span");
        parag.classList.add("parag")
        if (i.bool) {
            parag.classList.add("crossed");
        }
        li.appendChild(parag)
        parag.innerText = i.content;
        span_content.push(i.content);
        let msg = ""
        msg += ('<div><input type="button" onclick="handleEdit(this)" value="edit" />' +
            '<input type="button" onclick="handleDelete(this)" value="delete" />');
        msg += !i.bool ? '<input type="button" onclick="handleDone(this)" value="done"/>' : '<input type="button" onclick="handleDone(this)" value="done" style="background-color: green;"></div>'
        li.innerHTML += msg
        if (li.innerText != "") {
            list.appendChild(li);
        }
    }
}
