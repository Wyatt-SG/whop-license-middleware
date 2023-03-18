import type { NextApiRequest, NextApiResponse } from "next";
import sdk from "@/lib/sdk";

const isKeyString = (key: string | string[] | undefined): key is string =>
  typeof key === "string";

/**
 * @swagger
 * /api/license/{key}/reset:
 *   post:
 *     description: Resets key metadata
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(400).json({ message: "Request must be POST" });

  const { key } = req.query;

  if (!isKeyString(key))
    return res.status(400).json({ message: "Key is required" });

  const result = await sdk.memberships.updateMembership({
    id: key,
    updateMembership: { metadata: {} },
  });

  res.status(200).json(result);
}
