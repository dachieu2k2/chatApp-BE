const AuthRouter = require("./AuthRouter");


const router = (app) => {

  app.use("/api/users/", AuthRouter);

}

module.exports = router;
