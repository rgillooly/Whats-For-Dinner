const mysql = require('mysql');

// Create a MySQL connection
const connection = mysql.createConnection({
  user: 'DB_USER',
  password: 'DB_PASSWORD',
  database: 'DB_NAME',
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Function to increment a number and assign the current count as the id to a MySQL item
let incrementAndAssignCount = function () {
  // Retrieve the current count from the database
  connection.query('SELECT MAX(id) AS maxId FROM your_table', (err, results) => {
    if (err) {
      console.error('Error retrieving maxId:', err);
      return;
    }

    const currentCount = results[0].maxId || 0;

    // Increment the count
    const newCount = currentCount + 1;

    // Insert a new item with the incremented count as the id
    connection.query('INSERT INTO your_table (id, other_columns) VALUES (?, ?)', [newCount, 'other_values'], (err, result) => {
      if (err) {
        console.error('Error inserting item:', err);
        return;
      }

      console.log('Item inserted successfully with ID:', newCount);
    });
  });
}

module.exports = incrementAndAssignCount;