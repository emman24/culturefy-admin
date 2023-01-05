import * as React from 'react';
import Box from '@mui/material/Box';
import Input from "src/components/input";
import { useForm } from "react-hook-form";
import { useBusiness } from 'src/@core/hooks/apps/useBusiness'

import uploadToCloudinary from 'src/@core/utils/cloudinary';

const CreateBusiness = (props: any) => {
    const { addBusiness } = useBusiness(null);
    const {
        register,
        handleSubmit,
        formState,
        reset,
        setValue,
        formState: { errors, touchedFields },
    } = useForm({});

    const onSubmit = async (body: object) => {
        let apiData:any = {
            ...body,
        };
        let response:any;
        if (apiData?.logo[0]?.name) {
            response = await uploadToCloudinary(apiData.logo[0]);
        }
        apiData.logo = response.url;
        addBusiness(apiData)
    };
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 10,
        minWidth: 600,
    };

    return (
        <>
            <Box sx={style}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Business Name</label>
                        <Input
                            type="text"
                            placeholder="User Name"
                            label="name"
                            register={register}
                            formState={formState}
                            errors={errors?.name?.type}
                            minLength={2}
                            required={true}
                        />
                    </div>
                    <div>
                        <label>Business logo</label>
                        <Input
                            type="file"
                            label="logo"
                            register={register}
                            formState={formState}
                            required={true}
                            name='logoUrl'
                        />
                    </div>
                    <div>
                        <label>Business email</label>
                        <Input
                            type="email"
                            placeholder="email"
                            label="email"
                            register={register}
                            formState={formState}
                            errors={errors?.email?.type}
                        />
                    </div>
                    <div>
                        <label>Business website</label>
                        <Input
                            type="text"
                            placeholder="website"
                            label="website"
                            register={register}
                            formState={formState}
                            errors={errors?.website?.type}
                        />
                    </div>
                    <div>
                        <label>Business location</label>
                        <Input
                            type="text"
                            placeholder="location"
                            label="location"
                            register={register}
                            formState={formState}
                            errors={errors?.location?.type}
                        />
                    </div>
                    <div>
                        <label>Business facebook link</label>
                        <Input
                            type="text"
                            placeholder="facebook_link"
                            label="facebook_link"
                            register={register}
                            formState={formState}
                            errors={errors?.facebook_link?.type}
                        />
                    </div>
                    <div>
                        <label>Business linkedin link</label>
                        <Input
                            type="text"
                            placeholder="linkedin_link"
                            label="linkedin_link"
                            register={register}
                            formState={formState}
                            errors={errors?.linkedin_link?.type}
                        />
                    </div>
                    <div>
                        <label>Business instagram link</label>
                        <Input
                            type="text"
                            placeholder="instagram_link"
                            label="instagram_link"
                            register={register}
                            formState={formState}
                            errors={errors?.instagram_link?.type}
                        />
                    </div>
                    <div>
                        <label>Business twitter link</label>
                        <Input
                            type="text"
                            placeholder="twitter_link"
                            label="twitter_link"
                            register={register}
                            formState={formState}
                            errors={errors?.twitter_link?.type}
                        />
                    </div>
                    <button type='submit'>Create</button>
                </form>
            </Box>
        </>
    )
}

export default CreateBusiness
