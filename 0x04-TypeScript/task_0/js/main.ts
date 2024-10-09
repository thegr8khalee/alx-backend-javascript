// Step 1: Define the Student interface
interface Student {
    firstName: string;
    lastName: string;
    age: number;
    location: string;
  }
  
  // Step 2: Create two students
  const stu: Student = {
    firstName: "John",
    lastName: "Doe",
    age: 10,
    location: "San Francisco",
  };
  
  const stu1: Student = {
    firstName: "Doe",
    lastName: "John",
    age: 11,
    location: "California",
  };
  
  // Step 3: Create an array named studentsList
  const studentsList: Array<Student> = [stu, stu1];
  
  // Step 4: Render a table using vanilla JavaScript
  function renderTable(): void {
    // Create table element
    const table = document.createElement('table');
    table.border = "1"; // Adds a border for visibility
  
    const tableHeader = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    // Create and append the header row with "First Name" and "Location"
    const firstNameHeader = document.createElement('th');
    firstNameHeader.textContent = 'First Name';
    const locationHeader = document.createElement('th');
    locationHeader.textContent = 'Location';
  
    headerRow.appendChild(firstNameHeader);
    headerRow.appendChild(locationHeader);
    tableHeader.appendChild(headerRow);
    table.appendChild(tableHeader);
  
    // Create table body and append rows for each student
    const tableBody = document.createElement('tbody');
    studentsList.forEach((student) => {
      const row = document.createElement('tr');
  
      const firstNameCell = document.createElement('td');
      firstNameCell.textContent = student.firstName;
  
      const locationCell = document.createElement('td');
      locationCell.textContent = student.location;
  
      row.appendChild(firstNameCell);
      row.appendChild(locationCell);
  
      tableBody.appendChild(row);
    });
  
    table.appendChild(tableBody);
  
    // Append the table to the body of the document
    document.body.appendChild(table);
  }
  
  // Call the renderTable function to create the table when the script runs
  renderTable();
  