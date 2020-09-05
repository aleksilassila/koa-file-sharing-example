import { useState } from "react";
import axios from "axios";

import config from "../config";
import theme from "../theme";

const Home = () => {
    const [files, setFiles] = useState(null);

    const uploadFiles = async (e) => {
        e.preventDefault();

        const data = new FormData();

        for (let file of files) {
            data.append("files", file);
        }

        await axios({
            method: "POST",
            url: config.BACKEND_ENDPOINT + "/upload-multiple",
            data,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((res) => {
            if (res.status === 200) {
                window.location.href = "/upload/" + res.data;
            }
        });
    };

    return (
        <div>
            <h1 id="heading">Upload and Share Files Anonymously</h1>
            <form onSubmit={(e) => uploadFiles(e)}>
                <div>
                    <label>Upload files:</label>
                    <input
                        type="file"
                        id="file-upload"
                        name="files"
                        onChange={(e) => setFiles(e.target.files)}
                        multiple
                    />
                </div>
                <input type="submit" />
            </form>
            <style jsx>{`
                #heading {
                    margin-top: 10vh;
                    text-align: center;
                }

                form  {
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                }
            `}</style>
        </div>
    );
};

export default Home;
