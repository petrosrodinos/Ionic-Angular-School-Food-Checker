export interface UserStateInterface {
  uid: string;
  username: string;
  email?: string;
  avatar?: string;
  emailVerified?: boolean;
  admin: boolean;
  isLoggedIn: boolean;
}

export interface AuthStateInterface {
  loading: boolean;
  user: UserStateInterface;
  error: null;
}
