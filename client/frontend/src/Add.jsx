import React,{useState} from 'react'
import axios from "axios";
import "./App.css"
const Add = ({contract,provider,account}) => {
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
              contract.addOwn(ImgHash);
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
    <div>
          <div className="file-field input-field">
            <div className="addFileText">
                <span>{fileName} </span>
                <input
                disabled={!account}
                type="file"
                required
                onChange={retrieveFile} />
            </div>
            
            <button onClick={submitOne} className='submitAdd'>Submit</button>
        </div>

    </div>
  )
}

export default Add