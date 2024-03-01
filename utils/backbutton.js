import React from 'react';
import { TfiArrowLeft } from 'react-icons/tfi';
import { useNavigate } from 'react-router-dom';

export default function Backbutton() {

    const history = useNavigate();
    const goToPreviousPath = () => {
        history(-1)
    }

    return <>
        <button class="btn btn-dark btn-sm btn-icon-text text-white d-flex float-right mr-1 mt-3" onClick={goToPreviousPath}>
            <TfiArrowLeft className='mr-1' title='Back' />
            <span className="d-none d-md-block">BACK</span>
        </button>
    </>
}
