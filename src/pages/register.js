import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import MainLayout from '../components/layout/MainLayout';

// Validation schema for registration form
const RegisterSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Password is too short').required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], "Passwords don't match")
        .required('Required'),
});

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
                        initialValues={{ email: '', password: '', confirmPassword: '' }}
                        validationSchema={RegisterSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                console.log(values);
                                setSubmitting(false);
                            }, 400);
                        }}
                    >
                        {({ isSubmitting }) => (
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

                                <div>
                                    <button type="submit" className="btn-primary" disabled={isSubmitting}>
                                        Register
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    <div className="text-sm">
                        <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">

                                Already have an account? Sign in

                        </Link>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
