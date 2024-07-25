import { db } from "../../src/firebaseConfig";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      email,
      password,
      name,
      lastName,
      address,
      city,
      phoneNumber
    } = req.body;

    try {
      const q = query(collection(db, "clients"), where("email", "==", email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        return res.status(400).json({ message: "El usuario ya existe" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await addDoc(collection(db, "clients"), {
        email,
        password: hashedPassword,
        name,
        lastName,
        address,
        city,
        phoneNumber
      });

      res.status(201).json({ message: "Usuario registrado exitosamente." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
