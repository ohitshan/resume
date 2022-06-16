import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/connectDB";
import User from "../../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  if (method === "POST") {
    try {
      const user = await User.findOne({
        name: req.body.name,
        email: req.body.email,
      });
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
