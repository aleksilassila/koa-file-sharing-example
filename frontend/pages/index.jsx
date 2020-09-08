import { useState } from "react";
import axios from "axios";

import config from "../config";
import theme from "../theme";

const Home = () => {
    const [files, setFiles] = useState(null);
    const [comment, setComment] = useState("");

    const uploadFiles = async (e) => {
        e.preventDefault();

        const data = new FormData();

        for (let file of files) {
            data.append("files", file);
        }

        data.append("comment", comment);

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
            <div id="heading">
                <h1>Upload and Share Files Anonymously</h1>
                <h6>(Example)</h6>
            </div>
            <form onSubmit={(e) => uploadFiles(e)}>
                <label>Upload files:</label>
                <input
                    type="file"
                    id="file-upload"
                    name="files"
                    onChange={(e) => setFiles(e.target.files)}
                    multiple
                />
                <label>Comment:</label>
                <input
                    type="text"
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                />

                <input type="submit" />
            </form>
            <style jsx>{`
                #heading {
                    padding: 10vh 0;
                    margin: 0;
                    text-align: center;
                    background-color: paleturquoise;
                }

                h1,
                h6 {
                    margin: 0;
                }

                form {
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                    padding: 5vh 30vw;
                }

                label,
                input[type="file"] {
                    margin-bottom: 1em;
                }
            `}</style>
        </div>
    );
};

export default Home;
