import {ErrorMessage as FormikErrorMessage} from 'formik';

const ErrorMessage = ({ name }) => (
    <FormikErrorMessage name={name} component="div" className="error-message" />
);

export default ErrorMessage;
