import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function GET(req) {
  try {
    await dbConnect();
    const users = await User.find({}, { password: 0 }); // Exclude password field
    return Response.json({ success: true, users });
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}