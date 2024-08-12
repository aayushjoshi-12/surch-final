require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connection = require('./db');
const chatRouter = require('./Routes/main')

const app = express();
const port = process.env.PORT || 3000;

try{
    connection();
}
catch(e){
    console.log('Database not connected', e);
};

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods: ["POST", "GET"],
    credentials: true
}));

// Middleware
app.use(express.json());
app.use(helmet());

app.use('/chat', chatRouter);

app.listen(port,() => {
    console.log(`server running on port ${port} `);
})