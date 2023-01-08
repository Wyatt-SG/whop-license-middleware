import type { NextApiRequest, NextApiResponse } from "next";

const resetKey = async ({ key }: { key: string }) => {
  if (typeof process.env.WHOP_API_KEY !== "string")
    return {
      error: {
        status: 500,
        message:
          "Silly developer. You forgot to add your WHOP_API_KEY to this project",
      },
    };

  const response = await fetch(
    `https://api.whop.com/api/v2/memberships/${key}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.WHOP_API_KEY}`,
      },
      body: JSON.stringify({
        metadata: {},
      }),
    }
  );

  return response.json();
};

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

  const result = await resetKey({ key });

  if (result?.error)
    return res.status(result.error?.status || 400).json(result);

  res.status(200).json(result);
}
