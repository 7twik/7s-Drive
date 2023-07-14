import React from 'react'
import Card from 'react-bootstrap/Card';
import { LazyLoadImage } from 'react-lazy-load-image-component';
const OwnCard = ({ url, address }) => {
  React.useEffect(() => {
    console.log(url);

  }, []);
  return (
    <div className='cardTop'>
      <Card style={{ width: '300px' }}>
        {/* {urll} */}
        <LazyLoadImage
          effect='blur'
          crossorigin="anonymous"
          height="300px"
          width="300px"
          style={{ padding: "10px" }}
          src={url} // use normal <img> attributes as props
        />
        <Card.Body>
          <Card.Title>From: {address}</Card.Title>
        </Card.Body>
      </Card>
    </div>
  )
}

export default OwnCard