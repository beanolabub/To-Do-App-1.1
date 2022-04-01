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
        if (order === 4) complete_todos.sort((b,a) => (a.DATE_CREATED > b.DATE_CREATED) ? 1 : ((b.DATE_CREATED > a.DATE_CREATED) ? -1 : 0));
         if (order === 5) complete_todos.sort((b,a) => (a.DATE_COMPLETE > b.DATE_COMPLETE) ? 1 : ((b.DATE_COMPLETE > a.DATE_COMPLETE) ? -1 : 0));
         printCompleted(complete_todos);
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
        let progress = todos[i].progress;
        let progressVal = 1;
        let progressTxt = '';
        if( progress === 1 ) { progressTxt = 'check-'; progressVal = 1 };
        // create row
        row += `
        <tr class="pc${colour}">
            <td class="todo-td">
                <div class="todo-td" title="${todo}">${todo}</div>
                <input type="text" class="todo-input" id="todo-${todo_id}" value="${todo} [${todo_createdDate}]">
            </td>
            <td>${todo_createdDate}</td>
            <td><i class="fa fa-${progressTxt}circle-o" title="Underway?" onclick="update(${todo_id},'progress',${progressVal})"></i></td>
            <td><img src="/images/palette.svg" class="fa palette" title="Choose colour" onclick="showPalette(${todo_id})" data-toggle="modal" data-target="#palette-modal" /></td>
            <td><i class="fa fa-clone" title="Copy todo" onclick="copyText(${todo_id})"></i></td>
            <td><i class="fa fa-trash" title="Delete" onclick="modalAction(${todo_id},'/delete_todo/')" data-toggle="modal" data-target="#form-modal"></i></td>
            <td><i class="fa fa-check" title="Complete" onclick="update(${todo_id},'complete',${progressVal})"></i></td>
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
        let progress = todos[i].progress;
        let progressVal = 0;
        if( progress === 1 ) { progressVal = 0 };
        // create row
        row += `
        <tr>
            <td class="todo-td">
                <div class="todo-td">${todo}</div>
            </td>
            <td>${todo_createdDate}</td>
            <td>${todo_completedDate}</td>
            <td><i class="fa fa-archive" title="Archive" onclick="modalAction(${todo_id},'/archive_todo/')" data-toggle="modal" data-target="#form-modal"></i></td>
            <td><i class="fa fa-undo" title="Incomplete" onclick="update(${todo_id},'complete',${progressVal})"></i></td>
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
    form.action = '/palette/' + todo.value  + "/" + id;
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

function copyText( todo_id ) {
    var copyText = document.getElementById("todo-" + todo_id);
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
    navigator.clipboard.writeText(copyText.value);
    alert("Copied");
}

function update(todo_id,mode,value) {
    var request = new XMLHttpRequest();
     var requestURL = '/update/' + todo_id + '/' + mode + '/' + value;
     request.open('GET', requestURL);
     request.responseType = 'json';
     request.send();
     request.onload = function() {
        var todos = request.response;
        get_todos();
        get_complete();
     }
 }