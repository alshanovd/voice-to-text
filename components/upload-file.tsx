import { UploadForm } from "./upload-form";

export const UploadFile = () => {
    const token = process.env.TOKEN;
    return <UploadForm token={token} />;
};
