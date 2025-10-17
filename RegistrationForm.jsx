import React, { useState } from 'react';

function validateEmail(email){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validateMobile(mobile){
  return /^\d{10}$/.test(mobile);
}

export default function RegistrationForm(){
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobile: '',
    address: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e){
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  }

  function validateAll(){
    const err = {};
    if(!formData.firstName.trim()) err.firstName = 'First name is required';
    if(!formData.lastName.trim()) err.lastName = 'Last name is required';
    if(!validateEmail(formData.email)) err.email = 'Invalid email';
    if(formData.password.length < 6) err.password = 'Password must be >= 6 characters';
    if(!validateMobile(formData.mobile)) err.mobile = 'Mobile must be 10 digits';
    if(!formData.address.trim()) err.address = 'Address is required';
    return err;
  }

  function handleSubmit(e){
    e.preventDefault();
    const err = validateAll();
    setErrors(err);
    if(Object.keys(err).length === 0){
      // For demo: mark as submitted and show the data preview
      setSubmitted(true);
    } else {
      setSubmitted(false);
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} noValidate>
        <div className="row">
          <div className="field">
            <label>First Name</label>
            <input name="firstName" value={formData.firstName} onChange={handleChange} />
            {errors.firstName && <small className="error">{errors.firstName}</small>}
          </div>
          <div className="field">
            <label>Last Name</label>
            <input name="lastName" value={formData.lastName} onChange={handleChange} />
            {errors.lastName && <small className="error">{errors.lastName}</small>}
          </div>
        </div>

        <div className="field">
          <label>Email</label>
          <input name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <small className="error">{errors.email}</small>}
        </div>

        <div className="field">
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
          {errors.password && <small className="error">{errors.password}</small>}
        </div>

        <div className="field">
          <label>Mobile</label>
          <input name="mobile" value={formData.mobile} onChange={handleChange} placeholder="10 digits" />
          {errors.mobile && <small className="error">{errors.mobile}</small>}
        </div>

        <div className="field">
          <label>Address</label>
          <textarea name="address" value={formData.address} onChange={handleChange} />
          {errors.address && <small className="error">{errors.address}</small>}
        </div>

        <div className="actions">
          <button type="submit">Register</button>
          <button type="button" onClick={() => { setFormData({ firstName:'', lastName:'', email:'', password:'', mobile:'', address:'' }); setErrors({}); setSubmitted(false); }}>Reset</button>
        </div>
      </form>

      {submitted && (
        <div className="preview">
          <h3>Submitted data</h3>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}