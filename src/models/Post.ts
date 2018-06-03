import { model, Schema } from 'mongoose';

// tslint:disable object-literal-sort-keys
const PostSchema: Schema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    required: true
  },
  content: {
    type: String,
    default: '',
    required: true
  },
  featuredImage: {
    type: String,
    default: ''
  },
  categories: {
    type: Array,
    default: []
  },
  likes: {
    type: Number,
    default: 0
  }
});

export default model('Post', PostSchema);