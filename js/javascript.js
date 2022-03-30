get_todos()
get_complete()

function get_todos(order) {
   var request = new XMLHttpRequest();
    var requestURL = '/get_todos';
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        var todos = request.response;
        if (order === 1) todos.sort((a,b) => (a.TODO > b.TODO) ? 1 : ((b.TODO > a.TODO) ? -1 : 0));
        printTodos(todos);
    }
}

function get_complete(order) {
     var request = new XMLHttpRequest();
     var requestURL = '/complete_todos';
     request.open('GET', requestURL);
     request.responseType = 'json';
     request.send();
     request.onload = function() {
         var complete_todos = request.response;       
         if (order === 3) complete_todos.sort((a,b) => (a.TODO > b.TODO) ? 1 : ((b.TODO > a.TODO) ? -1 : 0));
         if (order === 4) complete_todos.sort((a,b) => (a.DATE_CREATED > b.DATE_CREATED) ? 1 : ((b.DATE_CREATED > a.DATE_CREATED) ? -1 : 0));
         if (order === 5) complete_todos.sort((a,b) => (a.DATE_COMPLETE > b.DATE_COMPLETE) ? 1 : ((b.DATE_COMPLETE > a.DATE_COMPLETE) ? -1 : 0));
         printCompleted(complete_todos);
         console.log(complete_todos);

     }
 }

function printTodos(todos) {
    let table = document.getElementById('todo_table');
    let row = '';
    for (var i in todos ) {
        // data
        const todo_id = todos[i].todo_id;
        const todo = todos[i].TODO;
        const todo_createdDate = formatDates(todos[i].DATE_CREATED);
        const colour = todos[i].colour;
        // create row
        row += `
        <tr class="pc${colour}">
            <td>${todo}</td>
            <td>${todo_createdDate}</td>
            <td><img src="/images/palette.svg" class="fa palette" title="Choose colour" onclick="showPalette(${todo_id})" data-toggle="modal" data-target="#palette-modal" /></td>
            <td><i class="fa fa-trash" title="Delete" onclick="modalAction(${todo_id},'/delete_todo/')" data-toggle="modal" data-target="#form-modal"></i></td>
            <td><i class="fa fa-check" title="Complete" onclick="modalAction(${todo_id},'/complete_todo/')" data-toggle="modal" data-target="#form-modal"></i></td>
        </tr>`;
        table.innerHTML = (row);

    }
}

function printCompleted(todos) {
    var table = document.getElementById('completed_table');
    let row = '';
    for (var i in todos ) {
        // data
        const todo_id = todos[i].todo_id;
        const todo = todos[i].TODO;
        const todo_createdDate = formatDates(todos[i].DATE_CREATED);
        const todo_completedDate = formatDates(todos[i].DATE_COMPLETE);
        // create row
        row += `
        <tr>
            <td>${todo}</td>
            <td>${todo_createdDate}</td>
            <td>${todo_completedDate}</td>
            <td><i class="fa fa-archive" title="Archive" onclick="modalAction(${todo_id},'/archive_todo/')" data-toggle="modal" data-target="#form-modal"></i></td>
            <td><i class="fa fa-undo" title="Incomplete" onclick="modalAction(${todo_id},'/incomplete_todo/')" data-toggle="modal" data-target="#form-modal"></i></td>
        </tr>`;
        table.innerHTML = (row);
    }
}

function modalAction(todo_id,action) {
    var form = document.getElementById("modal-inner-form");
    form.action = action + todo_id;
}

function selectPalette(id) {
    var form = document.getElementById("palette-inner-form");
    var todo = document.getElementById("todo-id");
    var palette = document.getElementById("palette-submit");
    palette.disabled = false;
    palette.style.cursor = "pointer";
    todo_id = todo.value;
    form.action = '/palette/' + todo_id  + "/" + id;
}
function showPalette(todo_id) {
    var todo = document.getElementById("todo-id");
    todo.value = todo_id;
}

function formatDates(date){
    var formattedDate = date.replace(/T/, ' ').replace(/\..+/, '');
    var date = new Date(date);
    const fullYear = date.getFullYear();
    var year = fullYear.toString().substr(-2);
    d = date.getDate() + "/" +date.getMonth() + "/"+year;
    return date = d;
}