import mongoose, { Schema } from 'mongoose';

const AccountSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    providerAccountId: {
      type: String,
      required: true,
    },
    refresh_token: String,
    access_token: String,
    expires_at: Number,
    token_type: String,
    scope: String,
    id_token: String,
    session_state: String,
    oauth_token_secret: String,
    oauth_token: String,
  },
  {
    timestamps: true,
  }
);

AccountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true });

const Account = mongoose.models.Account || mongoose.model('Account', AccountSchema);

export default Account;