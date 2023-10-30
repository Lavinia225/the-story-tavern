import {Switch, Route} from 'react-router-dom'
import UserBar from './user_related/UserBar';
import LoginForm from './user_related/LoginForm';
import Home from './Home'

function App() {
  return (
    <div className="App">
      <UserBar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/login'>
          <LoginForm />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
