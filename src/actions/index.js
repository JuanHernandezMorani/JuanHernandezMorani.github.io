import axios from "axios";
import Swal from 'sweetalert2';



export function getTodos(){
    return async function(dispatch){
        try{
        const response = await axios.get("https://ensolverschallenge.onrender.com/todo")
        dispatch({
            type: "GET_TODOS",
            payload: response.data
        })}
        catch(error){
            console.log(error);
        }
    }
}
export function getUsers(){
    return async function(dispatch){
        try{
        const response = await axios.get("https://ensolverschallenge.onrender.com/user")
        dispatch({
            type: "GET_USERS",
            payload: response.data
        })}
        catch(error){
            console.log(error);
        }
    }
}
export function getUserById(id){
    return async function(dispatch){
        try{
        const response = await axios.get(`https://ensolverschallenge.onrender.com/user/${id}`)
        return dispatch({
            type: "GET_USER_BY_ID",
            payload: response.data
        })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error 404',
                text: 'User info dont found, see if that user id is correct.'
            })
        }
    }
}
export function getCategories(){
    return async function(dispatch){
        try{
        const response = await axios.get("https://ensolverschallenge.onrender.com/category")
        dispatch({
            type: "GET_CATEGORIES",
            payload: response.data
        })}
        catch(error){
            console.log(error);
        }
    }
}
export function getTodoByName(name){
    return async function(dispatch){
        try {
            const response = await axios.get(`https://ensolverschallenge.onrender.com/todo?title=${name}`)
            return dispatch({
                type: "GET_TODO_BY_NAME",
                payload: response.data
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error 404',
                text: 'TODO dont found'
            })
        }
    }
}
export function postTodo(payload){
    return async function(){
        try{
            console.log(payload);
            const response = await axios.post("https://ensolverschallenge.onrender.com/todo", payload)
            return response
        }catch(error){
            Swal.fire({
                icon: 'error',
                title: 'Error 412',
                text: 'Cant create todo',
                footer: 'See if name is already created!'
            })
        }
    }
}
export function UserRegister(payload) {
    return async function (dispatch) {
      try {
        const newUser = await axios.post("https://ensolverschallenge.onrender.com/user/register", payload);
        return newUser;
      } catch (err) {
        console.log(err);
      }
    };
}
export function LoginUser(payload) {
    return async function (dispatch) {
      const LoginUser = await axios.post("https://ensolverschallenge.onrender.com/user/login", payload);
      localStorage.setItem("UserLogin", JSON.stringify(LoginUser.data));
      return dispatch({
        type: "LOGIN_USER",
        payload: "LOGGED IN USER",
      });
    };
}
  export function ExitSession() {
    return async function (dispatch) {
      await axios.get("https://ensolverschallenge.onrender.com/logout");
      localStorage.removeItem("UserLogin");
      dispatch({
        type: "EXIT_SESSION",
        payload: "Guest",
      });
    };
}
export function getTodoDetail(id) {
    return async function(dispatch){
        try{
        const response = await axios.get(`https://ensolverschallenge.onrender.com/todo/${id}`)
        return dispatch({
            type: "GET_TODO_DETAIL",
            payload: response.data
        })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error 404',
                text: 'TODO info dont found, see if that TODO exist first.'
            })
        }
    }
}
export function orderTodoByName(payload){
    return {
        type: "ORDER_TODO_BY_NAME",
        payload
    }
}
export function filterTodoByCategory(payload){
    return {
        type: "FILTER_TODO_BY_CATEGORY",
        payload
    }
}
export function filterTodoByStatus(payload){
    return {
        type: "FILTER_TODO_BY_STATUS",
        payload
    }
}
export function updateTodo(id, updatedTodo) {
    return async function (dispatch) {
      try {
        console.log(updatedTodo);
        const response = await axios.put(`https://ensolverschallenge.onrender.com/todo/update/${id}`, updatedTodo);
        if (response.status === 200 || response.status === 304) {
            await dispatch({
                type: 'TODO_UPDATED',
                payload: response.data,
              });
            Swal.fire({
                icon: 'success',
                title: 'TODO Updated',
                text: 'TODO updated successfully.',
              }).then(() => {
                //window.location.reload();
          });
        }        
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.response.data.message || 'Hubo un error al actualizar el TODO.',
        });
      }
    };
}
export function markTodo(id, state) {
    return async function (dispatch) {
      try {
        const response = await axios.put(`https://ensolverschallenge.onrender.com/todo/${id}`, state);
        if (response.status === 200 || response.status === 304) {
            await dispatch({
                type: "MARK_TODO_UPDATE",
                payload: response.data,
              })
          Swal.fire({
            icon: 'success',
            title: 'TODO marked',
            text: 'TODO marked successfully.',
          }).then(() => {
                window.location.reload();
          });
        }
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Fatal Error",
          text: err,
        });
      }
    };
  }
export function removeTodo(id){
    return async function(dispatch){
        try{        
        const response = await axios.delete(`https://ensolverschallenge.onrender.com/deleted/${id}`);
        return dispatch({
            type: "REMOVE_TODO",
            payload: response.data
        })}
        catch(error){
            Swal.fire({
                icon: 'error',
                title: 'Error 412',
                text: 'Cant delete TODO',
                footer: 'Check if TODO id is correct, and try again'
            })
        }
    }
}
export function clearDetail(){
    return {
        type: "CLEAR_DETAIL"
    }
}