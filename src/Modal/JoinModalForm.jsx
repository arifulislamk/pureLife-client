import PropTypes from 'prop-types'
import useAuth from '../hooks/useAuth'

const JoinModalForm = ({ handleSubmit, handlebtn, register, camps }) => {
    const { user } = useAuth()
    // console.log(camps, ' nnnnnn')

    return (
        <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
            <form onSubmit={handleSubmit(handlebtn)}>
                <div className='grid grid-cols-1 gap-10'>
                    <div className='space-y-1 text-sm'>
                        <label htmlFor='campName' className='block text-gray-600'>
                            Camp Name
                        </label>
                        <input
                            {...register('campName')}
                            className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                            name='campName'
                            defaultValue={camps?.campName}
                            id='campName'
                            type='text'
                            readOnly
                            placeholder='campName'
                            required
                        />
                    </div>
                    <div className='space-y-1 text-sm'>
                        <label htmlFor='campFees' className='block text-gray-600'>
                            Camp Fees
                        </label>
                        <input
                            {...register('campFees')}
                            readOnly
                            className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                            name='campFees'
                            defaultValue={camps?.campFees}
                            id='campFees'
                            type='text'
                            placeholder='campFees'
                            required
                        />
                    </div>
                    <div className='space-y-1 text-sm'>
                        <label htmlFor='location' className='block text-gray-600'>
                            Location
                        </label>
                        <input
                            {...register('location')}
                            readOnly
                            defaultValue={camps?.location}
                            className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                            name='location'
                            id='location'
                            type='text'
                            placeholder='location'
                            required
                        />
                    </div>
                    <div className='space-y-1 text-sm'>
                        <label htmlFor='healthcareProfessional' className='block text-gray-600'>
                            Healthcare Professional Name
                        </label>
                        <input
                            {...register('healthcareProfessional')}
                            readOnly
                            defaultValue={camps?.healthcareProfessional}
                            className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                            name='healthcareProfessional'
                            id='healthcareProfessional'
                            type='text'
                            placeholder='healthcareProfessional'
                            required
                        />
                    </div>

                    <div className='flex justify-between gap-2'>
                        <div className='space-y-1 text-sm'>
                            <label htmlFor='participantName' className='block text-gray-600'>
                                Participant Name
                            </label>
                            <input
                                {...register('participantName')}
                                defaultValue={user?.displayName}
                                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                                name='participantName'
                                id='name'
                                type='text'
                                placeholder='participantName'
                                required
                            />
                        </div>

                        <div className='space-y-1 text-sm'>
                            <label htmlFor='participantEmail' className='block text-gray-600'>
                                Participant Email
                            </label>

                            <input
                                {...register('participantEmail')}
                                defaultValue={user?.email}
                                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                                name='participantEmail'
                                id='participantEmail'
                                type='participantEmail'
                                placeholder='participantEmail'
                                required
                            />
                        </div>
                    </div>

                    <div className='flex justify-between gap-2'>
                        <div className='space-y-1 text-sm'>
                            <label htmlFor='participantPhone' className='block text-gray-600'>
                                Phone Number
                            </label>
                            <input
                                {...register('participantPhone')}
                                defaultValue={user?.phone}
                                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '

                                type='number'
                                placeholder='Phone Number'
                                required
                            />
                        </div>

                        <div className='space-y-1 text-sm'>
                            <label htmlFor='participantAge' className='block text-gray-600'>
                                Age
                            </label>
                            <input
                                {...register('participantAge')}
                                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                                type='text'
                                placeholder='age'
                                required
                            />
                        </div>
                    </div>

                    <div className='flex justify-between gap-2'>
                        <div className='space-y-1 text-sm'>
                            <label htmlFor='emergencyContact' className='block text-gray-600'>
                                Emergency Contact

                            </label>
                            <input
                                {...register('emergencyContact')}
                                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                                name='emergencyContact'
                                id='emergencyContact'
                                type='text'
                                placeholder='Emergency Contact'
                                required
                            />
                        </div>
                        <div className='space-y-1 w-1/2 text-sm'>
                            <label htmlFor='gender' className='block text-gray-600'>
                                Gender
                            </label>
                            <select
                                required
                                className='w-full py-3 border-rose-300 focus:outline-rose-500 rounded-md'
                                {...register('gender')}
                            >
                                <option value={'male'} key='male'>
                                    Male
                                </option>
                                <option value={'female'} key='female'>
                                    Female
                                </option>
                            </select>
                        </div>
                    </div>
                </div >

                <button
                    type='submit'
                    className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500'
                >
                    Join Now
                </button>
            </form >
        </div >
    )
}

JoinModalForm.propTypes = {
    camps: PropTypes.object,
    handleSubmit: PropTypes.func,
    handlebtn: PropTypes.func,
    register: PropTypes.func,
}
export default JoinModalForm