require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const db = require('./models');
const formSubmissionRoute = require('./route/formSubmissionRoute');
const employeeRoute = require('./route/employeeRoute');
// const notFoundMiddleware = require('./middleware/notFoundMiddleware');
// const errorHandlerMiddleware = require('./middleware/errorHandlerMiddleware');

const allowedOrigins = [
  'http://localhost:5173',
  'http://192.168.29.114:5173',
  'http://localhost:5174',
  'http://192.168.29.114:5174',
];

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use('/api/forms', formSubmissionRoute);
app.use('/api/employees', employeeRoute);


const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://<your-local-ip>:${PORT}`);
});
