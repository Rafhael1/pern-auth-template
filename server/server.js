const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

// middleware 

app.use(cors())
app.use(express.json()) // to require body

// routes
app.use('/api/auth', require('./routes/jwtAuth'))


const port = process.env.PORT || 5000;

app.listen(port, () => {
 	console.log(`Server has started on http://localhost:${port}`)
});
