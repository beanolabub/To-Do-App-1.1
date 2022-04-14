
// select colour
function selectPalette(id) {
    var form = document.getElementById("palette-inner-form");
    var palette = document.getElementById("palette-submit");
    palette.disabled = false;
    palette.style.cursor = "pointer";
    form.action = '/palette/'+document.getElementById("todo-id").value  + "/" + id;
}

// format dates
function formatDates(date){
    var formattedDate = date.replace(/T/, ' ').replace(/\..+/, '');
    var date = new Date(date);
    const fullYear = date.getFullYear();
    var year = fullYear.toString().substr(-2);
    return date = date.getDate() + "/" +date.getMonth() + "/"+year;
}

// copy text
function copyText( todo_id ) {
    var copyText = document.getElementById("todo-" + todo_id);
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    alert("Copied");
}

// updates
function update(todo_id,mode,value) {
    if (confirm("Are you sure?") == false) return;
    var request = new XMLHttpRequest();
     var requestURL = '/update/' + todo_id + '/' + mode + '/' + value;
     request.open('GET', requestURL);
     request.responseType = 'json';
     request.send();
     request.onload = function() {
        var todos = request.response;
        getTodos();
        getComplete();
     }
}

//  change text
function changeTodo(todo_id) {
    document.getElementById('todo-text').value = document.getElementById('todo-text-' + todo_id).innerText;
    document.getElementById("modal-inner-form").action = '/change/' + todo_id;
}

// click events
const todoList = document.querySelector('.todo-list').addEventListener('click', (e) => {
    const todo_id = e.target.parentElement.parentElement.getAttribute("data-id");
    const todo_mode = e.target.getAttribute("data-mode");
    const todo_value = e.target.getAttribute("data-value");
    if (e.target.tagName === "I" ) {
        if( todo_mode == 'modal') {
            document.getElementById("todo-id").value = todo_id;        
        } else {
            var request = new XMLHttpRequest();
            var requestURL = '/update/' + todo_id + '/' + todo_mode + '/' + todo_value;
            request.open('GET', requestURL);
            request.responseType = 'json';
            request.send();
            request.onload = function() {
                var todos = request.response;
                getTodos();
                getComplete();
            }
        }
    }
});