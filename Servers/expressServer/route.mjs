import express from 'express';
import { getPosts, createPost, updatePost, deletePost, getPostById } from './controller.mjs';
const router = express.Router();

router.get('/:id', getPostById);
router.get('/', getPosts);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;
