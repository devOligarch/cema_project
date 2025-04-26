import { ObjectId } from "mongodb"
import client from "../../../../lib/db"

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  try {
    await client.connect()
    const db = client.db()

    const clientData = await db
      .collection("clients")
      .aggregate([
        {
          $match: {
            _id: new ObjectId(`${req.query.id}`),
          },
        },
        {
          $lookup: {
            from: "programs",
            localField: "programs",
            foreignField: "_id",
            as: "programs",
          },
        },
        {
          $limit: 1,
        },
      ])
      .toArray()

    res.status(200).json({ client: clientData[0] })
  } catch (error) {
    return res.status(500).json({ error: "Client not found" })
  }
}
