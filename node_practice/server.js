const express = require("express");
const app = express();

//for static webpages like html or css
app.use(express.static("public"));

// view engine to view , ejs or pug viewengines
app.set("view engine", "ejs");

//calling the function

//this can move everywhere
// //top for global use,
// top to bottom execution and can be used inside the http method
// app.get("/", logger, logger, logger (req, res) =>
// can hold functions as much as you want
app.use(logger);

//allows us to use the data(information) coming from forms
//needs also to pass a object extended boilerplate to avoid a warning
app.use(express.urlencoded({ extended: true }));

//process json information
app.use(express.json());

//request or respond
// app.get("/", (req, res) => {
//   // console.log("Hello"); //for console print
//   // res.download("server.js"); //for downloading file
//   // res.send("hi"); // sending data/message
//   // res.status(500); //sending status
//   // res.json({ message: "Error" }); //preferrable sending status

//   res.render("index", { text: "Mabuhay!" }); // render file //can insert value or data inside of the render/view engine
// });

//ROUTES
const userRouter = require("./routes/users"); //to use the routed functions
// const postRouter = require("./routes/post");

//app.use has a lot of use cases
app.use("/users", userRouter);
// app.use("/post", postRouter); //to pass this on the userRouter to the outside routes(users.js)

//also a middleware request
function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

app.listen(5500);
