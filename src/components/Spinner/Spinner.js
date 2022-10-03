import React from 'react';
import loading from '../images/loading.gif';

function Spinner(){
    return (
        <div className='d-flex align-items-center justify-content-center'>
            <img src={loading} alt="" />
        </div>
    );
}

export default Spinner;
