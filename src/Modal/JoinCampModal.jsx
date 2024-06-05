import PropTypes from 'prop-types'
import {
    Dialog,
    Transition,
    TransitionChild,
    DialogPanel,
    DialogTitle,
} from '@headlessui/react'
import { Fragment } from 'react'
import JoinModalForm from './JoinModalForm'
import { useForm } from 'react-hook-form'
import useAxiosPublic from '../hooks/useAxiosPublic'
import toast from 'react-hot-toast'

const JoinCampModal = ({ closeModal, isOpen, camps, refetch }) => {
    const axiosPublic = useAxiosPublic()
    const { register, handleSubmit } = useForm()
    // console.log(camps, camps.participantCount)

    const handlebtn = async formData => {

        try {
            const { data } = await axiosPublic.post('/participant', formData)
            console.log(data)

            // await axiosPublic.patch('/updateParticipants', camps)
            await axiosPublic.patch(`/camps/participants/${camps?._id}`, camps)
            toast.success('You Successfully Join This Camp')
            refetch()
            closeModal()
        } catch (err) {
            console.log(err)
            toast.error('Three is issue!')
        }

    }
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
                                    Camps Form
                                </DialogTitle>

                                {/* join form  */}
                                <div className='mt-2 w-full'>
                                    <JoinModalForm
                                        camps={camps}
                                        register={register}
                                        handleSubmit={handleSubmit}
                                        handlebtn={handlebtn} />
                                </div>
                                <hr className='mt-8 ' />

                                {/* <Elements stripe={stripePromise}>
                                    <CheckoutForm
                                        refetch={refetch}
                                        closeModal={closeModal}
                                        bookingInfo={bookingInfo} />
                                </Elements> */}
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

JoinCampModal.propTypes = {
    bookingInfo: PropTypes.object,
    closeModal: PropTypes.func,
    isOpen: PropTypes.bool,
    camps: PropTypes.object,
    refetch: PropTypes.func,
}

export default JoinCampModal