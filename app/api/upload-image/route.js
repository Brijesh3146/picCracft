import ImageKit from 'imagekit';
import { NextResponse } from 'next/server';

const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT_KEY
});

export async function POST(request) {
    try {
        const { file, fileName } = await request.json();

        const existingFiles = await imagekit.listFiles({
            searchQuery: `name="${fileName}"`
        });

        if (existingFiles?.length > 0 && existingFiles[0]?.fileId) {
            await imagekit.deleteFile(existingFiles[0].fileId);
        }

        const imageRef = await imagekit.upload({
            file: file,
            fileName: fileName,
            isPublished: true,
            useUniqueFileName: false
        });

        return NextResponse.json({ url: imageRef.url });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
