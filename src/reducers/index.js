const initialState = {
    Todos: [],
    OriginalTodos: [],
    Categories: [],
    Users: [],
    Details: [],
    Status: [],
    user: "Guest"
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case "GET_TODOS":
            return {
                ...state,
                Todos: action.payload,
                OriginalTodos: action.payload
            };
        case "GET_USERS":
            return {
                ...state,
                Users: action.payload
            };
        case "GET_CATEGORIES":
            return {
                ...state,
                Categories: action.payload
            };
        case "GET_TODO_BY_NAME":
            return {
                ...state,
                Todos: action.payload
            };
        case "GET_TODO_DETAIL":
            return {
                ...state,
                Details: action.payload
            };
        case "GET_USER_BY_ID":
            return{
                ...state,
                Details: action.payload
            };
        case "LOGIN_USER":
          return {
          ...state,
          user: "Logged in",
            };
        case "REGISTER_USER":
          return {
          ...state,
      };
        case "EXIT_SESSION":
          return {
            ...state,
            user: "Guest",
          };
        case "ORDER_TODO_BY_NAME":
            console.log(action.payload);
            const todos = [...state.Todos];
            let orderedTodo = [];
            if (action.payload === 'asc') {
                orderedTodo = todos.sort((a, b) => {
                    console.log(a);
                  const nameA = a.title || '';
                  const nameB = b.title || '';
                  return nameA.localeCompare(nameB);
                });
              } else if (action.payload === 'desc') {
                orderedTodo = todos.sort((a, b) => {
                  const nameA = a.title || '';
                  const nameB = b.title || '';
                  return nameB.localeCompare(nameA);
                });
              } else {
                orderedTodo = [...state.OriginalTodos];
              }
            return {
                ...state,
                Todos: orderedTodo
            };
        case "FILTER_TODO_BY_CATEGORY":
            let filterTodos = [...state.OriginalTodos];
            let filteredTodos = filterTodos?.filter(todo => todo.Categories.map(e => e.name)?.includes(action.payload));
            if(action.payload === "All") filteredTodos = [...state.OriginalTodos];
            return {
                ...state,
                Todos: filteredTodos
            };
        case "FILTER_TODO_BY_STATUS":
            let filterTodosStatus = [...state.OriginalTodos];
            let filteredTodosStatus;
            if(action.payload === "Both") filteredTodosStatus = [...state.OriginalTodos];
            else filteredTodosStatus = filterTodosStatus.filter(t => t.status+"" === action.payload);
            return {
                ...state,
                Todos: filteredTodosStatus
            };    
        case "TODO_UPDATED":
            return {
                ...state   
            };
        case "MARK_TODO_UPDATE":
            return {
                ...state
            };
        case "POST_TODO":
            return {
                ...state,
            };
        case "REMOVE_TODO":
            return {
                ...state
            };
        case "CLEAR_DETAIL":
            return {
                ...state,
                Details: []
            };
        default:
            return state;
    }
}
export default rootReducer;