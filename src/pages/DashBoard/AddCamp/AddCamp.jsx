import { useForm } from 'react-hook-form';
import AddForm from './AddForm';
import { useEffect, useState } from 'react';
import { imageUpload } from '../../../utility';
import { useMutation } from '@tanstack/react-query';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import axios from 'axios';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const AddCamp = () => {
    const { register, handleSubmit } = useForm()
    const [imagePreview, setImagePreview] = useState();
    const [imageText, setimageText] = useState('');
    const [image, setimage] = useState();

    // const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic()


    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    const [startDate, setStartDate] = useState(new Date());

    const { mutateAsync } = useMutation({
        mutationKey: ['capms'],
        mutationFn: async (capmsData) => {
            const { data } = await axiosPublic.post('/camps', capmsData)
            return data
        },
        onSuccess: () => {
            toast.success('Camps Added Succecfull')
        }
    })
    const handlebtn = async formData => {
        const data = { ...formData, dateAndTime: startDate, image }
        console.log(data)

        try {
            // upload imagebb get url 
            const image_url = await imageUpload(image)
            console.log(image_url)
            const campsData = { ...formData, dateAndTime: startDate, image_url }
            
            // post a camps 
            mutateAsync(campsData)
        } catch (err) {
            console.log(err)
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
            />
        </div>
    );
};

export default AddCamp;