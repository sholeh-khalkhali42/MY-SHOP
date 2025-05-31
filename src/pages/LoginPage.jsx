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
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4 text-center">Login</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <Field name="email" type="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="text-danger small" />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage name="password" component="div" className="text-danger small" />
            </div>

            {status === 'loading' && <div className="text-info mb-2">Logging in...</div>}
            {error && <div className="text-danger mb-2">{error}</div>}

            <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
              {isSubmitting ? 'Please wait...' : 'Login'}
            </button>
           <p className="text-info mb-2">For test:email: eve.holt@reqres.in,password: cityslicka</p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
