import express from "express";
const routerAdmin = express.Router();
import storeController from "./controllers/store.controller";
import productController from "./controllers/product.controller";
import makeUploader from "./libs/utils/uploader";

/** Store */
routerAdmin.get("/", storeController.goHome);
routerAdmin
  .get("/login", storeController.getLogin)
  .post("/login", storeController.processLogin);
routerAdmin
  .get("/signup", storeController.getSignup)
  .post(
    "/signup",
    makeUploader("members").single("memberImage"),
    storeController.processSignup,
  );
routerAdmin.get("/logout", storeController.logout);
routerAdmin.get("/check-me", storeController.checkAuthSession);

/** Product */
routerAdmin.get(
  "/product/all",
  storeController.verifyStore, //authorization middleware
  productController.getAllProducts,
);
routerAdmin.post(
  "/product/create",
  storeController.verifyStore, //authorization middleware (req + member)
  makeUploader("products").array("productImages", 5), //uploader middleware (req + files)
  productController.createNewProduct,
);
routerAdmin.post(
  "/product/:id",
  storeController.verifyStore,
  makeUploader("products").single("productImage"),
  productController.updateChosenProduct,
);

/** User */

routerAdmin.get(
  "/user/all",
  storeController.verifyStore,
  storeController.getUsers,
);
routerAdmin.post(
  "/user/edit",
  storeController.verifyStore,
  storeController.updateChosenUser,
);

export default routerAdmin;
