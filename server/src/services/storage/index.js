import {Storage} from "@google-cloud/storage";
import { v4 as uuidv4 } from 'uuid';

/**
 * Upload file to Google Storage
 * @param {*} file : File type
 * @param {*} fileExtension : file extension (png, jpeg, etc...)
 */
export const uploadFile = async (file, fileExtension) => {
    const storage = new Storage({
        credentials: {
            private_key: process.env.PRIVATE_KEY,
            client_email: process.env.CLIENT_EMAIL
        },
        projectId: process.env.PROJECT_ID
    });
    const bucket = storage.bucket(process.env.BUCKET_NAME);
    const fileUuid = uuidv4();
    const blob = await bucket.file(fileUuid+"."+fileExtension);
    const stream = await blob.createWriteStream();
    const res = await new Promise((resolve, reject) => {
        stream.on('error', err => {
            reject(err);
        });
        stream.on('finish', () => {
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            resolve(publicUrl);
        });
        stream.end(file.buffer);
    });
    await blob.makePublic();
    return res;
}