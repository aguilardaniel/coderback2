import RouterHelper from "../helpers/router.helper.js";
//import { productsManager } from "../dao/factory.js";
import productsRepository from "../repositories/products.repository.js";
import authController from "../controllers/auth.controller.js";





const homeViewCb = async (req, res) => {
  const products = await productsRepository.readAll();
  //console.log(document.cookie);
  let usuarioActivo="Visitante";
  if(req.signedCookies.token){
    usuarioActivo = authController.usuarioActivo;
  }
  res.status(200).render("index", { products,  usuarioActivo });
};
const productViewCb = async (req, res) => {
  const { pid } = req.params;
  const product = await productsRepository.readById(pid);
  res.status(200).render("product", { product });
};
const registerViewCb = async (req, res) => {
  const products = await productsRepository.readAll();
  res.status(200).render("register", { products });
};
const loginViewCb = async (req, res) => {
  const products = await productsRepository.readAll();
  res.status(200).render("login", { products });
};
const profileViewCb = async (req, res) => {
  const products = await productsRepository.readAll();
  res.status(200).render("profile", { products });
};
const verifyViewCb = async (req, res) => {
  const { email } = req.params
  res.status(200).render("verify", { email });
};
const resetViewCb = async (req, res) => {
  const { resetToken } = req.params;
  res.status(200).render("reset", { resetToken });
};

class ViewsRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.render("/", ["PUBLIC"], homeViewCb);
    this.render("/product/:pid", ["PUBLIC"], productViewCb);
    this.render("/register", ["PUBLIC"], registerViewCb);
    this.render("/login", ["PUBLIC"], loginViewCb);
    this.render("/profile", ["USER", "ADMIN"], profileViewCb);
    this.render("/verify/:email", ["PUBLIC"], verifyViewCb);
    this.render("/reset/:resetToken", ["PUBLIC"], resetViewCb);
  };
}

const viewsRouter = new ViewsRouter().getRouter();
export default viewsRouter;
