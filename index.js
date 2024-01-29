const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());    
app.use(express.urlencoded({ extended: true }));

const {planRouter} = require('./router/plan.router');


app.use('/api/plans', planRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});