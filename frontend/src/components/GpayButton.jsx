import React from 'react';
import GooglePayButton from '@google-pay/button-react';


const GPayButton = ({ price, onPaymentSuccess, onPaymentFailure }) => {
     const formattedPrice = `${price}.00`
  return (
    <GooglePayButton
      environment="TEST" // Use "PRODUCTION" for real payments
      buttonColor="black"
      buttonType="buy"
      paymentRequest={{
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [{
          type: 'CARD',
          parameters: {
            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
            allowedCardNetworks: ['AMEX', 'DISCOVER', 'JCB', 'MASTERCARD', 'VISA'],
          },
          tokenizationSpecification: {
            type: 'PAYMENT_GATEWAY',
            parameters: {
              gateway: 'example',
              gatewayMerchantId: 'exampleMerchantId'
            },
          },
        }],
        merchantInfo: {
          merchantName: 'Your Test Merchant Name',
        },
        transactionInfo: {
          totalPriceStatus: 'FINAL',
          totalPrice: formattedPrice,
          currencyCode: 'INR',
          countryCode: 'IN',
        },
      }}
      onLoadPaymentData={(paymentRequest) => {
        onPaymentSuccess(paymentRequest);
      }}
      onError={(error) => {
        console.error(error);
        onPaymentFailure(error);
      }}
    />
  );
};

export default GPayButton;
