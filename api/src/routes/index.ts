import middleware from '@blocklet/sdk/lib/middlewares';
import { Router } from 'express';
import { Profile } from '../mongo/index';

const router = Router();

router.use('/user', middleware.user(), (req, res) => res.json(req.user || {}));

router.get('/profile/info', async (_, res) => {
  try {
    const profile = await Profile.findOne({}, 'name email phone');
    res.send(JSON.stringify({ status: 'success', data: profile?.toJSON() }));
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
  return '';
});

router.post('/profile/edit', async (req, res) => {
  try {
    const { name, email, phone, _id: id } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json('Missing required fields');
    }
    if (id) {
      const newProfile = await Profile.findByIdAndUpdate(id, { name, email, phone }, { new: true });
      res.send(JSON.stringify({ status: 'success', action: 'update', data: newProfile }));
    } else {
      const addProfile = new Profile({
        name,
        email,
        phone,
      });
      await addProfile.save();
      const saveProfile = addProfile.toJSON();
      res.send(JSON.stringify({ status: 'success', data: saveProfile }));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
  return '';
});

router.delete('/profile/delete', async (req, res) => {
  const { _id: id } = req.body;
  if (!id) {
    return res.status(400).json('Missing required fields _id');
  }
  try {
    const profile = await new Profile().deleteOne({ _id: id });
    res.send(JSON.stringify({ status: 'success', action: 'delete', data: profile }));
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
  return '';
});

export default router;
