import { UploadForm } from "./upload-form";

export const UploadFile = () => {
    const token = process.env.TOKEN;
    const envPin = process.env.PIN;
    return <UploadForm token={token} envPin={envPin} />;
};
