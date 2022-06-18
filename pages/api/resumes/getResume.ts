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
      const resumes = await Resume.find({ user: req.query.id }).populate(
        "user"
      );
      res.status(200).json(resumes);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    try {
      const resumes = await Resume.find({
        $or: [
          { title: new RegExp(req.body.term) },
          { content: new RegExp(req.body.term) },
        ],
      });
      res.status(200).json(resumes);
    } catch (err) {
      console.log(err);
    }
  }
}
