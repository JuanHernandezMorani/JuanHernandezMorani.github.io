import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './search.css'
import { getTodoByName } from '../../../actions';
import Swal from 'sweetalert2';

export default function SearchBar({currentPage}){
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleChange = (e) => {
        setName(e.target.value);
    }

    const handleSubmit = (e) => {
        if(name.length < 4 && name.length > 0){
        return Swal.fire({
         icon: 'error',
         title: 'Error 411',
         text: 'Need at last 4 characters...'
         })
        }
        e.preventDefault();
        dispatch(getTodoByName(name));
        setName('');
        setTimeout(() => {currentPage(1)},10);
    }



    return (
        <div className='sb'>
            <input type='text' placeholder='Search...' onChange={(e) => handleChange(e)} value= {name} />
            &nbsp;
            <button type= "submit" onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )
}