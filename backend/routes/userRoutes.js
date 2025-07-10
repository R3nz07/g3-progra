import express from 'express';
import {
  getUsers,
  getUserDetail,
  createUser,
  updateUser,
  changePassword,
  deleteUser,
  loginUser,
  recuperarContrasena,
  getUserAddress,
  updateUserAddress
} from '../controllers/UsuarioController.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserDetail);
router.get('/:id/direccion', getUserAddress);
router.post('/', createUser);
router.put('/:id', updateUser);
router.put('/:id/direccion', updateUserAddress);
router.put('/:id/cambiar-contrasena', changePassword);
router.delete('/:id', deleteUser);
router.post('/login', loginUser);
router.post('/recuperar-contrasena', recuperarContrasena);

export default router;
