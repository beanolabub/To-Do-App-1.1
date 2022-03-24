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
        console.log(todos);
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
        // data
        const todo_id = todos[i].todo_id;
        const todo = todos[i].TODO;
        const todo_createdDate = formatDates(todos[i].DATE_CREATED);
        // create elements\
        var row = document.createElement('tr');
        var todo_cell = document.createElement('td');
        var todo_cell1 = document.createElement('td');
        var todo_cell2 = document.createElement('td');
        var todo_cell3 = document.createElement('td');
        var todo_trashButton = document.createElement('button');
        // delete icon
        const todo_trash = '<i class="fa fa-trash" onclick="deleteTodo(' + todo_id +')"></i>';
        const todo_button = '<i class="fa fa-check" onclick="completeTodo(' + todo_id +')"></i>';
        // innerHTML
        todo_cell.innerHTML = todo;        
        todo_cell1.innerHTML = todo_button;
        todo_cell2.innerHTML = todo_createdDate; 
        todo_cell3.innerHTML = todo_trash; 
        // append
        row.append(todo_cell);
        row.append(todo_cell2);
        row.append(todo_cell1);
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
        // create elements
        var completed_cell1 = document.createElement('td');
        var completed_cell2 = document.createElement('td');
        var completed_cell3 = document.createElement('td');
        var completed_cell4 = document.createElement('td');
        var completed_cell5 = document.createElement('td');
        // incomplete icon
        const incomplete = '<i class="fa fa-undo" onclick="incompleteTodo(' + todo_id +')"></i>';
        const archive = '<i class="fa fa-archive"></i>';
        // innerHTML
        completed_cell1.innerHTML = todo;
        completed_cell2.innerHTML = todo_completedDate;        
        completed_cell3.innerHTML = todo_createdDate;  
        completed_cell4.innerHTML = incomplete;
        completed_cell5.innerHTML = archive;
        // append
        row.append(completed_cell1);
        row.append(completed_cell3);
        row.append(completed_cell2);
        row.append(completed_cell4);
        row.append(completed_cell5);
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
    const fullYear = date.getFullYear();
    // console.log(fullYear);
    var year = fullYear.toString().substr(-2);
    // console.log(year);
    d=date.getDate()+
          "/"+date.getMonth()+
          "/"+year;


    return date = d;
    
}

