require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connection = require('./db');
const chatRouter = require('./Routes/main')

const app = express();
const port = process.env.PORT || 3000;
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];

try{
    connection();
}
catch(e){
    console.log('Database not connected', e);
};


const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ["POST", "GET"],
};

// app.use(cors(corsOptions));
// app.use(cors({
//     origin:"https://surch-final.vercel.app/",
//     methods: ["POST", "GET"]
// }));

app.use(cors("*"));

// Enable preflight requests for all routes
app.options('*', cors());

// Debugging middleware to log requests
app.use((req, res, next) => {
    console.log('Request received: ', req.method, req.url);
    next();
});

// Middleware
app.use(express.json());
app.use(helmet());

app.use('/chat', chatRouter);

app.listen(port,() => {
    console.log(`server running on port ${port} `);
})