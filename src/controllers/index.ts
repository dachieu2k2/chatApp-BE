import roomControllers from './RoomControllers';
import authControllers from './AuthController';
import messageControllers from './MessageControllers';
import userControllers from './UserControllers';
import { Request, Response } from 'express';
import { Types } from 'mongoose';

interface Controller {
  (req: Request & { userId?: string}, res: Response): Promise<unknown>;
};

interface ControllerObj {
  [key: string]: Controller
};

interface SignData {
  userId: Types.ObjectId
}

export {
  roomControllers,
  authControllers,
  messageControllers,
  userControllers,
};

export type {
  ControllerObj,
  Controller,
  SignData
}
