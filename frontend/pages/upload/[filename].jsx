import useAxios from "axios-hooks";
import { useRouter } from "next/router";

import config from "../../config";

const UploadPage = () => {
    const router = useRouter();
    const { filename } = router.query;

    const [{ data, loading, error }, refetch] = useAxios({
        url: config.BACKEND_ENDPOINT + "/upload/" + filename,
    });

    if (error) {
        return <p>Files could not be found or an error occured</p>;
    } else if (loading) {
        return <p>Loading...</p>;
    } else {
        return (
            <div>
                <h2>Files</h2>
                <p>
                    {data.map((file) => {
                        if (file.comment) {
                            return file.comment;
                        } else {
                            return "";
                        }
                    })}
                </p>
                <ul>
                    {data.map((file) => (
                        <li>
                            <a
                                href={
                                    config.BACKEND_ENDPOINT +
                                    "/file/" +
                                    file.path
                                }
                                target="_blank"
                                download
                            >
                                {file.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
};

export default UploadPage;
