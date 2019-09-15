import { Response, Request } from 'express';
import { only } from '../helper';
import Marker from '../models/marker.model';

export const create_marker = async (req: any, res: Response) => {
  const { label, lat, lng } = req.body;
  const marker = new Marker({ label, lat, lng });
  try {
    const data = await marker.save();

    res.json({ data });
  } catch(err) {
    if(err.name === 'ValidationError') {
      const errors = Object.keys(err.errors).map(
        field => err.errors[field].message
      );

      res.status(400).json({ errors, data: marker });
    } else {
      res.status(500).json({ message: err.message });
    }
  }
}

export const view_marker = async (req: Request, res: Response) => {
  try {
    const data = await Marker.findById(req.params.id);
    if(data) {
      res.json({ data });
    } else {
      res.status(404).json({ message: `${req.params.id} not found` });
    }
  } catch(err) {
    res.status(400).json({ message: err.message, err });
  }
}

export const search_marker = async (req: Request, res: Response) => {
  let field = req.query.field, 
    keyword = req.query.keyword,
    page = +req.query.page || 1,
    limit = +req.query.limit || 10,
    sortby = req.query.sortby || '_id',
    sort = req.query.sort || 'desc';

  let criteria = {};
  try {
    if(keyword) {
      criteria = {
        label : { $regex: keyword, $options: 'i' }
      }; 
    } else {
      criteria = {};
    }

    const data = await Marker.search({ criteria, sortby, sort, page, limit});

    res.json({ data });
  } catch(err) {
    res.status(400).json({ message: err.message });
  }
}

export const update_marker = async (req: Request, res: Response) => {
  try {
    const data = await Marker.findById(req.params.id);

    Object.assign(data, only(req.body, ['label', 'lat', 'lng']));

    if(data) {
      data.save();
      res.json({ data });
    } else {
      res.status(400).json({message: 'Unable to save data'});
    }
  } catch(err) {
    res.status(400).json({ message: err.message });
  }
}

export const delete_marker = async (req: Request, res: Response) => {
  const _id = req.params.id;
  try {
    const data = await Marker.deleteOne({ _id });
    
    res.json({message: 'Data deleted'});
  } catch(err) {
    res.status(400).json({ message: err.message });
  }
}