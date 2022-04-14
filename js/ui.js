
getTodos()
getComplete()


function getTodos(order) {
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

function getComplete(order) {
     var request = new XMLHttpRequest();
     var requestURL = '/get_complete_todos';
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
     
    var table = document.getElementById('todo_table');
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
       if( progress === 1 ) { progressTxt = 'check-'; progressVal = 0 };
        // create row
        row += `
        <tr class="pc${colour}" data-id="${todo_id}">
            <td class="todo-td">
                <div class="todo-td" title="${todo}" id="todo-text-${todo_id}" onclick="changeTodo(${todo_id});" data-toggle="modal" data-target="#text-modal">${todo}</div>
                <input type="text" class="todo-input" id="todo-${todo_id}" value="${todo} [${todo_createdDate}]">
            </td>
            <td>${todo_createdDate}</td>
            <td><i class="fa fa-${progressTxt}circle-o" title="Underway?" data-mode="progress" data-value="${progressVal}"></i></td>
            <td><i class="fa fa-palette" title="Choose colour" data-id="${todo_id}" data-mode="modal" data-toggle="modal" data-target="#palette-modal"></i></td>
            <td><i class="fa fa-clone" title="Copy todo" onclick="copyText(${todo_id})"></i></td>
            <td><i class="fa fa-trash" title="Delete" data-mode="delete" data-value="0"></i></td>
            <td><i class="fa fa-check" title="Complete" data-mode="complete" data-value="1"></i></td>
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
        const colour = todos[i].colour;
        // create row
        row += `
        <tr class="pc${colour}">
            <td class="todo-td">
                <div class="todo-td" id="todo-text${todo_id}"><s>${todo}</s></div>
            </td>
            <td>${todo_createdDate}</td>
            <td>${todo_completedDate}</td>
            <td><i class="fa fa-archive" title="Archive" onclick="update(${todo_id},'complete',3)"></i></td>
            <td><i class="fa fa-undo" title="Incomplete" onclick="update(${todo_id},'complete',0)"></i></td>
        </tr>`;
        table.innerHTML = (row);
    }
}
