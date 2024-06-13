import { SessionOptions } from 'express-session'

export const sessionConfig: SessionOptions = {
  secret: process.env.SESSION_SECRET || Math.random().toString(),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}
