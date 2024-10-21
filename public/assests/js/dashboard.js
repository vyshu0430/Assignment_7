function registerUser() {
    // Get form values
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;

    // Create a new row for the table
    var table = document.getElementById('userTable').getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();

    // Insert cells and add values to the new row
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);

    cell1.textContent = username;
    cell2.textContent = email;

    // Clear the form after submission
    document.getElementById('registration-form').reset();
}