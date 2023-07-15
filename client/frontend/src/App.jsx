import React,{ useState,useEffect } from 'react'
import './App.css'
import Drive from './artifacts/contracts/Drive.sol/Drive.json'
import {ethers} from 'ethers'
import Heading from './Heading';
import Shared from './Shared';
import Button from 'react-bootstrap/esm/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Add from './Add';
import Own from './Own';
import {GiPinata} from 'react-icons/gi'
import {SiSolidity, SiIpfs} from 'react-icons/si'
import Footer from './Footer';
import {FaHardHat, FaReact, FaEthereum} from 'react-icons/fa'
import { motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  const notify = () => toast("Please switch network this app is deployed on Mumbai testnet,\n if you are using Metamask then switch to Mumbai testnet, \n chainID:80001, \n symbol: Matic, \n RPC URL: https://rpc-mumbai.maticvigil.com/, \nName: Mumbai Testnet");
  
  const notify2 = () => toast("Metamask is not downloaded please go to https://metamask.io/ and download it");
  useEffect(() => {
    const getChain = async () => {
      let ch=await provider.getNetwork();
      console.log(ch);
      if(ch.chainId !== 80001)
      {
        notify();
      }
    }
    getChain();
  },[provider]);
  useEffect(() => {
    if (window.ethereum == null) {
      alert("MetaMask not installed; using read-only defaults");
      console.log("MetaMask not installed; using read-only defaults")
      setProvider(ethers.getDefaultProvider());
      notify2();
    } else {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log(provider);
        const loadProvider = async () => {
          if (provider) {
            window.ethereum.on("chainChanged", () => {
              window.location.reload();
            });
            console.log(provider);
            window.ethereum.on("accountsChanged", () => {
              window.location.reload();
            });
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            setAccount(address);
            let contractAddress = "0xC3Ba30c050Fc7094784bAaaB2b30471FdEaa1EBA";

            const contract = new ethers.Contract(
              contractAddress,
              Drive.abi,
              signer
            );
            //console.log(contract);
            setContract(contract);
            setProvider(provider);
          } else {
            alert("Metamask is not installed");
            console.error("Metamask is not installed");
          }
        };
        provider && loadProvider();
      }
  }, []);
  return (
    <div className='app'>
      <Heading account={account} />
      <ToastContainer />
     <div>
     <Tabs
      defaultActiveKey="Add"
      id="uncontrolled-tab-example"
      className="mb-3"
      fill
    >
      <Tab eventKey="Add" title="Add Image">
        <div className='addText'>
        <Add contract={contract} account={account} provider={provider} />
        </div>
        </Tab>
      <Tab eventKey="profile" title="Own Images">
      <Own contract={contract} account={account} provider={provider} />
      </Tab>
      <Tab eventKey="contact" title="Shared Images">
        <Shared account={account} contract={contract} />
        </Tab>
        <Tab eventKey="about" title="What is this app for?">
        <div className='about'> 
          So this is an <span className='aboutd'>decentralized</span> drive app.<br />
          <br />
          <div className="techbtn">
          <span className='aboutd'>Tech Stack: &nbsp;</span> &nbsp;
          <motion.div
          className="box"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Button className='react' variant="secondary"><FaReact /></Button></motion.div> &nbsp;, &nbsp;
          <motion.div
          className="box"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Button className='solidity' variant="secondary"><SiSolidity /></Button></motion.div> &nbsp;,  &nbsp;
          <motion.div
          className="box"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Button className='pinata' variant="secondary"><GiPinata /></Button></motion.div> &nbsp;, &nbsp;
          <motion.div
          className="box"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Button className='eth' variant="secondary"><FaEthereum /></Button></motion.div> &nbsp;,  &nbsp;
          <motion.div
          className="box"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Button className='hardhat' variant="secondary"><FaHardHat /></Button></motion.div> &nbsp;,  &nbsp;
          <motion.div
          className="box"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Button className='ipfs' variant="secondary"><SiIpfs /></Button></motion.div></div><br />
          
        </div>
        <Footer />
          </Tab>
    </Tabs>
     </div>
     
    </div>
  )
}

export default App
