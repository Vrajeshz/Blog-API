const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const User = require('../models/userModel');
const Blog = require('../models/blogModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'productin') cookieOption.secure = true;
  res.cookie('jwt', token, cookieOption);

  // Remove the password form the output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'succuss',
    token,
    data: {
      user,
    },
  });
};

exports.singup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) check if email and password exits
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if user exits && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError('Incorrect Email or Password', 401));

  // 3) If everything is ok, send token to client
  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  // 1) Get token from header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // decoded = { id: 'userid', iat: 1712345678, exp: 1712432078 }

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token no longer exists.', 401)
    );
  }

  // 4) Grant access to protected route
  req.user = currentUser; // attach user to request
  next();
});

exports.getAllBlogs = catchAsync(async (req, res, next) => {
  const blogs = await Blog.find().populate('author', 'name email');

  res.status(200).json({
    status: 'success',
    results: blogs.length,
    data: blogs.map((blog) => ({
      title: blog.title,
      content: blog.content,
      author: blog.author.name,
      email: blog.author.email,
    })),
  });
});

exports.createBlog = catchAsync(async (req, res, next) => {
  const newblog = await Blog.create({
    title: req.body.title,
    content: req.body.content,
    author: req.user._id,
  });

  res.status(201).json({
    status: 'success',
    message: {
      newblog: newblog,
    },
  });
});

exports.updateBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog)
    return next(new AppError('Invalid ID Please Enter Valid ID.', 404));

  if (blog.author._id.toString() !== req.user.id) {
    return next(
      new AppError('Only Author or Admin can Modify this Blog!!', 403)
    );
  }

  blog.title = req.body.title;
  blog.content = req.body.content;
  await blog.save();

  res.status(200).json({
    status: 'Success',
    message: blog,
    currentUserId: req.user.id,
  });
});

exports.deleteBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog)
    return next(new AppError('Invalid ID Please Enter Valid ID.', 404));

  if (blog.author._id.toString() !== req.user.id) {
    return next(
      new AppError('Only Author or Admin can Delete this Blog!!', 403)
    );
  }
  await Blog.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
