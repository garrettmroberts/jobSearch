const router = require("express").Router();
const userRoutes = require("./users");
const savedJobsRoutes = require("./savedJobs");

router.use("/user", userRoutes);
router.use("/savedjobs", savedJobsRoutes);

module.exports = router;