(function() {
    let form = document.getElementById("form_container");
    let formInput = document.getElementById("new_item");
    let submitButton = document.getElementById("submit_button");
    let listBody = document.getElementById("list_body");
    if (!formInput || !submitButton) {
        console.warn("Required input elements not found.");
        return;
    }
    formInput.addEventListener("change", () => {
        if (formInput.value.length) {
            submitButton.removeAttribute("disabled");
        }
    });

    form.onsubmit = (e) => {
        e.preventDefault();
        // Not the most robust ID generator, but since this is a personal app and doesn't need to scale, I'm not worrying about sanitizing IDs
        let itemId = encodeURI(formInput.value.slice(0, 10));
        if (!itemId) {
            console.warn("No suitable ID found for new list item");
            return;
        }
        if (!document.getElementById(`${itemId}`)) createListItem(itemId);
    }

    function createListItem(itemId) {

        // Create the actual list element
        let listItem = document.createElement("li");

        // Create list text
        let listText = document.createElement("label");
        listText.className = "list_text";
        listText.textContent = formInput.value;

        // Create checkbox element
        let listCheckbox = document.createElement("span");
        listCheckbox.id = itemId;
        listCheckbox.classList.add("checkbox", "unchecked");
        listCheckbox.addEventListener("click", () => {
            listCheckbox.classList.toggle("unchecked");
            listCheckbox.classList.toggle("checked");
            listText.classList.toggle("completed");
        });

        // Create delete button
        let deleteButton = document.createElement("button");
        deleteButton.className = "delete";
        deleteButton.innerText = "\u2716";
        deleteButton.addEventListener("click", e => {
            e.preventDefault();
            listItem.parentElement.removeChild(listItem);
        });

        // Append created elements
        listText.appendChild(listCheckbox);
        listItem.appendChild(listText);
        listItem.appendChild(deleteButton);
        listBody.appendChild(listItem);
    }

})();