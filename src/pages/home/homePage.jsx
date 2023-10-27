import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos, getUsers, getCategories, orderTodoByName, filterTodoByCategory, filterTodoByStatus} from '../../actions';
import NavBar from '../../components/bars/nav/nav.jsx';
import SearchBar from "../../components/bars/search/search.jsx";
import CardUI from '../../components/cards/cards.jsx';
import './homePage.css';
import loadingIMG from './loading.gif';

export default function Home(){
    const dispatch = useDispatch();
    const allTodos = useSelector(state => state.Todos);
    const allCategories = useSelector(state => state.Categories);
    const [currentPage, setCurrentPage] = useState(1);
    const [todosPerPage] = useState(10);
    const indexLastTodo = currentPage * todosPerPage;
    const indexFirstTodo = indexLastTodo - todosPerPage;
    const currentTodos = allTodos.slice(indexFirstTodo,indexLastTodo);
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        document.getElementById('pages').value = 0;
    }
    const [order, setOrder] = useState('');
    const [charge, setCharge] = useState(false);

    setTimeout(() => {
        console.log(order)
        }, 2592000000);
    useEffect(() => {
        setCharge(true);
        dispatch(getTodos());
        dispatch(getCategories());
        dispatch(getUsers());
        setTimeout(() => {
        setCharge(false);
        }, 4000);
    }, [dispatch]);
    function handleCategory(e){
        e.preventDefault();
        dispatch(filterTodoByCategory(e.target.value));
        setCurrentPage(1);
    }
    function handleStatus(e){
        e.preventDefault();
        dispatch(filterTodoByStatus(e.target.value));
        setCurrentPage(1);
    }
    function handleName(e){
        e.preventDefault()
        dispatch(orderTodoByName(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
    }
    const maxPage = Math.ceil(allTodos.length / todosPerPage);
    const pages = [];
    for(let p = 1; p <= maxPage; p++){
        pages.push(p);
    }

    const handleReset = (e) => {
        e.preventDefault();
        dispatch(getTodos());
        dispatch(getCategories());
        dispatch(getUsers());
        document.getElementById('category').value = 'All';
        document.getElementById('state').value = 'Both';
        document.getElementById('order').value = 'default';
        document.getElementById('pages').value = 0;
        setTimeout(() => {
            setCurrentPage(1);
          }, 10);
    }

    return (
        <div className="conteiner">
            <NavBar/>
            <SearchBar currentPage = {() => setCurrentPage(1)} />
              <div className = "innerConteiner">
              <button type= "submit" onClick={(e) => handleReset(e)} className= "button">Reset</button>
              &nbsp;
               <select id='order' defaultValue="default" onChange={e => handleName(e)} className= "select" >
                <option value="default">Alphabetical Order: None</option>
                <option value = "asc">A - Z</option>
                <option value = "desc">Z - A</option>
               </select>
               <select id='state' defaultValue = "Both" onChange={e => handleStatus(e)} className= "select">
                <option value="Both">State: Both</option>
                <option value = {false}>Incomplete TODOs</option>
                <option value = {true}>Complete TODOs</option>
            </select>
            <select id='category' defaultValue = "All" onChange={e => handleCategory(e)} className= "select">
                <option value="All">Filter by category: None</option>
                {
                    allCategories?.map(category => (
                        <option key={category.id} value={category.name} >{category.name}</option>
                    ))
                }
            </select>
            <select id='pages' defaultValue={0} className= "select" onChange={(e) => paginate(e.target.value)} >
            <option value={0} hidden>Go to page</option>
                {pages?.map(n => 
                    <option key={n} value={n}>{n}</option> 
                )}
            </select>
            <div className= "pg">
        <button  onClick={()=>{ if(currentPage > 1) paginate(currentPage - 1)}}>
          &laquo; Previous
        </button>
        &nbsp;
        <span>Page {currentPage} of {maxPage > 0 ? maxPage : 1} </span>
        &nbsp;
        <button onClick={()=> { if(currentPage < maxPage) paginate(Number(currentPage) + 1)}}>
          Next &raquo;
        </button>
      </div>
      <div className= "cardsContainer">
                        {charge && currentTodos.length === 0 ? 
                        <img src={loadingIMG} alt="loading"/>:
                    
                        currentTodos?.map(t => {
                    return (
                        <div key={t.id}>
                            
                            {
                    <CardUI key={t.id}
                    name= {t.title}
                    category= {t.Categories.map(c => c.name)}
                    description= {t.description}
                    state= {t.status}
                    id= {t.id} />
                            }
                        </div>
                        )})
            } 
            { currentTodos.length === 0 && !charge ?  <h1><br/><br/><br/>No TODOs found</h1> : null }
            </div>
            <div className= "pg">
        <button  onClick={()=>{ if(currentPage > 1) paginate(currentPage - 1)}}>
          &laquo; Previous
        </button>
        &nbsp;
        <span>Page {currentPage} of {maxPage > 0 ? maxPage : 1} </span>
        &nbsp;
        <button onClick={()=> { if(currentPage < maxPage) paginate(Number(currentPage) + 1)}}>
          Next &raquo;
        </button>
      </div>
              </div>
        </div>
    );

}