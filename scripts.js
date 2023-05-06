const issues = document.querySelectorAll(".issue");
const columns = document.querySelectorAll(".column");

issues.forEach(issue => {
    issue.addEventListener("dragstart", dragStart);
    issue.addEventListener("dragend", dragEnd);
});

columns.forEach(column => {
    column.addEventListener("dragover", dragOver);
    column.addEventListener("dragenter", dragEnter);
    column.addEventListener("dragleave", dragLeave);
    column.addEventListener("drop", dragDrop);
});

function dragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.id);
    setTimeout(() => e.target.classList.add("hidden"), 0);
}

function dragEnd(e) {
    e.target.classList.remove("hidden");
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.target.classList.add("hovered");
}

function dragLeave(e) {
    e.target.classList.remove("hovered");
}

function dragDrop(e) {
    const id = e.dataTransfer.getData("text");
    const issue = document.getElementById(id);
    e.target.appendChild(issue);
    e.target.classList.remove("hovered");
}
