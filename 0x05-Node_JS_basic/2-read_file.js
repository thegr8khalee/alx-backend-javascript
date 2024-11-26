// const fs = require('fs');
// const csvtojson = require('csvtojson'); // Corrected the typo here

// const countStudents = async (path) => {
//   try {
//     if (!fs.existsSync(path)) {
//       throw new Error('Cannot load the database');
//     }
//     if (!fs.statSync(path).isFile()) {
//       throw new Error('Cannot load the database');
//     }
//     // Convert CSV to JSON using csvtojson
//     const students = await csvtojson().fromFile(path);

//     if (students.length === 0) {
//       throw new Error('Cannot load the database');
//     }

//     const totalStudents = students.length;
//     console.log(`Number of students: ${totalStudents}`);
//     const fieldCount = {};

//     // Loop through each student and categorize them by field
//     students.forEach((student) => {
//       const { field, firstname } = student;

//       if (field) {
//         if (!fieldCount[field]) {
//           fieldCount[field] = [];
//         }
//         fieldCount[field].push(firstname);
//       }
//     });

//     // Log the number of students in each field
//     for (const field in fieldCount) {
//       console.log(
//         `Number of students in ${field}: ${
//           fieldCount[field].length
//         }. List: ${fieldCount[field].join(', ')}`
//       );
//     }
//   } catch (error) {
//     console.error(error.message);
//   }
// };

// module.exports = countStudents;

const fs = require('fs');

/**
 * Counts the students in a CSV data file.
 * @param {String} dataPath The path to the CSV data file.
 * @author Bezaleel Olakunori <https://github.com/B3zaleel>
 */
const countStudents = (dataPath) => {
  if (!fs.existsSync(dataPath)) {
    throw new Error('Cannot load the database');
  }
  if (!fs.statSync(dataPath).isFile()) {
    throw new Error('Cannot load the database');
  }
  const fileLines = fs
    .readFileSync(dataPath, 'utf-8')
    .toString('utf-8')
    .trim()
    .split('\n');
  const studentGroups = {};
  const dbFieldNames = fileLines[0].split(',');
  const studentPropNames = dbFieldNames.slice(0, dbFieldNames.length - 1);

  for (const line of fileLines.slice(1)) {
    const studentRecord = line.split(',');
    const studentPropValues = studentRecord.slice(0, studentRecord.length - 1);
    const field = studentRecord[studentRecord.length - 1];
    if (!Object.keys(studentGroups).includes(field)) {
      studentGroups[field] = [];
    }
    const studentEntries = studentPropNames.map((propName, idx) => [
      propName,
      studentPropValues[idx],
    ]);
    studentGroups[field].push(Object.fromEntries(studentEntries));
  }

  const totalStudents = Object.values(studentGroups).reduce(
    (pre, cur) => (pre || []).length + cur.length
  );
  console.log(`Number of students: ${totalStudents}`);
  for (const [field, group] of Object.entries(studentGroups)) {
    const studentNames = group.map((student) => student.firstname).join(', ');
    console.log(
      `Number of students in ${field}: ${group.length}. List: ${studentNames}`
    );
  }
};

module.exports = countStudents;
