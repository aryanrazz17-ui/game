const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const path = require('path');
require('dotenv').config({ path: __dirname + '/.env' });

const config = require('./config');
const logger = require('./shared/utils/logger');
const { errorHandler, notFoundHandler } = require('./shared/middleware/errorHandler');
const initController = require('./controllers/initController');

const app = express();
const server = http.Server(app);

// CORS Configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '10mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get('user-agent')
  });
  next();
});

// Static files
app.use(express.static('client'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Database connection
const models = require('./models/index');
models.mongoose.connect(config.DB)
    .then(() => {
        logger.info('MongoDB connected successfully');
        initController.initTatumBTC();
        initController.initTatumETH();
        initController.initTatumTRX();
        initController.initTatumBSC();
    })
    .catch((err) => {
        logger.error('MongoDB connection error', { error: err.message });
        process.exit(1);
    });

// API Routes
app.use('/api', require('./middleware/index'), require('./routes/index'));

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Casino Games API',
        version: '1.0.0',
        status: 'running'
    });
});

// 404 Handler
app.use(notFoundHandler);

// Error Handler (must be last)
app.use(errorHandler);

// Start server
server.listen(config.SERVER_PORT, () => {
    logger.info(`Server started on port ${config.SERVER_PORT}`, {
        environment: process.env.NODE_ENV || 'development',
        port: config.SERVER_PORT
    });
});

// Graceful shutdown
process.on('SIGTERM', () => {
    logger.info('SIGTERM received, shutting down gracefully');
    server.close(() => {
        logger.info('Server closed');
        models.mongoose.connection.close(false, () => {
            logger.info('MongoDB connection closed');
            process.exit(0);
        });
    });
});