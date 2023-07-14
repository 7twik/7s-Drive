import React from 'react'
import Button from 'react-bootstrap/esm/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { AiFillDelete } from 'react-icons/ai';

import { motion } from "framer-motion";
import {LiaDirectionsSolid} from 'react-icons/lia';
const OwnCard = ({ url, address, contract }) => {
  const grantRef = React.useRef();
  const removeRef = React.useRef();
  const [access, setAccess] = React.useState(null);
  React.useEffect(() => {
    console.log(url);
    contract.accessDisplay(url).then((res) => {
      console.log(res);
      setAccess(res);
    });
  }, []);

  const grant = async () => {
    console.log("grant");
    await contract.grantAccess(grantRef.current.value, url);
    alert("Access granted to " + grantRef.current.value + "for " + url);
    grantRef.current.value = "";
  }
  const remove = async () => {
    console.log("remove");
    await contract.revokeAccess(removeRef.current.value, url);
    alert("Access removed from " + removeRef.current.value + "for " + url);
    removeRef.current.value = "";
  }
  const deletePicture = async () => {
    console.log("delete");
    await contract.deletePic(url);
    alert("Deleted " + url);
  }
  const redirect = () => {
    window.open(url, '_blank').focus();
  }
  return (
    <motion.div
      className="box"
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
    <div className="cardTop" >
      <Card style={{ width: '300px' }}>
        {/* {urll} */}
        <LazyLoadImage
          effect='blur'
          crossorigin="anonymous"
          height="300px"
          width="300px"
          style={{padding: "10px"}}
          src={url} // use normal <img> attributes as props
        />
        <Card.Body>
          <div className='dualbtn'>
          <motion.div
          className="box"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Button variant="warning" onClick={redirect}><LiaDirectionsSolid /></Button>
          </motion.div>
          <motion.div
          className="box"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Button variant='danger' onClick={deletePicture} style={{ color: "white"}}><AiFillDelete /> </Button></motion.div></div>
          <Accordion style={{paddingTop:"5vh"}}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Access Details</Accordion.Header>

              <Accordion.Body>
                <label>Grant access:</label>
                <input type="text" placeholder='Enter address' ref={grantRef} />
                <Button variant="success" onClick={grant}>Grant</Button>
                <br />
                <label style={{ paddingTop: "5vh" }}>Remove access:</label>
                <input type="text" placeholder='Enter address' ref={removeRef} />
                <Button variant="success" onClick={remove}>Remove</Button>
                <br />
                <ol style={{ marginTop: "10vh" }}>
                  {(access == null || access == undefined || access.length == 0) ? <li>No body has access</li> : <>
                    {access.map((address, key) => (<>{(address!=="0x0000000000000000000000000000000000000000")?
                      <li key={key}>{address}</li>:<></>}</>))
                    }</>}
                </ol>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card.Body>
      </Card>
    </div>
    </motion.div>
  )
}

export default OwnCard