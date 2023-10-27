import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import { postTodo, getCategories } from '../../actions';
import style from './form.module.css';
import Swal from 'sweetalert2';
import Nav from '../bars/nav/nav.jsx';

function validate(todo){

    const errors = {};
    if(!todo.Title){
        errors.Title = 'Title is required'
    }
    if(todo.Title && todo.Title.length < 4){
        errors.Title = 'Title must have minium 4 characters'
    }
    if(todo.Title && todo.Title.length > 255){
        errors.Title = 'Max characters: 255.';
    }
    if(todo.Description && todo.Description.length > 4098){
        errors.Description = 'Max characters: 4098.';
    }
    if(todo.State == null){
        errors.State = 'Please select a valid state.'
    }
    return errors;
}

export default function TodosCreate(){
    const dispatch = useDispatch();
    const categories = useSelector(state => state.Categories);
    const history = useHistory();
    const [todo, setTODO] = useState({
        Title : "", 
        Description: "", 
        Categories:[], 
        UserId: 0, 
        State: null
    });
    var userData = localStorage.getItem("UserLogin");
    var userLoginData = {
    name: "Guest",
    id: 1
  };
    if (userData) {
     userLoginData = JSON.parse(userData);
    }
    
    const [errors, setErrors] = useState({});
    
    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    function handleChange (e){
        setTODO({
            ...todo,
            [e.target.title]: e.target.value
        })
        setErrors(validate({
            ...todo,
            [e.target.title]: e.target.value
        }))
    }
    
    function handleSelect(e){
        const category = e.target.value;
        if(!todo.Categories.includes(category)){
            if(todo.Categories.length >= 4){
                return  Swal.fire({
                        icon: 'error',
                        title: 'Error 412',
                        text: 'TODOs cant have more than four categories',
                        footer: 'select 1 to 4 categories.'
                      })
                }
            setTODO({
                ...todo,
                Categories: [...todo.Categories, category]
            });
            setErrors(validate({
                ...todo,
                Categories: [...todo.Categories, category]
            }))
        }
    }
    function handleState(e){
        const state = e.target.value;
        if(state == null){
            return  Swal.fire({
                icon: 'error',
                title: 'Error 412',
                text: 'State cant be null',
                footer: 'select incomplete or complete.'
              })
        }
        setTODO({
            ...todo,
            State: JSON.parse(state),
            UserId: userLoginData.id,
        });
        setErrors(validate({
            ...todo,
            State: JSON.parse(state)
        }));
    }
    function handleSubmit (e){
        e.preventDefault();
       let errors = validate(todo);
        if(!errors.Title && !errors.State && !errors.Description){
        dispatch(postTodo(todo));
        Swal.fire({
            icon: 'success',
            title: 'TODO created successfully',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            },
            footer: "you will be redirected to the home page"
          })
          .then(() => {
            history.push('/');
          });
    }
        else{
            setErrors(validate({...todo}));
            return Swal.fire({
            icon: 'error',
            title: 'Cant create TODO',
            text: 'You have errors, resolve it and try again!',
            footer:'button will get lock until all errors be solved'
            })
        }
    }
    function handleDelete(el) {
        setTODO({
            ...todo,
            Categories: todo.Categories.filter(t => t !== el)
        });
    }
        
    return (
        <div>
            <Nav/>
        <div className={style.parent}>
          <div className={style.content}>
            <div className={style.card}>
            </div>
            <div className={style.formAndCategories}>
              <div className={style.form}>
                <div className={style.tittle}>
                  <h1>Create your TODO</h1>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <h3 className= {style.tittle2}>Name</h3>
                        <input type="text" value= {todo.Title} title= "Title" placeholder="Insert Title" onChange={(e) => handleChange(e)} className= {style.input}/>
                        {errors.Title && <p className= {style.errors}>{errors.Title}</p>}
                    </div>
                    <div>
                        <h3 className= {style.tittle2}>Description</h3>
                        <input type="text" value= {todo.Description} title= "Description" placeholder="Description..." onChange={(e) => handleChange(e)} className= {style.input}/>
                        {errors.Description && <p className= {style.errors}>{errors.Description}</p>}
                    </div>
                    <select onChange={(e) => handleSelect(e)} className= {style.select}>
                        <option value= "Select" hidden>Select Categories</option>
                        {
                            categories.map(c => (
                                <option key={c.id} value={c.name}>{c.name}</option>
                            ))
                        }
                    </select>
                    <select onChange={(e) => handleState(e)} className= {style.select}>
                        <option value="default" hidden>Select State</option>
                        <option key={0} value="false">Incomplete</option>
                        <option key={1} value="true">Complete</option>
                    </select>
                    {errors.state && <p className={style.errors}>{errors.state}</p>}
                    <div className={style.buttons}>
                    {!errors.Title && !errors.State && !errors.Description ? (<div><button type="submit" className= {style.buttonCreate2}>Create TODO</button></div>) : (<div><button type="submit" disabled = {true} className= {style.buttonCreate}>Create TODO </button></div>)}
                    </div>
                </form>
              </div>
              <div className={style.categories}>
              {todo.Categories.map(el => <div key= {el+Math.random()} className= {style.divtempers}><p>{el}</p><button onClick={() => handleDelete(el)} className= {style.buttonDelete}>Delete</button></div>)}
              </div>
            </div>
          </div>
        </div>
        </div>
      );
}