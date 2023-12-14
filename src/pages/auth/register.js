import {Field, Form, Formik} from 'formik';
import ErrorMessage from '../../components/ErrorMessage';
import * as Yup from 'yup';
import Link from 'next/link';
import MainLayout from '../../components/layout/MainLayout';
import {showError, showSuccess} from "@/components/notificationcontainers";
import {axiosLocalClient} from "@/axiosClient";
import {saveUserInfo} from "@/auth/AuthService";


const RegisterSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Password is too short').required('Password is Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], "Passwords don't match")
        .required('Confirm password is required'),
    userType: Yup.string().required('User type is Required'),
    institutionName: Yup.string().when("userType", {
            is: "institution",
            then: (schema)=> schema.required('Institution Name is required for Institutes'),
            otherwise: (schema)=> schema.notRequired()
        }),
    organizationName:  Yup.string().when("userType", {
        is: "organization",
        then: (schema)=> schema.required('Organization name is required for organizations'),
        otherwise: (schema)=> schema.notRequired()
    }),
});

//institution
export default function Register() {




    return (
        <MainLayout title="Register">
            <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Create your account
                        </h2>
                    </div>




                    <Formik
                        initialValues={{
                            email: 'muthuishere@test.com',
                            password: 'password',
                            confirmPassword: 'password',
                            userType: 'student',
                            institutionName: '',
                            organizationName: ''
                        }}
                        validationSchema={RegisterSchema}
                        onSubmit={async (values, {setSubmitting}) => {


                            try {
                                const response = await axiosLocalClient.post('/api/auth/register', values);

                                if (response.data.user) {
                                    // Decode token to get user details
                                    console.log(response.data.user)
                                    showSuccess('Successfully registered!');

                                    saveUserInfo(response.data.user);
                                    // Redirect or perform other actions
                                    window.location.href = '/';
                                } else {
                                   showError('User not Registered');
                                }



                            } catch (error) {
                                // Errors are already handled by the axios interceptor
                                setSubmitting(false);
                            }
                        }}

                    >
                        {({ values, isSubmitting }) => (
                            <Form className="mt-8 space-y-6">

                                <Field
                                    type="email"
                                    name="email"
                                    className="form-input"
                                    placeholder="Email address"
                                />
                                <ErrorMessage name="email" component="div" />

                                <Field
                                    type="password"
                                    name="password"
                                    className="form-input"
                                    placeholder="Password"
                                />
                                <ErrorMessage name="password" component="div" />

                                <Field
                                    type="password"
                                    name="confirmPassword"
                                    className="form-input"
                                    placeholder="Confirm Password"
                                />
                                <ErrorMessage name="confirmPassword" component="div" />
                                <Field as="select" name="userType" className="form-select">
                                    <option value="">Select User Type</option>
                                    <option value="student">Student</option>
                                    <option value="institution">Institution</option>
                                    <option value="organization">Organization</option>
                                    <option value="admin">Admin</option>
                                </Field>
                                <ErrorMessage name="userType" component="div" />

                                {(values.userType === 'institution' || values.userType === 'student') && (
                                    <>
                                        <Field
                                            type="text"
                                            name="institutionName"
                                            className="form-input"
                                            placeholder="Institution Name"
                                        />
                                        <ErrorMessage name="institutionName" component="div" className="error-message" />
                                    </>
                                )}

                                {values.userType === 'organization' && (
                                    <>
                                        <Field
                                            type="text"
                                            name="organizationName"
                                            className="form-input"
                                            placeholder="Organization Name"
                                        />
                                        <ErrorMessage name="organizationName" component="div" />
                                    </>
                                )}

                                <div>
                                    <button type="submit" className="btn-primary" disabled={isSubmitting}>
                                        Register
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    <div className="text-sm">
                        <Link href="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">

                                Already have an account? Sign in

                        </Link>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
