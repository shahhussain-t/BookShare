import React, { useEffect,useState } from 'react';
import Contact from './component/Contact';
import '../src/style/main.css';

function App() {
const [data,setData]=useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const backendUrl = `http://localhost:3000`;
        const response = await fetch(`${backendUrl}/api`);
        const data = await response.json();
        setData(data)
        console.log('Data from backend:', data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
     <h1>{data.data}</h1>
      <Contact />
    </>
  )
}

export default App
