// src/pages/LoginPage.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const result = await dispatch(loginUser(values));
      if (result.type === 'auth/loginUser/fulfilled') {
        navigate('/profile'); // or your home page
      }
    } catch (err) {
      console.error('Submit Error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 px-4">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
              <Field name="email" type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
              <Field name="password" type="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>

            {status === 'loading' && (
              <div className="flex justify-center items-center mb-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className="ml-2 text-blue-500">Logging in...</span>
              </div>
            )}
            {error && <div className="text-red-500 mb-2">{error}</div>}

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Please wait...' : 'Login'}
            </button>
           <p className="text-blue-500 mb-2">For test:email: eve.holt@reqres.in,password: cityslicka</p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
