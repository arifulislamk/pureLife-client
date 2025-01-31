import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import './CheckoutForm.css'
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { ImSpinner9 } from 'react-icons/im'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const CheckoutForm = ({ closeModal, camp, refetch }) => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [clientSecret, setClientSecret] = useState();
    const [processing, setProcessing] = useState(false);
    const [cardError, setCardError] = useState('');
    const axiosSecure = useAxiosSecure()
    useEffect(() => {
        // fetch client secret 
        if (camp?.campFees > 1) {
            getClientSecret({ campFees: camp?.campFees })
        }
    }, [camp?.campFees])

    const getClientSecret = async campFees => {
        const { data } = await axiosSecure.post('/create-payment-intent', campFees)
        // console.log('payment secret from server', data)
        setClientSecret(data.clientSecret)
    }
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();
        setProcessing(true)

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            // console.log('[error]', error);
            setCardError(error.message)
            setProcessing(false)
            return
        } else {
            // console.log('[PaymentMethod]', paymentMethod);
            setCardError('')
        }

        // payment confirm 
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: '',
                    name: '',
                }
            }
        })

        if (confirmError) {
            // console.log(confirmError)
            setCardError(confirmError.message)
            setProcessing(false)
            return
        }
        if (paymentIntent.status === 'succeeded') {
            // 1. Create payment info object 
            // console.log(paymentIntent)
            const paymentInfo = {
                ...camp,
                userEmail: user?.email,
                campId: camp._id,
                transactionId: paymentIntent.id,
                date: new Date(),
            }
            delete paymentInfo._id
            // console.log(paymentInfo)

            try {
                // post payment information 
                const { data } = await axiosSecure.post(`/paymentInfo`, paymentInfo)
                // console.log(data)

                // update participant status
                await axiosSecure.patch(`/participant/status/${camp?._id}`, {
                    status: 'Paid',
                })

                refetch()
                closeModal()
                toast.success('Payment Success ')
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Your Payment Successfully Done! Your TransactionId is ${paymentIntent.id}.`,
                    showConfirmButton: false,
                });
                // navigate('/dashboard/my-bookings')
            } catch (err) {
                // console.log(err)
            }
        }

        setProcessing(false)
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />


                <div disabled={!stripe || !clientSecret || processing} className='flex mt-2 justify-around'>
                    <button
                        type='submit'
                        className='inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'

                    >
                        {
                            processing ? <ImSpinner9 className=' animate-spin' size={24} /> :
                                `Pay ${camp?.campFees}`
                        }
                    </button>
                    <button
                        onClick={() => {
                            closeModal()
                        }}
                        type='button'
                        className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                    >
                        No
                    </button>

                </div>
            </form>
            {
                cardError && <p className=' text-red-600 ml-8'>{cardError}</p>
            }
        </>
    );
};

CheckoutForm.propTypes = {
    closeModal: PropTypes.func,
    refetch: PropTypes.func,

}
export default CheckoutForm;