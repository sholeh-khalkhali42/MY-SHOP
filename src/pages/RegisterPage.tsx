import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, status } = useSelector((state) => state.auth);

  const handleSubmit = async (values, { setSubmitting }) => {
    const resultAction = await dispatch(registerUser(values));

    if (registerUser.fulfilled.match(resultAction)) {
      navigate('/profile');
    } else {
      console.error('Register failed:', resultAction.payload || resultAction.error);
    }

    setSubmitting(false);
  };

  return (
    <div className="max-w-md mx-auto mt-20 px-4">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string().email('Invalid email').required('Required'),
          password: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
        })}
        onSubmit={handleSubmit}
      >
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
          {status === 'loading' && <div className="text-blue-500 mb-2">Registering...</div>}
          {error && <div className="text-red-500 mb-2">{error}</div>}
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-3" type="submit">Register</button>
           <p className="text-blue-500 mb-2">For test :email: eve.holt@reqres.in , password: pistol</p>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterPage;

