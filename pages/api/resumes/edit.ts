import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/connectDB";
import Resume from "../../../models/Resume";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const resumes = await Resume.find();
      res.status(200).json(resumes);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "POST") {
    try {
      console.log(req.body);
      const resume = await Resume.findOne({ user: req.body.user });
      if (resume) {
        const newResume = await Resume.findOneAndUpdate(
          { user: req.body.user },
          req.body,
          { new: true }
        );
        return res.status(201).json(newResume);
      } else {
        const newResume = await Resume.create(req.body);
        res.status(200).json(newResume);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
