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

loadBoardState();

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
    if (e.target.classList.contains("column")) {
        e.target.classList.add("hovered");
    }
}

function dragLeave(e) {
    if (e.target.classList.contains("column")) {
        e.target.classList.remove("hovered");
    }
}

function dragDrop(e) {
    const id = e.dataTransfer.getData("text");
    const issue = document.getElementById(id);
    if (e.target.classList.contains("column")) {
        e.target.appendChild(issue);
        e.target.classList.remove("hovered");
        saveBoardState();
    }
}

function saveBoardState() {
    const boardState = {};
    columns.forEach(column => {
        const columnId = column.id;
        const issueIds = Array.from(column.children)
            .filter(child => child.classList.contains("issue"))
            .map(issue => issue.id);
        boardState[columnId] = issueIds;
    });
    localStorage.setItem("boardState", JSON.stringify(boardState));
}

function loadBoardState() {
    const savedState = localStorage.getItem("boardState");
    if (savedState) {
        const boardState = JSON.parse(savedState);
        Object.keys(boardState).forEach(columnId => {
            const column = document.getElementById(columnId);
            boardState[columnId].forEach(issueId => {
                const issue = document.getElementById(issueId);
                if (issue && column) {
                    column.appendChild(issue);
                }
            });
        });
    }
}
