import React from 'react';
import { observer } from 'mobx-react';
import store from '../store/store';

const Home = observer(() => {
    return (
        <div className='container'>
            <h2>Hey, man. It's home yah!</h2>
        </div>
    )
});

export default Home;