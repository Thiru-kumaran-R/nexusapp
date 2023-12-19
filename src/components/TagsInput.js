
import React, { useState, useEffect } from 'react';
import { useField, useFormikContext } from 'formik';

export default function TagsInput({ name, placeholder }) {
    const [tags, setTags] = useState([]);
    const { setFieldValue } = useFormikContext();
    const [field] = useField(name);

    useEffect(() => {
        console.log(name);
    console.log(field.value);
    console.log(placeholder);

        // Initialize tags from Formik's initial values
        // setTags(field.value ? field.value.split(',').map(tag => tag.trim()) : []);
        setTags(typeof field.value === 'string' ? field.value.split(',').map(tag => tag.trim()) : field.value);

    }, [field.value]);

    const addTag = (e) => {
        if (e.key === 'Enter' && e.target.value !== '') {
            setTags([...tags, e.target.value]);
            setFieldValue(name, [...tags, e.target.value].join(', '));
            e.target.value = '';
        }
    };

    const removeTag = (indexToRemove) => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    };

    useEffect(() => {
        // Update Formik's values when tags change
        setFieldValue(name, tags.join(', '));
    }, [tags, setFieldValue, name]);

    return (
        <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
                <div key={index} className="flex items-center gap-2 bg-gray-200 rounded px-2 py-1">
                    {tag}
                    <button type="button" onClick={() => removeTag(index)} className="text-gray-600 hover:text-gray-800">
                        &times;
                    </button>
                </div>
            ))}
            <input
                onKeyDown={addTag}
                className="form-input"
                placeholder={placeholder}
            />
        </div>
    );
}
