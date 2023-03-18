import type { NextApiRequest, NextApiResponse } from "next";
import sdk from "@/lib/sdk";

const isKeyString = (key: string | string[] | undefined): key is string =>
  typeof key === "string";

/**
 * @swagger
 * /api/license/{key}/validate:
 *   post:
 *     description: Validate a license key
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               metadata:
 *                 type: object
 *                 example: { "anything": "you want" }
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(400).json({ message: "Request must be POST" });

  const { key } = req.query;
  const { metadata } = req.body;

  if (!isKeyString(key))
    return res.status(400).json({ message: "Key is required" });

  const result = await sdk.memberships.validateLicense({
    id: key,
    validateLicense: { metadata },
  });

  res.status(200).json(result);
}
