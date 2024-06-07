import { useForm } from 'react-hook-form';
import AddForm from './AddForm';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { imageUpload } from '../../../../utility';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const AddCamp = () => {
    const { register, handleSubmit } = useForm()
    const [imagePreview, setImagePreview] = useState();
    const [imageText, setimageText] = useState('');
    const [image, setimage] = useState();
    const { user } = useAuth()

    const axiosSecure = useAxiosSecure();
    // const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()


    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    const [startDate, setStartDate] = useState(new Date());
    const [loading, setLoading] = useState(false)

    const { mutateAsync } = useMutation({
        mutationKey: ['capms'],
        mutationFn: async (capmsData) => {
            const { data } = await axiosSecure.post('/camps', capmsData)
            return data
        },
        onSuccess: () => {
            toast.success('Camps Added Succecfull')
            setLoading(false)
            navigate('/dashboard/manage-camps')
        },
        onError: () => {
            toast.error('SomeThings Problem!!!')
        }
    })

    const handlebtn = async formData => {
        try {
            setLoading(true)
            // upload imagebb get url 
            const image_url = await imageUpload(image)
            console.log(image_url, 'url')
            const campsData = { ...formData, participantCount: parseInt(0), dateAndTime: startDate, image: image_url, organizerEmail: user?.email, }

            // post a camps 
            mutateAsync(campsData)
            setLoading(false)
        } catch (err) {
            console.log(err)
            toast.error('SomeThings Problem!!!')
            setLoading(false)
        }

    }
    const handleImage = image => {
        setImagePreview(URL.createObjectURL(image))
        setimageText(image.name)
        setimage(image)
    }
    return (
        <div>
            <AddForm
                startDate={startDate}
                setStartDate={setStartDate}
                register={register}
                handleSubmit={handleSubmit}
                handlebtn={handlebtn}
                handleImage={handleImage}
                imageText={imageText}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
                loading={loading}
            />
        </div>
    );
};

export default AddCamp;