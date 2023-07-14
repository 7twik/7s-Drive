import React,{ useState,useEffect } from 'react'
import './App.css'
import Drive from './artifacts/contracts/Drive.sol/Drive.json'
import {ethers} from 'ethers'
import Heading from './Heading';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Add from './Add';
import Own from './Own';

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    if (window.ethereum == null) {
      alert("MetaMask not installed; using read-only defaults");
      console.log("MetaMask not installed; using read-only defaults")
      setProvider(ethers.getDefaultProvider());
  
    } else {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
      
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
            let contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

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
      <Heading />
     Account: {account}
     <div>
     <Tabs
      defaultActiveKey="Add"
      id="uncontrolled-tab-example"
      className="mb-3"
      fill
    >
      <Tab eventKey="Add" title="Add">
        <div className='addText'>Add Image<br />
        <Add contract={contract} account={account} provider={provider} />
        </div>
        </Tab>
      <Tab eventKey="profile" title="Own">
      <Own contract={contract} account={account} provider={provider} />
      </Tab>
      <Tab eventKey="contact" title="Shared">
        Tab content for Contact
      </Tab>
    </Tabs>
     </div>
    </div>
  )
}

export default App
