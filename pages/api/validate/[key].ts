import type { NextApiRequest, NextApiResponse } from 'next'

const validateLicenseKey = async (key: string) => {
  if (typeof process.env.WHOP_API_KEY !== 'string') return { message: 'Silly developer. You forgot to add the api to this project' }

  const response = await fetch(`https://api.whop.com/api/v2/memberships/${key}/validate_license`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${process.env.WHOP_API_KEY}`
    },
  })

  return response.json()
}

const isKeyString = (key: string | string[] | undefined): key is string => typeof key === 'string'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(400).json({ message: 'Request must be POST' })

  const { key } = req.query;

  if (!isKeyString(key)) return res.status(400).json({ message: 'Key is required' })

  validateLicenseKey(key).then((data) => {
    console.log(data);
  })

  res.status(200).json({ name: 'John Doe' })
}
