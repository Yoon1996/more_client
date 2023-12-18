import axios from "axios";
import React, { useState } from "react";
import { sendUrl } from "../service/url.service";

const ImageUploaderComponent = () => {
  const [selectedFile, setSelctedFile] = useState(null);
  const instance = axios.create({
    headers: null,
  });

  //파일 등록
  const handleFileChange = (e) => {
    setSelctedFile(e.target.files[0]);
  };

  const uploadImageToS3 = (url, file) => {
    console.log("url: ", url);
    instance
      .put(url, file)
      .then((res) => {
        // console.log("res: ", res);
        const urlData = res.config.url;
        const question = [...urlData].findIndex((data) => data === "?");
        const dd = [...urlData].splice(0, question);
        // console.log("question: ", question);
        // 스프레드 연산자로 감싸고 물음표값의 인덱스를 찾는다.
        // splice 로 물음표인덱스부터 url의 전체 길이에서 물음표가 있는 길이까지 자른다.
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  const uploadFile = async () => {
    try {
      const result = await sendUrl({ filename: selectedFile.name });
      console.log("result: ", result);
      const presignedUrl = result.data;
      console.log("presignedUrl: ", presignedUrl);
      uploadImageToS3(presignedUrl, selectedFile);
    } catch (err) {
      console.log("err: ", err);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>이미지업로드 </button>
    </div>
  );
};

export default ImageUploaderComponent;
