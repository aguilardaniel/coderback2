import { transport } from "./sendEmail.helper.js";

const resetPasswordEmail = async (email) => {
  await transport.sendMail({
    from: `EQUIPO CODER <${process.env.GOOGLE_EMAIL}>`,
    to: email,
    subject: "ENLACE DE RESETEO DE CONTRASEÑA",
    html: `
      <section>
        <h1>ENLACE DE RESETEO DE CONTRASEÑA</h1>
        <h3>Ingrese aqui para poder restaurar su clave:</h3>
        <br>
        <a href="${process.env.URL}/reset/${email}">VERIFICAR</a>
      </section>
    `,
  });
};
export default resetPasswordEmail;
