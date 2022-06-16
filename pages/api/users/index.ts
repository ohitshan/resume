import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/connectDB";
import User from "../../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const resumes = await User.find();
      res.status(200).json(resumes);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "POST") {
    try {
      const user = await User.findOneAndUpdate(
        { name: req.body.name, email: req.body.email },
        { image: req.body.newimage },
        { new: true }
      );
      console.log(user);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
