// eslint-disable-next-line import/no-extraneous-dependencies
import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  phone: {
    required: true,
    type: String,
  },
});
const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
