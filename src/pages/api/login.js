import { collection, getDocs, query, where } from "firebase/firestore";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // Importamos jsonwebtoken
import { db } from "../../firebaseConfig";

const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      const q = query(collection(db, "clients"), where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return res.status(400).json({ message: "Usuario no encontrado." });
      }

      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      console.log(userData.isAdmin);

      const isMatch = await bcrypt.compare(password, userData.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Contraseña incorrecta." });
      }

      // Generar el JWT
      const token = jwt.sign(
        { userId: userDoc.id, isAdmin: userData.isAdmin },
        secretKey,
        { expiresIn: "1h" } // Token válido por 1 hora
      );

      // Responder con el token y los datos del usuario
      res.status(200).json({ message: "Inicio de sesión exitoso.", token, user: userData });
    } catch (error) {
      console.error("Error during login:", error.message);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
