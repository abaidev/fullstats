import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return ( 
        <div className='container my-5' style={{maxWidth: 500, margin: 'auto'}}>
            <h4>Oops, no such page...</h4>
            <h5><Link to="/">Maybe go home ?</Link></h5>
        </div>
     );
}
 
export default NotFound;
