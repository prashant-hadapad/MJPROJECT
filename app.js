
// if (process.env.NODE_ENV != "production") {
//   require('dotenv').config();
// }

// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const path = require('path');
// const methodOverride = require('method-override');
// const ejsMate = require('ejs-mate');

// const ExpressError = require('./utils/ExpressError.js');
// const cors = require('cors');
// const session = require("express-session");
// const MongoStore = require("connect-mongo");
// const flash = require("connect-flash");
// const passport = require("passport");
// const LocalStrategy = require("passport-local");
// const User = require("./models/user.js");

// const port = 3000;
// //const MONGO_URL = 'mongodb://127.0.0.1:27017/wonderlust';
// const dbURL=process.env.ATLAS_URL ;


// app.engine('ejs', ejsMate);
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));


// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride('_method'));
// app.use(express.static(path.join(__dirname, 'public')));


// const listingRouter = require("./routes/listing.js");
// const reviewRouter = require("./routes/review.js");
// const userRouter = require("./routes/user.js");

// main().then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Mongo connection error:', err));
// async function main() {
//   await mongoose.connect(dbURL);
// }



// const store= MongoStore.create({
//   mongoUrl:dbURL,
//   crypto: {
//     secret: process.env.SECRET
//   },
//   touchAfter:24*60*60
// });


// store.on("error",function(e){
//   console.log("SESSION STORE ERROR",e)
// } );


// const sessionoption = {
//   store,
//   secret: process.env.SECRET, resave: false, saveUninitialized: true,
//   cookie: {
//     expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//     httpOnly: true,
//   },
// };




// app.use(session(sessionoption));
// app.use(flash());

// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// app.use((req, res, next) => {
//   res.locals.success = req.flash("success");
//   res.locals.error = req.flash("error");
//   res.locals.currUser = req.user;
//   next();
// });


// app.use("/listings", listingRouter);
// app.use("/listings/:id/reviews", reviewRouter);
// app.use("/", userRouter);


// app.use((req, res) => res.status(404).render('error', { message: 'Page not found', statusCode: 404 }));

// app.use((err, req, res, next) => {
//   console.error(err);
//   const { statusCode = 500, message = 'Something went wrong' } = err;
//   res.status(statusCode).render('error', { message, statusCode });
// });
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });




// if (process.env.NODE_ENV != "production") {
//   require('dotenv').config();
// }

// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const path = require('path');
// const methodOverride = require('method-override');
// const ejsMate = require('ejs-mate');

// const ExpressError = require('./utils/ExpressError.js');
// const cors = require('cors');
// const session = require("express-session");
// const MongoStore = require("connect-mongo");
// const flash = require("connect-flash");
// const passport = require("passport");
// const LocalStrategy = require("passport-local");
// const User = require("./models/user.js");

// // IMPORTANT FIX FOR RENDER
// const port = process.env.PORT || 3000;

// // IMPORTANT: dbURL must come from Render Environment
// const dbURL = process.env.ATLAS_URL;

// // View Engine + middlewares
// app.engine('ejs', ejsMate);
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride('_method'));
// app.use(express.static(path.join(__dirname, 'public')));

// // Mongoose connection
// async function main() {
//   await mongoose.connect(dbURL);
// }
// main().then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Mongo connection error:', err));

// // SESSION STORE (NO CHANGE except safety)
// const store = MongoStore.create({
//   mongoUrl: dbURL,
//   crypto: {
//     secret: process.env.SECRET
//   },
//   touchAfter: 24 * 60 * 60
// });

// store.on("error", function (e) {
//   console.log("SESSION STORE ERROR", e)
// });

// const sessionoption = {
//   store,
//   secret: process.env.SECRET,
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//     httpOnly: true,
//   },
// };

// app.use(session(sessionoption));
// app.use(flash());

// // Passport
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// // Flash + Current User
// app.use((req, res, next) => {
//   res.locals.success = req.flash("success");
//   res.locals.error = req.flash("error");
//   res.locals.currUser = req.user;
//   next();
// });

// // Routers
// const listingRouter = require("./routes/listing.js");
// const reviewRouter = require("./routes/review.js");
// const userRouter = require("./routes/user.js");

// app.use("/listings", listingRouter);
// app.use("/listings/:id/reviews", reviewRouter);
// app.use("/", userRouter);

// // ERROR HANDLERS
// app.use((req, res) => res.status(404).render('error', { message: 'Page not found', statusCode: 404 }));

// app.use((err, req, res, next) => {
//   console.error(err);
//   const { statusCode = 500, message = 'Something went wrong' } = err;
//   res.status(statusCode).render('error', { message, statusCode });
// });

// // IMPORTANT: FIXED FOR RENDER
// app.listen(port, () => {
//   console.log(`Server running at port ${port}`);
// });




if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const ExpressError = require("./utils/ExpressError.js");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

// PORT for Render
const port = process.env.PORT || 3000;

// Database URL
const dbURL = process.env.ATLAS_URL;

// ====== View Engine + Middlewares ======
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// ====== Connect MongoDB + Setup Session AFTER CONNECT ======
async function main() {
  await mongoose.connect(dbURL);
  console.log("Connected to MongoDB");

  // ---------- FIX: Session Store must be created AFTER connection ----------
  const store = MongoStore.create({
    mongoUrl: dbURL,
    crypto: {
      secret: process.env.SECRET,
    },
    touchAfter: 24 * 60 * 60, // reduce session writes
  });

  store.on("error", (e) => {
    console.log("SESSION STORE ERROR", e);
  });

  const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
  };

  app.use(session(sessionOptions));
  app.use(flash());

  // ====== Passport Setup ======
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  // Flash + Current User
  app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
  });

  // ====== Routers ======
  const listingRouter = require("./routes/listing.js");
  const reviewRouter = require("./routes/review.js");
  const userRouter = require("./routes/user.js");

  app.use("/listings", listingRouter);
  app.use("/listings/:id/reviews", reviewRouter);
  app.use("/", userRouter);

  // ====== 404 Error ======
  app.use((req, res) =>
    res.status(404).render("error", {
      statusCode: 404,
      message: "Page not found",
    })
  );

  // ====== Error Handler ======
  app.use((err, req, res, next) => {
    console.error(err);
    const { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error", { statusCode, message });
  });

  // ====== Start Server ======
  app.listen(port, () => {
    console.log(`Server running at port ${port}`);
  });
}

// Start App
main().catch((err) => console.error("Mongo connection error:", err));
