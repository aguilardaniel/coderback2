import RouterHelper from "../../helpers/router.helper.js";
import productsController from "../../controllers/products.controller.js";

class ProductsRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
    //this.controller = productsController;
  }
  init = () => {
    this.create("/", ["ADMIN"], productsController.createOne);
    this.read("/", ["PUBLIC", "ADMIN", "USER"], productsController.readAll);
    this.read("/:id", ["PUBLIC", "ADMIN", "USER"], productsController.readById);
    this.update("/:id", ["ADMIN"], productsController.updateById);
    this.destroy("/:id", ["ADMIN"], productsController.destroyById);
  };
}

const productsRouter = new ProductsRouter().getRouter();
export default productsRouter;
