import React, { useState } from 'react';

function FormComponent() {
    const [form, setForm] = useState({ name: '', email: '', age: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = { ...form, age: form.age === '' ? '' : Number(form.age) };
        console.log('Form mới gửi:', result);
    };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={form.name} onChange={handleChange} />
      </label>

      <label>
        Email:
        <input type="email" name="email" value={form.email} onChange={handleChange} />
      </label>

      <label>
        Age:
        <input type="number" name="age" value={form.age} onChange={handleChange} />
      </label>

      <button type="submit">Gửi</button>
    </form>
  );
}

export default FormComponent;
