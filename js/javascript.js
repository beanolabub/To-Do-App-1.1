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
        // create row
        row += `
        <tr>
            <td>${todo}</td>
            <td>${todo_createdDate}</td>
            <td><i class="fa fa-trash" onclick="deleteTodo(${todo_id})"></i></td>
            <td><i class="fa fa-check" onclick="completeTodo(${todo_id})"></i></td>
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
            <td><i class="fa fa-trash" onclick="deleteTodo(${todo_id})"></i></td>
            <td><i class="fa fa-check" onclick="completeTodo(${todo_id})"></i></td>
        </tr>`;
        table.innerHTML = (row);

        // var row = document.createElement('tr');
        // // create elements
        // var completed_cell1 = document.createElement('td');
        // var completed_cell2 = document.createElement('td');
        // var completed_cell3 = document.createElement('td');
        // var completed_cell4 = document.createElement('td');
        // var completed_cell5 = document.createElement('td');
        // // incomplete icon
        // const incomplete = '<i class="fa fa-undo" onclick="incompleteTodo(' + todo_id +')"></i>';
        // const archive = '<i class="fa fa-archive"></i>';
        // // innerHTML
        // completed_cell1.innerHTML = todo;
        // completed_cell2.innerHTML = todo_completedDate;        
        // completed_cell3.innerHTML = todo_createdDate;  
        // completed_cell4.innerHTML = incomplete;
        // completed_cell5.innerHTML = archive;
        // // append
        // row.append(completed_cell1);
        // row.append(completed_cell3);
        // row.append(completed_cell2);
        // row.append(completed_cell4);
        // row.append(completed_cell5);
        // table.append(row);

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
    var date = new Date(date);
    const fullYear = date.getFullYear();
    var year = fullYear.toString().substr(-2);
    d = date.getDate() + "/" +date.getMonth() + "/"+year;
    return date = d;
}

