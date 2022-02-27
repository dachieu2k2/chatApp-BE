import Bind from './Bind'
import Message from './Message'
import User from './User'
import Room from './Room'

interface I_Bind {
  roomId: string,
  userId: string,
}
interface I_Message {
  content: string,
  userId: string,
  user?: I_User,
  roomId: string,
}
interface I_User {
  username: string,
  email: string,
  password: string,
  avatar: string
  refreshToken: string
}
interface I_Room {
  name: string,
  newestMessage: I_Message,
};

interface Timestamps {
  createdAt: ReturnType<typeof Date>,
  updatedAt: ReturnType<typeof Date>
}

export {
  Bind,
  Message,
  User,
  Room
};

export type {
  I_Bind,
  I_Message,
  I_User,
  I_Room,
  Timestamps
}
