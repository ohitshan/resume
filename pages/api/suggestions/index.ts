import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/connectDB";
import Suggestion from "../../../models/Suggestion";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const suggestion = await Suggestion.find(req.query)
        .populate("userFrom")
        .populate("userTo")
        .sort({ createdAt: -1 });
      res.status(200).json(suggestion);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "POST") {
    try {
      const suggestion = await Suggestion.create(req.body);
      res.status(201).json(suggestion);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
