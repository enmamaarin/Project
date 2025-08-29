const express = require("express");
const router = express.Router(); //connecting to routers (separated to the main server)

router.use(logger);
// next of the http method should be ("", (req, res, next)) //same as app that can use .get .post .put .delete .patch etc. any http method
router.get("/", (req, res) => {
  console.log(req.query.name); // to get queries
  res.send("Users list");
});

// router is nested so the first thing should be always users
// always put static routes on top so it wont get confused if you call the root route
router.get("/new", (req, res) => {
  res.render("users/new", { firstName: "Test" });
});

//create new user using post
router.post("/", (req, res) => {
  const isValid = true;
  if (isValid) {
    users.push({ firstName: req.body.firstName }); //to get firstname if true or valid
    res.redirect(`/users/${users.length - 1}`);
  } else {
    console.log("error");
    res.render("users/new", { firstName: req.body.firstName });
    //to print out the entered user when it became error
  }
  // it will output an error because express
  // wont let you access it directly and it needs a middleware
  // res.send("Hi");
});

//new method for crud for easy use for one path
router
  .route("/:id")
  .get((req, res) => {
    console.log(req.user);
    res.send(`Get user with id ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`Update user with this id ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`Delete user with this id ${req.params.id}`);
  });

//it runs anytime u pass a matched name
//params is also a type of middle where it wont stop loading unless you are setting the next.

const users = [{ name: "Kyle" }, { name: "Sally" }];
router.param("id", (req, res, next, id) => {
  req.user = users[id];
  next(); //runs the next middleware (get req res)
});

// //making it manually
// //making this dynamically determined by the url(parameter)
// router.get("/:id", (req, res) => {
//   req.params.id; //to call the get ID that is declared to make it dynamic":/id"
//   res.send(`Get user with id ${req.params.id}`); //getting the id
// });

// //updates users id
// router.put("/:id", (req, res) => {
//   req.params.id; //to call the get ID that is declared to make it dynamic":/id"
//   res.send(`Update user with this id ${req.params.id}`); //getting the id
// });

// //delete users id
// router.delete("/:id", (req, res) => {
//   req.params.id; //to call the get ID that is declared to make it dynamic":/id"
//   res.send(`Delete user with this id ${req.params.id}`); //getting the id
// });

//also a middleware request
function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}
module.exports = router;
