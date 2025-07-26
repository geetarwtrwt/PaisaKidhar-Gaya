import { connectDb } from "../../../../../backend/db/db";
import { NextResponse } from "next/server";
import { userModel, hashPassword } from "../../../../../backend/model/user";
import { writeFile } from "fs/promises";

export let POST = async (request) => {
  try {
    await connectDb();
    let formData = await request.formData();

    let img = formData.get("img");
    let name = formData.get("name");
    let email = formData.get("email");
    let password = formData.get("password");

    if (!name || !email || !changePassword) {
      return NextResponse.json({
        error: true,
        msg: "All fields are required",
      });
    }

    if (!img) {
      return NextResponse.json({ error: true, msg: "Img isn missing" });
    }

    
    let timestamp = Date.now();

    let imgByte = await img.arrayBuffer();
    let buffer = Buffer.from(imgByte);
    let path = `./public/${timestamp}_${img.name}`;
    await writeFile(path, buffer);
    let imgUrl = `${timestamp}_${img.name}`;

    let duplicateData = await userModel.findOne({ email });
    if (duplicateData) {
      return NextResponse.json(
        {
          error: true,
          msg: "User already exists",
        },
        { status: 409 },
      );
    }

    let changePassword = await hashPassword(password);

    let signupData = {
      userImg: imgUrl,
      name: name,
      email: email,
      password: changePassword,
    };
    let data = await userModel.create(signupData);
    return NextResponse.json({ success: true, msg: data });
  } catch (err) {
    return NextResponse.json({ error: true, msg: err.message });
  }
};
