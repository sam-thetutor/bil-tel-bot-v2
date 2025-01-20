import express from 'express';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Bot is alive!');
});

let server;

export function keepAlive() {
  if (!server) {
    server = app.listen(port, () => {
      console.log("Server is ready on port", port);
    });
  }
} 