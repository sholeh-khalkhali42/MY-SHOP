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
    <div className="container  mt-5" style={{ maxWidth: '400px' }}>
      <h2 className='mb-3 '>Register</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string().email('Invalid email').required('Required'),
          password: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
        })}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
         <label htmlFor="email" className="form-label">Email</label>
            <Field name="email" type="email" className="form-control" />
           <ErrorMessage name="email" component="div" className="text-danger small" />
          </div>
          <div>
          <label htmlFor="password" className="form-label">Password</label>
            <Field name="password" type="password" className="form-control" />
           <ErrorMessage name="password" component="div" className="text-danger small" />
          </div>
          {status === 'loading' && <div className="text-info mb-2">Registering...</div>}
          {error && <div className="text-danger mb-2">{error}</div>}
          <button className="btn btn-primary mt-3" type="submit">Register</button>
           <p className="text-info mb-2">For test :email: eve.holt@reqres.in , password: pistol</p>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterPage;

