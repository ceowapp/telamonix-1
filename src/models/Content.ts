import mongoose from 'mongoose';

const ContentSchema = new mongoose.Schema({
  title: String,
  slug: {
    type: String,
  },
  contentType: {
    type: String,
    required: true,
  },
  pageId: {
    type: String,
    required: true,
  },
  sectionId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['drafted', 'published', 'archived'],
    default: 'drafted',
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  order: {
    type: Number,
    default: 0,
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
  strict: false,
});

ContentSchema.index({ pageId: 1, sectionId: 1, order: 1 });

export default mongoose.models.Content || mongoose.model('Content', ContentSchema);