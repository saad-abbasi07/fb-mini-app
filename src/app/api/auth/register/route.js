import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function POST(req) {
  try {
    await dbConnect();
    const { name, email, password, day, month, year, gender } = await req.json();

    if (!name || !email || !password || !day || !month || !year || !gender) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword, day, month, year, gender });

    return NextResponse.json({ message: "User registered", user: { name: user.name, email: user.email } });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
