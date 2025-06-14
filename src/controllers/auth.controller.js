import usersService from "../services/users.service.js";
import { verifyToken } from "../helpers/token.util.js";
import { createHash } from "../helpers/hash.util.js";
import resetPasswordEmail from "../helpers/resetPassword.helper.js";

class AuthController {
  constructor() {
    this.service = usersService;
    this.usuarioActivo = "ninguno"; 
  }
  registerCb = async (req, res) => res.json201(null, "Registered");
  loginCb = async (req, res) => {
    const opts = { maxAge: 7 * 24 * 60 * 60 * 1000, signed: true };
    this.usuarioActivo = req.user.email;
    res
      .cookie("token", req.user.token, opts)
      .json200(req.user._id, "Logged in");
  };
  signoutCb = (req, res) =>{
    this.usuarioActivo = "ninguno";  
    res.clearCookie("token").json200(req.user._id, "Signed out");
  };
  onlineCb = async (req, res) => {
    const { token } = req.signedCookies;
    const dataToken = verifyToken(token);
    let user = await this.service.readById(dataToken?._id);
    if (!user) {
      return res.json401("Invalid credentials");
    }
    const { password, __v, createdAt, updatedAt, ...rest } = user;
    
    res.json200(rest);
  };
  badAuthCb = (req, res) => res.json401();
  forbiddenCb = (req, res) => res.json403();
  verifyCb = async (req, res) => {
    const { email, verifyCode } = req.params;
    const user = await this.service.readBy({ email, verifyCode });
    if (!user) {
      res.json404();
    }
    await this.service.updateById(user._id, { isVerified: true });
    res.json200({ isVerified: true });
  };
  irHastaResetCb = async (req, res) => {
    const { email } = req.params;
    const user = await this.service.readBy({ email});
    if (!user) {
      res.json404();
    }
    await resetPasswordEmail(email);
    res.json200( "Email enviado" );
  };
  resetCb = async (req, res) => {
    const { email, newPass } = req.params;
    const user = await this.service.readBy({ email});
    if (!user) {
      res.json404();
    }
    await this.service.updateById(user._id, { password: createHash(newPass) });
    res.json200( "Password changed" );
  };
}

const authController = new AuthController();
export default authController;
