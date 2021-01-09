import CloudStorage from "@google-cloud/storage";

export const uploadFile = async (filename) => {
    const { Storage } = CloudStorage;
    const storage = new Storage({
        credentials: {
            private_key: process.env.PRIVATE_KEY,
            client_email: process.env.CLIENT_EMAIL
        },
        projectId: process.env.PROJECT_ID
    });
    const bucket = storage.bucket(process.env.BUCKET_NAME);
    const res = await bucket.upload(filename, {
        metadata: {
            cacheControl: 'public, max-age=31536000',
        }
    })
}