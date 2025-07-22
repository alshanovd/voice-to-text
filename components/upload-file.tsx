import { UploadForm } from "./upload-form";

export const UploadFile = () => {
    const token = process.env.TOKEN;
    const envPin = process.env.PIN;
    const fileToken = process.env.BLOB_READ_WRITE_TOKEN;
    return <UploadForm token={token} envPin={envPin} fileToken={fileToken} />;
};
