import { Usuario } from '../models/Usuario.js';

export const getUsers = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

export const getUserDetail = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar usuario' });
  }
};

export const createUser = async (req, res) => {
  try {
    const { nombre, apellido, correo, pais, clinica, contrasena } = req.body;
    if (!nombre || !apellido || !correo || !pais || !clinica || !contrasena) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    const existe = await Usuario.findOne({ where: { correo } });
    if (existe) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }
    const nuevoUsuario = await Usuario.create({
      nombre,
      apellido,
      correo,
      pais,
      clinica,
      contrasena
    });
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear usuario', detalles: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    const { nombre, apellido, correo, pais } = req.body;
    await usuario.update({ nombre, apellido, correo, pais });
    res.json({ mensaje: 'Perfil actualizado', usuario });
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar usuario', detalles: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { contrasenaActual, nuevaContrasena } = req.body;
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    if (usuario.contrasena !== contrasenaActual) {
      return res.status(400).json({ error: 'La contraseña actual es incorrecta' });
    }
    await usuario.update({ contrasena: nuevaContrasena });
    res.json({ mensaje: 'Contraseña actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al cambiar la contraseña', detalles: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    await usuario.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;
    if (!correo || !contrasena) {
      return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
    }
    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    if (usuario.contrasena !== contrasena) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }
    res.json({ mensaje: 'Login exitoso', usuario });
  } catch (error) {
    res.status(500).json({ error: 'Error en el login', detalles: error.message });
  }
};

export const recuperarContrasena = async (req, res) => {
  const { correo, clinica, nuevaContrasena } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    if (usuario.clinica !== clinica) {
      return res.status(400).json({ error: 'Respuesta de seguridad incorrecta' });
    }
    await usuario.update({ contrasena: nuevaContrasena });
    res.json({ mensaje: 'Contraseña actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al recuperar contraseña', detalles: error.message });
  }
};


