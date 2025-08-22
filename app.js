const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
// const mongoSanitize = require("express-mongo-sanitize");
// const xss = require("xss-clean");
const hpp = require('hpp');

const blogRouter = require('./routes/blogRouter');
const globalErrorHandler = require('./controller/errorController');
const AppError = require('./utils/appError'); // make sure this is imported

const app = express();

// 1) Set security HTTP headers
app.use(helmet());

// 2) Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// 3) Limit requests from same IP
const limiter = rateLimit({
  max: 50,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// 4) Body parser, reading data into req.body
app.use(express.json({ limit: '10kb' }));

// // 5) Data sanitization against NoSQL query injection
// app.use(
//   mongoSanitize({
//     replaceWith: "_", // avoids reassigning req.query
//   })
// );

// // 6) Data sanitization against XSS
// // app.use(xss());

// 7) Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingQuantity',
      'ratingAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

// 8) Routes
app.use('/api/v1/blog', blogRouter);

// 9) Handle unhandled routes (works with Express 5)
app.all(/.*/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// 10) Global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
