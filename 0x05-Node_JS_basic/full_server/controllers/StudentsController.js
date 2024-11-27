import { readDatabase } from '../utils.js';

class StudentsController {
  static async getAllStudents(req, res) {
    const database = process.argv[2];

    try {
      const students = await readDatabase(database);
      let responseText = 'This is the list of our students\n';
      const fields = Object.keys(students).sort((a, b) =>
        a.localeCompare(b, undefined, { sensitivity: 'base' })
      );

      for (const field of fields) {
        responseText += `Number of students in ${field}: ${
          students[field].length
        }. List: ${students[field].join(', ')}\n`;
      }

      res.status(200).send(responseText.trim());
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getAllStudentsByMajor(req, res) {
    const database = process.argv[2];
    const { major } = req.params;

    if (!['CS', 'SWE'].includes(major)) {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    try {
      const students = await readDatabase(database);
      const fieldStudents = students[major] || [];
      res.status(200).send(`List: ${fieldStudents.join(', ')}`);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

export default StudentsController;
