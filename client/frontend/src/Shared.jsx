import React from 'react'
import CardShare from './CardShare'
const Shared = ({ contract, account }) => {
    const [own, setOwn] = React.useState(null);
    const [count, setCount] = React.useState(0);
    React.useEffect(() => {
        const load = async () => {
            let total = await contract.sharedDisplay(account);
            console.log(total);
            setOwn(total);
        }
        load();
    }, [count, contract, account]);
    return (
        <div>
            {own == undefined || own.length === 0 ? <>Nobody shared any pictures with you.</> : <>
                {own.map((url, key) => (
                    <CardShare key={key} url={url[1]} address={url[0]} />))}
            </>}
        </div>
    )
}

export default Shared