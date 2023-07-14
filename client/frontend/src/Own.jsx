import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import Card from './Card'
const Own = ({contract,provider,account}) => {
    const [own, setOwn] = React.useState([]);
    React.useEffect(() => {
        console.log(own);
        let total;
        const load = async () => {
          total = await contract.ownDisplay(account);
            setOwn(total);
        }
        load();
        
    },[account,contract]);
    // const click = async () => {
    //       const res=await contract.ownDisplay(account);
    //         console.log(res);
    // }
  return (
    <div className='Owntop'>
        {own==undefined || own.length===0?<>No Pictures uploaded by you.</>:<>
            {own.map((url,key) => (
                <Card key={key} url={url} address={account} />))}        
        </>}
    </div>
  )
}

export default Own