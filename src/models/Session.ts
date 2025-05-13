import mongoose, { Schema } from 'mongoose';

const SessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sessionToken: {
      type: String,
      unique: true,
      required: true,
    },
    accessToken: {
      type: String,
      unique: true,
    },
    refreshToken: {
      type: String,
    },
    expires: {
      type: Date,
      required: true,
    },
    lastActive: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

SessionSchema.index({ userId: 1 });
SessionSchema.index({ expires: 1 }, { expireAfterSeconds: 0 });

const Session = mongoose.models.Session || mongoose.model('Session', SessionSchema);

export default Session;