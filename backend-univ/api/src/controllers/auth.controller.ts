import { Request, Response } from 'express';
import { User } from '../models';
import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET as string;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN as SignOptions['expiresIn'];

export async function register(req: Request, res: Response) {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ name, email, password: hash });
    res.status(201).json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    res.status(400).json({ error: 'Email already in use' });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign(
    { id: user.id },
    jwtSecret,
    { expiresIn: jwtExpiresIn }
  );
  res.json({ token });
}
