import React, { useState } from 'react'
import axios from "axios";
import "./App.css"
import { motion } from "framer-motion";
const Add = ({ contract, provider, account }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("no image selected");
  const submitOne = async (event) => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `805560e0545638ab59c5`,
            pinata_secret_api_key: `73cb41cb79201e2ecc6349eea0577a23c2e33979b9554b70dfdbb6cdecd15fee`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        await contract.addOwn(ImgHash);
        alert("Successfully Image Uploaded");
        setFile(null);
        setFileName("no image selected");
      } catch (e) {
        alert("Unable to upload image to Pinata");
      }
    }
    alert("Successfully Image Uploaded");
  }
  const retrieveFile = (e) => {
    const data = e.target.files[0]; //files array of files object
    // console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };
  return (
    <div className='addTop'>
      <motion.div
        className="box"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <div className="file-field input-field">
          <h3 className='addImText'>Add Image<br /></h3>
          <div className="addFileText">
            <input
              disabled={!account}
              type="file"
              required
              onChange={retrieveFile} />
          </div>
          <motion.div
            className="box"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <button onClick={submitOne} className='submitAdd'>Submit</button>
          </motion.div>
        </div></motion.div>

    </div>
  )
}

export default Add