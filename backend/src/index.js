const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const moment = require('moment');
const morgan = require('morgan');

const { connectDB } = require('./db');
const adminRoutes = require('./routes/admin.routes');
const userRoutes = require('./routes/user.routes');
const quizRoutes = require('./routes/quiz.routes');
const { autoAdminCreateController } = require('./controllers/admin.controller');
const { urlNotFound } = require('./utils/middleware/urlNotFoundHandler');

// Initialize Express app
const app = express();

const PORT = process.env.PORT || 5000;

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

morgan.token('date-list', () => {
    return moment().utcOffset(330).format("YYYY-MM-DD HH:mm:ss");
});

const logFormat = "Method::method, Route::url, Status-code::status, Request-time:[:date-list] Res::res[content-length] - Response-time::response-time ms";

// Use morgan logger for logging HTTP request with customized format
app.use(morgan(logFormat));

app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/quizzes', quizRoutes);

// Not found handler middleware
app.use(urlNotFound);

app.listen(PORT, () => {
    autoAdminCreateController();
    console.log(`Server is running on port ${PORT}`);
});