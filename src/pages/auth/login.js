import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import MainLayout from '../../components/layout/MainLayout';
import {axiosLocalClient} from "@/axiosClient";
import {showError, showSuccess} from "@/components/notificationcontainers";
import {saveTokenInfo, saveUserInfo} from "@/auth/AuthService";

// Validation schema for login form
const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
});

export default function Login() {
    return (
        <MainLayout title="Login">
            <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
                <div className="max-w-md w-full space-y-8 p-10 bg-white shadow-xl rounded-lg">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Login to your account
                        </h2>
                    </div>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={LoginSchema}
                        onSubmit={async (values, {setSubmitting}) => {
                            try {
                                const response = await axiosLocalClient.post('/api/auth/login', values);
                                if (response.data.user) {
                                    // Decode token to get user details
                                    console.log(response.data.user)
                                    showSuccess('Successfully Logged In!');
                                    saveTokenInfo(response.data.token);
                                    saveUserInfo(response.data.user)
                                    // Redirect or perform other actions
                                    window.location.href = '/';
                                } else {

                                    showError('Token not received');
                                }
                                setSubmitting(false);

                            } catch (error) {
                                // Errors are already handled by the axios interceptor
                                showError(error.message)
                                setSubmitting(false);
                            }




                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form className="mt-8 space-y-6">
                                <div className="rounded-md shadow-sm -space-y-px">
                                    <Field
                                        type="email"
                                        name="email"
                                        autoComplete="email"
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Email address"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                                    <Field
                                        type="password"
                                        name="password"
                                        autoComplete="current-password"
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Password"
                                    />
                                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                                </div>

                                <div>
                                    <button type="submit" disabled={isSubmitting} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Sign in
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    <div className="text-sm text-center">
                        <Link href="/auth/register" className="font-medium text-indigo-600 hover:text-indigo-500">

                                Don't have an account? Register

                        </Link>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
