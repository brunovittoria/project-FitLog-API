import { RequestHandler } from 'express';

export const getProfileController: RequestHandler = async (req, res) => {
  const user = req.user_id!;

  res.json({
    user
  });
};
