import React from 'react'
import './App.css'
import { FaBars } from 'react-icons/fa'
import { Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion";
const Heading = ({ account }) => {
  const notify = () => toast("Address: " + account);
  return (
    <div>
      <div className='centerLogo topnav'>
        <img className="logo" src="./logo.jpg" />
        <ToastContainer />
        <motion.div
          className="box"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Button className="icon" onClick={notify}><FaBars /></Button></motion.div>

        {/* <h6 className='heading' id='myLinks'>
          
          <div style={{ color: "skyblue" }}><img className="logo1" src="./profile.jpg" />Account address:</div> <br /><div style={{ color: "coral" }}>{account}</div>
        </h6> */}

      </div>
    </div>
  )
}

export default Heading