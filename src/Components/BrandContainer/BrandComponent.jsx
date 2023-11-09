import React from 'react';
import { Container, Image } from 'react-bootstrap';



function BrandComponent() {
  return (
      <Container style={{padding: "0px"}}>

        <Image src='https://firebasestorage.googleapis.com/v0/b/bestiasburgers.appspot.com/o/1222%20(7).png?alt=media&token=a26c76a5-ea5f-4b70-9c0a-50382e29f49d'
        style={{
          width: '100%',
          padding: '0px',
          margin: '0px',
        }} 
        alt="logo"/>

    </Container>
  );
}

export default BrandComponent;
