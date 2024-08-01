import { collection, getDocs, query, where } from "firebase/firestore";
import bcrypt from "bcryptjs";
import { db } from "../../firebaseConfig";

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

      const isMatch = await bcrypt.compare(password, userData.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Contraseña incorrecta." });
      }

      res.status(200).json({ message: "Inicio de sesión exitoso.", user: userData });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
