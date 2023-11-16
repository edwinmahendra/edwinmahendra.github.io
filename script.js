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
  const proxyUrl = "https://cors-anywhere.herokuapp.com/"; // Example of a CORS proxy
  const targetUrl =
    "https://script.google.com/macros/s/AKfycbxpDKIANQ9SOGe8jO4V-XkPZ8_678VFdaUo0Rsm2eHx7BLRRWdQlm2QR4GyZHG_0wcN/exec";

  fetch(proxyUrl + targetUrl, {
    method: "POST",
    body: JSON.stringify(requestData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.text()) // Convert the response to text
    .then((text) => {
      console.log("Received response:", text); // Log the text response
      return JSON.parse(text); // Attempt to parse it as JSON
    })
    .then((data) => {
      // Call a function to update the table with the response data
      updateTable(data);
    })
    .catch((error) => console.error("Error:", error));
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
