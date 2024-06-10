import PropTypes from 'prop-types'
import {
    Dialog,
    Transition,
    TransitionChild,
    DialogPanel,
    DialogTitle,
} from '@headlessui/react'
import { Fragment } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from '../components/CheckoutForm/CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_Stripe_publishable_key);

const Paymodal = ({ closeModal, isOpen, camp, refetch }) => {
    // console.log(camp)
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as='div' className='relative z-10' onClose={closeModal}>
                <TransitionChild
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-black bg-opacity-25' />
                </TransitionChild>

                <div className='fixed inset-0 overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text-center'>
                        <TransitionChild
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'
                        >
                            <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                                <DialogTitle
                                    as='h3'
                                    className='text-lg font-medium text-center leading-6 text-gray-900'
                                >
                                    Cheek Information Before Payment
                                </DialogTitle>
                                <div className='mt-2'>
                                    <p className='text-sm text-gray-500'>
                                        CampName: {camp?.campName}
                                    </p>
                                </div>
                                <div className='mt-2'>
                                    <p className='text-sm text-gray-500'>
                                        Location: {camp?.location}
                                    </p>
                                </div>
                                <div className='mt-2'>
                                    <p className='text-sm text-gray-500'>
                                        Price: {camp?.campFees}
                                    </p>
                                </div>

                                <div className='mt-2'>
                                    <p className='text-sm text-gray-500'>
                                        OrganizerEmail: {camp?.organizerEmail}
                                    </p>
                                </div>
                                <hr className='mt-8 ' />

                                <Elements stripe={stripePromise}>
                                    <CheckoutForm
                                        refetch={refetch}
                                        closeModal={closeModal}
                                        camp={camp} />
                                </Elements>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

Paymodal.propTypes = {
    bookingInfo: PropTypes.object,
    closeModal: PropTypes.func,
    isOpen: PropTypes.bool,
    refetch: PropTypes.func,
}

export default Paymodal