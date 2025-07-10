import express from 'express';
import {
  getUsers,
  getUserDetail,
  createUser,
  updateUser,
  changePassword,
  deleteUser,
  loginUser,
  recuperarContrasena
} from '../controllers/UsuarioController.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserDetail);
router.post('/', createUser);
router.put('/:id', updateUser);
router.put('/:id/cambiar-contrasena', changePassword);
router.delete('/:id', deleteUser);
router.post('/login', loginUser);
router.post('/recuperar-contrasena', recuperarContrasena);

export default router;
