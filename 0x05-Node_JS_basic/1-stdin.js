process.stdin.resume();
process.stdin.setEncoding('utf-8');

process.stdout.write('Welcome to holberton School, what is your name?\n');

process.stdin.on('data', (data) => {
  const name = data.trim();
  process.stdout.write('Your name is: ${name}\n');
  process.stdout.write('This important software is now closing\n');
  process.exit();
});
