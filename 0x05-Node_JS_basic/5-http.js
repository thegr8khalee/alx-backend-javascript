// const http = require('http');
// const fs = require('fs');
// const countStudents = require('./2-read_file'); // Assuming countStudents is still your function

// // Create an HTTP server
// const server = http.createServer(async (req, res) => {
//   if (req.method === 'GET' && req.url === '/') {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.write('Hello Holberton School!');
//     res.end();
//   } else if (req.method === 'GET' && req.url === '/students') {
//     try {
//       // Call countStudents to read the CSV file and return the result
//       const result = await countStudents('database.csv');
//       res.writeHead(200, { 'Content-Type': 'text/plain' });
//       res.write(result); // Write the result of countStudents
//       res.end(); // End the response
//     } catch (error) {
//       // Handle any error, e.g., file not found
//       res.writeHead(500, { 'Content-Type': 'text/plain' });
//       res.write('Cannot load the database');
//       res.end();
//     }
//   } else {
//     // Handle other routes or invalid ones
//     res.writeHead(404, { 'Content-Type': 'text/plain' });
//     res.write('Not Found');
//     res.end();
//   }
// });

// // Start the server
// server.listen(1245, () => {});

const http = require('http');
const fs = require('fs');

const PORT = 1245;
const HOST = 'localhost';
const app = http.createServer();
const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';

/**
 * Counts the students in a CSV data file.
 * @param {String} dataPath The path to the CSV data file.
 */
const countStudents = (dataPath) =>
  new Promise((resolve, reject) => {
    if (!dataPath) {
      reject(new Error('Cannot load the database'));
    }
    if (dataPath) {
      fs.readFile(dataPath, (err, data) => {
        if (err) {
          reject(new Error('Cannot load the database'));
        }
        if (data) {
          const reportParts = [];
          const fileLines = data.toString('utf-8').trim().split('\n');
          const studentGroups = {};
          const dbFieldNames = fileLines[0].split(',');
          const studentPropNames = dbFieldNames.slice(
            0,
            dbFieldNames.length - 1
          );

          for (const line of fileLines.slice(1)) {
            const studentRecord = line.split(',');
            const studentPropValues = studentRecord.slice(
              0,
              studentRecord.length - 1
            );
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
          reportParts.push(`Number of students: ${totalStudents}`);
          for (const [field, group] of Object.entries(studentGroups)) {
            reportParts.push(
              [
                `Number of students in ${field}: ${group.length}.`,
                'List:',
                group.map((student) => student.firstname).join(', '),
              ].join(' ')
            );
          }
          resolve(reportParts.join('\n'));
        }
      });
    }
  });

const SERVER_ROUTE_HANDLERS = [
  {
    route: '/',
    handler(_, res) {
      const responseText = 'Hello Holberton School!';

      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', responseText.length);
      res.statusCode = 200;
      res.write(Buffer.from(responseText));
    },
  },
  {
    route: '/students',
    handler(_, res) {
      const responseParts = ['This is the list of our students'];

      countStudents(DB_FILE)
        .then((report) => {
          responseParts.push(report);
          const responseText = responseParts.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', responseText.length);
          res.statusCode = 200;
          res.write(Buffer.from(responseText));
        })
        .catch((err) => {
          responseParts.push(
            err instanceof Error ? err.message : err.toString()
          );
          const responseText = responseParts.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', responseText.length);
          res.statusCode = 200;
          res.write(Buffer.from(responseText));
        });
    },
  },
];

app.on('request', (req, res) => {
  for (const routeHandler of SERVER_ROUTE_HANDLERS) {
    if (routeHandler.route === req.url) {
      routeHandler.handler(req, res);
      break;
    }
  }
});

app.listen(PORT, HOST, () => {
  process.stdout.write(`Server listening at -> http://${HOST}:${PORT}\n`);
});

module.exports = app;
