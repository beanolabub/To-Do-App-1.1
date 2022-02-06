get_todos()
get_complete()

function get_todos() {
   var request = new XMLHttpRequest();
    var requestURL = '/get_todos';
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        var todos = request.response;       
        
        printTodos(todos);
    }
}

function get_complete() {
    var request = new XMLHttpRequest();
     var requestURL = '/complete_todos';
     request.open('GET', requestURL);
     request.responseType = 'json';
     request.send();
     request.onload = function() {
         var complete_todos = request.response;       
         
         printCompleted(complete_todos);
     }
 }

function printTodos(todos) {
    var table = document.getElementById('todo_table');
    for (var i in todos ) {
        const todo_id = todos[i].todo_id;
        const todo = todos[i].TODO;
        const todo_createdDate = formatDates(todos[i].DATE_CREATED);
        var row = document.createElement('tr');
        var todo_cell = document.createElement('td');
        var todo_button = document.createElement('button');
        var todo_cell2 = document.createElement('td');
        var todo_cell3 = document.createElement('td');
        var todo_trash = document.createElement('i');
        var todo_trashButton = document.createElement('button');
        todo_trash.classList.add('fa');        
        todo_trash.classList.add('fa-trash');  
        todo_button.setAttribute('onclick', 'completeTodo(' + todo_id +')');
        todo_button.setAttribute('onMouseover', 'Click to mark as done');
        todo_cell.innerHTML = todo + '&nbsp;<br/>';        
        todo_button.innerHTML = 'complete';
        todo_trash.setAttribute('onclick', 'deleteTodo(' + todo_id +')');
        todo_trashButton.innerHTML = 'Delete ' + todo +')';    
        todo_trashButton.setAttribute('onclick', 'deleteTodo(' + todo_id +')');
        todo_cell.append(todo_button);
        todo_cell2.innerHTML = 'Created on <b>' + todo_createdDate + '</b>';  
        todo_cell3.append(todo_trash);
        todo_cell3.append(todo_trashButton);
        row.append(todo_cell);
        row.append(todo_cell2);
        row.append(todo_cell3);
        table.append(row);

    }
}

function printCompleted(todos) {
    var table = document.getElementById('completed_table');
    for (var i in todos ) {
        const todo_id = todos[i].todo_id;
        const todo = todos[i].TODO;
        const todo_createdDate = formatDates(todos[i].DATE_CREATED);
        const todo_completedDate = formatDates(todos[i].DATE_COMPLETE);
        var row = document.createElement('tr');
        var completed_cell = document.createElement('li');
        var completed_checkbox = document.createElement('i');
        var completed_cell2 = document.createElement('td');
        var completed_cell3 = document.createElement('td');
        completed_cell.append(completed_checkbox);
        completed_cell.innerHTML =  todo;
        completed_cell2.innerHTML = 'Completed on <b>' + todo_completedDate + '</b>';        
        completed_cell3.innerHTML = 'Created on <b>' + todo_createdDate + '</b>';  
        row.append(completed_cell);
        row.append(completed_checkbox);
        row.append(completed_cell3);
        row.append(completed_cell2);
        table.append(row);

    }
}

function completeTodo(todo_id) {
    var form = document.getElementById("complete_todo_form");
    form.action = form.action + todo_id;
    form.submit();
}

function deleteTodo(todo_id) {
    var form = document.getElementById("delete_todo_form");
    form.action = form.action + todo_id;
    form.submit();
}

function formatDates(date){
    var formattedDate = date.replace(/T/, ' ').replace(/\..+/, '');
    //alert(formattedDate);
    return date = formattedDate;
}

