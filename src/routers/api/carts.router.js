import RouterHelper from "../../helpers/router.helper.js";
import cartsController from "../../controllers/carts.controller.js";

class CartsRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }
  init = () => {

    this.create("/", ["USER"], cartsController.createOne);
    this.read("/", ["ADMIN"], cartsController.readAll);
    this.read("/:id", ["USER", "ADMIN"], cartsController.readById);
    this.update("/:id", ["USER"], cartsController.updateById);
    this.destroy("/:id", ["USER"], cartsController.destroyById);

  };
}

const cartsRouter = new CartsRouter().getRouter();
export default cartsRouter;
