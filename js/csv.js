
function csv() {
    var request = new XMLHttpRequest();
    var requestURL = '/csv';
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        var csv = request.response;       
        printCsv(csv);

    }
}

function printCsv(todos) {
    let csv = '';
    for (var i in todos ) {
        // data
        const todo_id = todos[i].todo_id;
        const todo = todos[i].TODO;
        const todo_createdDate = formatDates(todos[i].DATE_CREATED);
        
        var csvFileData = `[  
            ['${todo_id}','${todo}', '${todo_createdDate}'];
        ]`;
        return csvFileData;
    }
}

//create CSV file data in an array  
var csvFileData = csv();  
console.log(csvFileData);
     
 //create a user-defined function to download CSV file   
 function download_csv_file() {  
   
     //define the heading for each row of the data  
     var csv = 'Todos, \n';  
       
     //merge the data with CSV  
     csvFileData.forEach(function(row) {  
             csv += row.join(',');  
             csv += "\n";  
     });  
     csv += '\n Completed Todos, \n';  
       
     //merge the data with CSV  
     csvFileData.forEach(function(row) {  
             csv += row.join(',');  
             csv += "\n";  
     });  
    
     //display the created CSV data on the web browser   
     document.write(csv);  
   
      
     var hiddenElement = document.createElement('a');  
     hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);  
     hiddenElement.target = '_blank';  
       
     //provide the name for the CSV file to be downloaded  
     hiddenElement.download = 'Famous Personalities.csv';  
     hiddenElement.click();  
 }  