import React from 'react';
import { useField, useFormikContext } from 'formik';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css'; // If you want the default styling


export default function FormikTagsInput({ name, placeholder,...props }) {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(name);
    const inputProps = {
        placeholder: placeholder,
    };

    return (
        <div>
            <TagsInput
                value={field.value || []}
                onChange={(tags) => {
                    setFieldValue(name, tags);
                }}
                inputProps={inputProps} // Pass inputProps to TagsInput
                {...props}
            />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
}
