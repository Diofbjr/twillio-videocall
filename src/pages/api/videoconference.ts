import { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roomName, identity } = req.body;

  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID!,
    process.env.TWILIO_API_KEY!,
    process.env.TWILIO_API_SECRET!,
    { identity }
  );

  const videoGrant = new VideoGrant({ room: roomName });
  token.addGrant(videoGrant);

  res.status(200).json({ token: token.toJwt() });
}
