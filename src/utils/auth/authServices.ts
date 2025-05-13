import User from '@/models/User';
import Account from '@/models/Account';
import Session from '@/models/Session';
import { dbConnect } from '@/lib/mongodb';

export class AuthService {
  static async getAllUsers() {
    await dbConnect();
    return await User.find({}).select('-password').sort({ createdAt: -1 });
  }

  static async getUserByEmail(email: string) {
    await dbConnect();
    return await User.findOne({ email });
  }

  static async getUserById(id: string) {
    await dbConnect();
    return await User.findById(id).select('-password');
  }

  static async createUser(userData: any) {
    await dbConnect();
    const user = new User(userData);
    return await user.save();
  }

  static async updateUser(id: string, updateData: any) {
    await dbConnect();
    return await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).select('-password');
  }

  static async deleteUser(id: string) {
    await dbConnect();
    return await User.findByIdAndDelete(id);
  }
  
  static async addUserMetadata(id: string, key: string, value: any) {
    await dbConnect();
    const updateQuery: any = {};
    updateQuery[`metadata.${key}`] = value;
    return await User.findByIdAndUpdate(id, { $set: updateQuery }, { new: true });
  }

  static async createAccount(accountData: any) {
    await dbConnect();
    const account = new Account(accountData);
    return await account.save();
  }

  static async createSession(sessionData: any) {
    await dbConnect();
    const session = new Session(sessionData);
    return await session.save();
  }

  static async deleteUserSessions(userId: string) {
    await dbConnect();
    return await Session.deleteMany({ userId });
  }

  static async getUserSessions(userId: string) {
    await dbConnect();
    return await Session.find({ userId });
  }
}

export default AuthService;


