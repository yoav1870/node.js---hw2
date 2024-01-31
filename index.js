const express = require('express');
const { planRouter } = require('./router/plan.router');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/plans', planRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 
