// script.js
function searchData() {
  var tanggalPencatatan = document.getElementById("tanggalPencatatan").value;
  var namaBalita = document.getElementById("namaBalita").value;

  // Format the date to match the format used in your Google Script
  var formattedDate = new Date(tanggalPencatatan).toLocaleDateString("en-US");

  // Prepare the data to send to doPost
  var requestData = {
    tanggalPencatatan: formattedDate,
    namaBalita: namaBalita,
  };

  // Make a POST request to the Google Apps Script Web App
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // Example of a CORS proxy
const targetUrl = 'https://script.google.com/macros/s/AKfycbwgF4b7UTKkNfdF3Y5B3QWvHCyJgpkdb2bRB0lsh9psnvCx5f__0XQj1pFSFVVCZ4Gm/exec';

fetch(proxyUrl + targetUrl, {
    method: 'POST',
    body: JSON.stringify(requestData),
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => {
    updateTable(data);
})
.catch(error => console.error('Error:', error));

}

function updateTable(data) {
  var table = document
    .getElementById("dataTable")
    .getElementsByTagName("tbody")[0];
  table.innerHTML = ""; // Clear the table body

  // Loop over each row of data and append a row to the table
  data.forEach(function (row) {
    var tr = document.createElement("tr");
    row.forEach(function (cell) {
      var td = document.createElement("td");
      td.textContent = cell;
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });
}
