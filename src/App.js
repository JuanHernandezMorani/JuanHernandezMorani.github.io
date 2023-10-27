import './App.css';
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Home from './pages/home/homePage.jsx';
import TodosCreate from './components/form/form.jsx';
import register from './components/register/register.jsx';
import login from './components/login/login.jsx';

function App() {
  
  return (
    <BrowserRouter>
    <div className='App'>
      <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/Create" component={TodosCreate}/>
          <Route path="/Register" component={register}/>
          <Route path="/Login" component={login}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
