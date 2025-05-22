import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../Provider/Authprovider';
import Swal from 'sweetalert2';

const CheckOutForm = ({ id, price, menuId, packageName, tourGuideName, tourDate }) => {
  const [clientSecret, setClientSecret] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [error, setError] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  console.log(price, menuId, id)

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post('/create-payment-intent', { price })
        .then(res => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    };

    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    };

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setError(error.message);
      return;
    } else {
      console.log('PaymentMethod', paymentMethod);
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          email: user?.email || 'anonymous',
          name: user?.displayName || 'anonymous',
        },
      },
    });

    if (confirmError) {
      setError(confirmError.message);
    } else {
      console.log('Payment Intent', paymentIntent);
      if (paymentIntent.status === 'succeeded') {
        setTransactionId(paymentIntent.id);

        // Optional: Save payment info to DB or update booking status
        const paymentInfo = {
          name: user?.displayName,
          email: user?.email,
          packageName,
          tourGuideName,
          tourDate,
          price,
          transactionId: paymentIntent.id,
          date: new Date(),
          menuId,
          ststus: 'in-review'
        };

        axiosSecure.patch(`/booked/${id}`)
          .then(res => {
            refetch()
            console.log(res)
          });
        axiosSecure.post('/payment', paymentInfo)
          .then(res => {
            if (res.data.insertedId) {
              Swal.fire({
                icon: 'success',
                title: 'Payment Successful!',
                text: 'Thank you for your payment. Your booking has been in-review.',
                confirmButtonColor: '#3085d6',
                timer: 1500,
                showConfirmButton: false,
              });
            }
            // Handle success
          });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': { color: '#aab7c4' },
            },
            invalid: { color: '#9e2146' },
          },
        }}
      />
      <button className="btn btn-primary mt-4" type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>

      {transactionId && <p className="text-green-600 mt-2">Transaction ID: {transactionId}</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </form>
  );
};

export default CheckOutForm;
