import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

interface CustomJwtPayload extends JwtPayload {
  id: string;
  email: string;
}

export function signJwt(payload: CustomJwtPayload) {
  const signOptions: SignOptions = { expiresIn: '7d' };
  return jwt.sign(payload, JWT_SECRET, signOptions);
}

export function verifyJwt(token: string): CustomJwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as CustomJwtPayload;
  } catch {
    return null;
  }
}
