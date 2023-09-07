import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Homepage = () => {
  return (
    <>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundImage: 'url(cargo.jpg)', // Replace with the actual path to your image
          backgroundSize: 'cover', // This ensures the image covers the entire container
        }}
      >
        <Card className="text-center">
          <Card.Header>WELCOME TO DASHBOARD</Card.Header>
          <Card.Body>
            <Card.Title>Invoice Details</Card.Title>
            <Card.Text>
              Thank you for your business! Below are the details of your invoice.
            </Card.Text>
            <Button variant="primary">View Invoice</Button>
          </Card.Body>
        </Card>
      </div>
    </>

  );
}

export default Homepage;

