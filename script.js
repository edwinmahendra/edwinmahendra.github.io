// script.js
function searchData() {
    var tanggalPencatatan = document.getElementById('tanggalPencatatan').value;
    var namaBalita = document.getElementById('namaBalita').value;

    // Format the date to match the format used in your Google Script
    var formattedDate = new Date(tanggalPencatatan).toLocaleDateString('en-US');

    // Prepare the data to send to doPost
    var requestData = {
        'tanggalPencatatan': formattedDate,
        'namaBalita': namaBalita
    };

    // Make a POST request to the Google Apps Script Web App
    fetch('https://script.google.com/macros/s/AKfycbyxUYUl1dkT9Tzw7FUUSp8n8RCzz1glAV-NZMFK4yskJHdE_qtkyeCpgMLdQnGjdB6u/exec', {
        method: 'POST',
        body: JSON.stringify(requestData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Call a function to update the table with the response data
        updateTable(data);
    })
    .catch(error => console.error('Error:', error));
}

function updateTable(data) {
    var table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    table.innerHTML = ''; // Clear the table body

    // Loop over each row of data and append a row to the table
    data.forEach(function(row) {
        var tr = document.createElement('tr');
        row.forEach(function(cell) {
            var td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });
}