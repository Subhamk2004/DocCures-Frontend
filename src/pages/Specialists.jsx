import React from 'react'
import { useParams, Link } from 'react-router-dom';

function Specialists() {
    const { specialty } = useParams();
    console.log(specialty);
    
  return (
    <div>
        <h1>Specialists</h1>
    </div>
  )
}

export default Specialists