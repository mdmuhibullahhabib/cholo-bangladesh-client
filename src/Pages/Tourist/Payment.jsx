import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import React from 'react'
import CheckOutForm from './CheckOutForm';
import { useLocation } from 'react-router-dom';


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {

  const location = useLocation();
  const {id, price, menuId, packageName, tourGuideName, tourDate } = location.state || {};
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Payment</h2>

      <p className="text-lg text-center mb-6 text-gray-700">
        Please pay: <span className="font-semibold text-blue-600">${price}</span>
      </p>

      <Elements stripe={stripePromise}>
        <CheckOutForm
          id={id}
          price={price}
          menuId={menuId} 
          packageName={packageName}
          tourGuideName={tourGuideName}
          tourDate={tourDate}
        ></CheckOutForm>
      </Elements>
    </div>
  )
}

export default Payment