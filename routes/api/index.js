const router = require("express").Router();
const userRoutes = require("./users");
// const jobsRoutes = require("./savedJobs");

router.use('/users', userRoutes);
// router.use("/jobs", jobsRoutes);

module.exports = router;