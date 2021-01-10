import {Storage} from "@google-cloud/storage";
import { v4 as uuidv4 } from 'uuid';

export const uploadFile = async (filename) => {
    const storage = new Storage({
        credentials: {
            private_key: process.env.PRIVATE_KEY,
            client_email: process.env.CLIENT_EMAIL
        },
        projectId: process.env.PROJECT_ID
    });
    const bucket = storage.bucket(process.env.BUCKET_NAME);
    const fileUuid = uuidv4();
    const res = await bucket.upload(filename, {
        destination: fileUuid,
        metadata: {
            cacheControl: 'public, max-age=31536000',
        }
    });
    return res[0].name;
}