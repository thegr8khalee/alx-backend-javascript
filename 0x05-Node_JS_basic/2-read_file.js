const fs = require('fs');
const csvtojson = require('csvtojson'); // Corrected the typo here

const countStudents = async (path) => {
  try {
    if (!fs.existsSync(path)) {
      throw new Error('Cannot load the database');
    }
    if (!fs.statSync(path).isFile()) {
      throw new Error('Cannot load the database');
    }
    // Convert CSV to JSON using csvtojson
    const students = await csvtojson().fromFile(path);

    if (students.length === 0) {
      throw new Error('Cannot load the database');
    }

    const totalStudents = students.length;
    console.log(`Number of students: ${totalStudents}`);
    const fieldCount = {};

    // Loop through each student and categorize them by field
    students.forEach((student) => {
      const { field, firstname } = student;

      if (field) {
        if (!fieldCount[field]) {
          fieldCount[field] = [];
        }
        fieldCount[field].push(firstname);
      }
    });

    // Log the number of students in each field
    for (const field in fieldCount) {
      console.log(
        `Number of students in ${field}: ${
          fieldCount[field].length
        }. List: ${fieldCount[field].join(', ')}`
      );
    }
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = countStudents;
