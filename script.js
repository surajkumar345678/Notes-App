// script.js

const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

function showNotes() {
    const savedNotes = localStorage.getItem("notes");
    notesContainer.innerHTML = savedNotes ? savedNotes : '';
}

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

function createNote() {
    const note = document.createElement("p");
    note.className = "input-box";
    note.setAttribute("contenteditable", true);

    const label = document.createElement("label");
    label.innerText = "Type your note here";
    note.appendChild(label);

    const deleteIcon = document.createElement("img");
    deleteIcon.src = "images/delete.png";
    deleteIcon.addEventListener("click", deleteNote);

    note.addEventListener("input", hidePlaceholder); // Add input event listener

    notesContainer.appendChild(note).appendChild(deleteIcon);

    updateStorage();
}

function deleteNote() {
    this.parentElement.remove();
    updateStorage();
}

function handleNoteEdit() {
    updateStorage();
}

function hidePlaceholder() {
    const label = this.querySelector("label");
    if (label) {
        label.style.display = "none";
    }
}

createBtn.addEventListener("click", createNote);
notesContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {
        deleteNote.call(e.target);
    } else if (e.target.tagName === "P") {
        handleNoteEdit();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});

showNotes();
