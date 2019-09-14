import { Schema, Document, model, Model } from 'mongoose';

export interface IMarker extends Document {
  label: string;
  lat: number;
  lng: number;
}

export interface IMarkerModel extends Model<IMarker> {
  search(options: any);
}

const MarkerSchema: Schema = new Schema({
  label: {
    type: String,
    required: 'Label is required'
  },
  lat: {
    type: Number,
    required: 'Latitude is required'
  },
  lng: {
    type: Number,
    required: 'Longitude is required'
  }
});

MarkerSchema.statics.search = function({criteria, sortby, sort, page, limit}) {
  return this.find(criteria).sort({[sortby]: sort === 'asc' ? 1 : -1}).skip((page - 1) * limit).limit(limit)
};

export default model<IMarker, IMarkerModel>('Marker', MarkerSchema);