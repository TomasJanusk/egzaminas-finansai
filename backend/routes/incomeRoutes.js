const express = require("express");
const router = express.Router();
const incomeController = require("./../controllers/incomeController");
const authController = require("../controllers/authController");


router.use(authController.protect);

router
  .route("/")
  .get(authController.restrictTo("user"), incomeController.getAllIncomes)
  .post(incomeController.createIncome);

router
  .route("/:id")
  .get(incomeController.getIncomeById)
  .patch(incomeController.updateIncome)
  .delete(incomeController.deleteIncome);



module.exports = router;