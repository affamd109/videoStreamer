import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Video, { IVideo } from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
    try {

        await connectToDatabase();

        const videos = await Video.find({}).sort({ createdAt: -1 }).lean();
        //.lean() in Mongoose is used to return plain JavaScript objects instead of full Mongoose documents.

        if (!videos || videos.length === 0) {
            return NextResponse.json([], { status: 200 });
        }

        return NextResponse.json(videos);


    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch videos" });


    }
}


export async function POST(req: NextRequest) {
    try {
        //Frst check whther the user is authenticated or not 
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        //But if session hai then connect to database :

        await connectToDatabase();

        const body: IVideo = await req.json();

        // const body : IVideo means  “I expect the incoming request body to match this structure which I have defined in Video.ts model.  This is TypeScript type annotation.” 


        //Now chck for required fields that u have created in Video.ts model )
        if (!body.title || !body.description || !body.thumbnailUrl || !body.videoUrl) {

            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });

        }

        const videoData = {
            ...body,
            controls: body?.controls ?? true,
            transformation: {
                height: 1920,
                width: 1080,
                quality: body.transformation?.quality ?? 100
            },

        };


        const newVideo = await Video.create(videoData);

        return NextResponse.json(newVideo);


    } catch (error) {

        return NextResponse.json({ error: "Failed to upload video" }, { status: 500 });

    }
}