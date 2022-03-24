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
    let table = document.getElementById('todo_table');
    for (var i in todos ) {
        const todo_id = todos[i].todo_id;
        const todo = todos[i].TODO;
        const todo_createdDate = formatDates(todos[i].DATE_CREATED);
        var row = document.createElement('tr');
        var todo_cell = document.createElement('td');
        var todo_cell2 = document.createElement('td');
        var todo_cell3 = document.createElement('td');
        var todo_trash = document.createElement('i');
        var todo_button = document.createElement('i');
        var todo_trashButton = document.createElement('button');
        todo_trash.classList.add('fa');   
        todo_trash.classList.add('fa-trash');  
        todo_button.classList.add('fa');   
        todo_button.classList.add('fa-check');  
        todo_button.setAttribute('onclick', 'completeTodo(' + todo_id +')');
        todo_button.setAttribute('onMouseover', 'Click to mark as done.');
        todo_cell.innerHTML = todo;        
        todo_trash.setAttribute('onclick', 'deleteTodo(' + todo_id +')');
        todo_trashButton.setAttribute('onclick', 'deleteTodo(' + todo_id +')');
        todo_trashButton.setAttribute('onMouseover', 'Delete task');
        todo_cell.append(todo_button);
        todo_cell2.innerHTML = todo_createdDate;  
        todo_cell3.append(todo_trash);
        row.append(todo_cell);
        row.append(todo_cell2);
        row.append(todo_cell3);
        table.append(row);

    }
}

function printCompleted(todos) {
    var table = document.getElementById('completed_table');
    for (var i in todos ) {
        // data
        const todo_id = todos[i].todo_id;
        const todo = todos[i].TODO;
        const todo_createdDate = formatDates(todos[i].DATE_CREATED);
        const todo_completedDate = formatDates(todos[i].DATE_COMPLETE);
        var row = document.createElement('tr');
        // tds
        var completed_cell1 = document.createElement('td');
        var completed_cell2 = document.createElement('td');
        var completed_cell3 = document.createElement('td');
        var completed_cell4 = document.createElement('td');
        // incomplete icon
        var incomplete = document.createElement('i');
        incomplete.classList.add('fa');
        incomplete.classList.add('fa-circle-xmark');
        incomplete.setAttribute('onclick', 'incompleteTodo(' + todo_id +')');
        incomplete.setAttribute('onMouseover', 'Mark task incomplete');
        const incomplete2 = '<i class="fa fa-check-circle-o"></i>';
        // innerHTML
        completed_cell1.innerHTML = todo;
        completed_cell2.innerHTML = todo_completedDate;        
        completed_cell3.innerHTML = todo_createdDate;  
        completed_cell4.innerHTML = incomplete2;
        // append
        row.append(completed_cell1);
        row.append(completed_cell3);
        row.append(completed_cell2);
        row.append(completed_cell4);
        row.append(incomplete);
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

function incompleteTodo(todo_id) {
    var form = document.getElementById("incomplete_todo_form");
    form.action = form.action + todo_id;
    form.submit();
}

function formatDates(date){
    var formattedDate = date.replace(/T/, ' ').replace(/\..+/, '');
    //alert(formattedDate);

    
    var date = new Date(date);

    d=date.getDate()+
          "/"+(date.getMonth())+
          "/"+date.getFullYear();


    return date = d;
    
}

