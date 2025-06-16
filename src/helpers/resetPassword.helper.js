import { transport } from "./sendEmail.helper.js";
import jwt from "jsonwebtoken";




const resetPasswordEmail = async (resetToken) => {

  let email;

  try {
    const payload = jwt.verify(resetToken, process.env.SECRET);
    email= payload.email;
  
      } catch (err) {
        return alert("Token inválido o expirado");
      }

  await transport.sendMail({
    from: `EQUIPO CODER <${process.env.GOOGLE_EMAIL}>`,
    to: email,
    subject: "ENLACE DE RESETEO DE CONTRASEÑA",
    html: `
      <section>
        <h1>ENLACE DE RESETEO DE CONTRASEÑA</h1>
        <h3>Ingrese aqui para poder restaurar su clave:</h3>
        <br>
        <a href="${process.env.URL}/reset/${resetToken}">VERIFICAR</a>
      </section>
    `,
  });

 

};
export default resetPasswordEmail;
