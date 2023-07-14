import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { LazyLoadImage } from 'react-lazy-load-image-component';
const OwnCard = ({url,address}) => {
  const [urll, setUrl] = React.useState("");
  React.useEffect(() => {
    console.log(url);
    
    // console.log(`https://gateway.pinata.cloud/ipfs/${url.substring(6)}`);
  },[]);
  return (
    <div style={{paddingLeft:"5vw"}}>
        <Card style={{ width: '320px' }}>
          {/* {urll} */}
          <LazyLoadImage
          effect='blur'
          crossorigin="anonymous"
          height="300px"
          width="300px"
      src={url} // use normal <img> attributes as props
      />
          {/* <img src={urll} style={{ width: '18rem' }} />
      <Card.Img variant="top" src={`https://gateway.pinata.cloud/ipfs/${url.substring(6)}`} /> */}
      <Card.Body>
        <Card.Title>Access Details</Card.Title>
        {/* <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
    </div>
  )
}

export default OwnCard