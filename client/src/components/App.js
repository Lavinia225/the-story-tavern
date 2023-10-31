import {Switch, Route} from 'react-router-dom'
import UserBar from './user_related/UserBar';
import LoginForm from './user_related/LoginForm';
import Home from './Home'
import SignupForm from './user_related/SignupForm';

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
        <Route path='/signup'>
          <SignupForm />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
