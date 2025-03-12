import { User } from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const passTrue = await bcrypt.compare(password, user.password);
    if (passTrue) {
      const { id, email } = user;
      const data = { id, email };

      const token = jwt.sign(data, "secreto", {
        expiresIn: 28800, // 8 hours
      });

      return res.json({
        message: `Bienvenido ${email}`,
        user: {
          token
        },
      });
    } else {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

//Obtener un usuario
export const getUser = async (req, res) => {
  try {
    const id = req.user.id;
    await loginModel.findOne({ where: { id } }).
      then((user) => {
        if (!user) {
          return res.json({ message: "El usuario con ese ID no existe" })
        } else {
          res.status(200).json(user)
        }
      })
  } catch (error) {
    res.json({ message: error.message })
  }
}

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};
//crear un nuevo usuario
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "El usuario ya existe" });

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Guardar usuario en la base de datos
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};
//actualizar usuario
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const userUpdated = await User.findByIdAndUpdate(id,
      { name, email, password },
      { new: true }
    );

    if (!userUpdated) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(userUpdated);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el usuario", error });
  }
}

// Función para eliminar un usuario por su ID
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar y eliminar el usuario por _id
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};