const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello from DevOps Mini Project running on EKS!');
});

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
