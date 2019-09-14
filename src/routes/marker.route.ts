import express from 'express';
import { basicAuth } from '../middlewares/auth';
import { search_marker, create_marker, view_marker, update_marker, delete_marker } from '../controllers/markers.controller';

const router = express.Router();

router.route('/')
  .get(search_marker)
  .post(basicAuth, create_marker);

router.route('/:id')
  .get(view_marker)
  .put(basicAuth, update_marker)
  .delete(basicAuth, delete_marker)

export default router;