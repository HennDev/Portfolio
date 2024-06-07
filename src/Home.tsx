import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';

let value = ""; 

async function sendEmail() {
    try {
      const response = await fetch('https://7o3jgmu5di.execute-api.us-east-2.amazonaws.com/Prod/hireme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ /* email parameters */ }),
      });
  
      if (!response.ok) {
        value = "fail";
        throw new Error('Failed to send email');
      }
  
      const data = await response.json();
      value = "Email sent";
      console.log('Email sent:', data);
    } catch (error) {
        value = "fail";
      console.error('Error sending email:', error);
    }
  }

const Home = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

        <button onClick={async () => await sendEmail()}>
        value is {value}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR ss
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default Home;
