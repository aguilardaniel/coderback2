import usersService from "../services/users.service.js";
import { verifyToken } from "../helpers/token.util.js";
import { compareHash, createHash } from "../helpers/hash.util.js";
import resetPasswordEmail from "../helpers/resetPassword.helper.js";
import jwt from "jsonwebtoken";

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
    const resetToken = jwt.sign({email}, process.env.SECRET, { expiresIn: "1h" });
    await resetPasswordEmail(resetToken);
    res.json200( "Email sended" );
  };
  resetCb = async (req, res) => {
    const { resetToken, newPass } = req.params;

    try {
    const payload = jwt.verify(resetToken, process.env.SECRET);
    const email= payload.email;
    const user = await this.service.readBy({ email});
    
    if (!user) {
      res.json404();
    }
    /* const hashedNewPassword = createHash(newPass); */
    //if(hashedNewPassword == user.password ){
    if(compareHash(newPass, user.password)){
      return res.json401("Password already used");
    }
    await this.service.updateById(user._id, { hashedNewPassword });
    res.json200( "Password changed" );

    } catch (err) {
      res.status(401).send("Token inválido o expirado");
    }

    
  };
}

const authController = new AuthController();
export default authController;
