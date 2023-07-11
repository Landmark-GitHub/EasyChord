import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // ทำการตรวจสอบข้อมูลเข้าสู่ระบบ
    // และดำเนินการต่อตามต้องการ เช่น ส่งข้อมูลไปยังเซิร์ฟเวอร์
    console.log('Email:', email);
    console.log('Password:', password);
    // เพิ่มโค้ดส่วนต่อไปตามความต้องการ
  };

  return (
    <div>
      <h1>Login Component</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
