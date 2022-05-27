import React from 'react';
import { Link } from 'react-router-dom';
import {Button} from '@mui/material';

const AccountActivated = () => {
    return ( 
        <div className='container my-5' style={{maxWidth: 450}}>
            <h3 className='title'>
                Congratulations, Your Account has been activated, Now you can  
            </h3>
            <Button size="small" variant='outlined' type="submit" className='btn btn-primary'>
                <Link to="/login" className='text-decoration-none'>Login</Link>
            </Button>
            
        </div>
     );
}
 
export default AccountActivated;
