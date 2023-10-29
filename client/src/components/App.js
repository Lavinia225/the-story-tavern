import {Switch, Route} from 'react-router-dom'
import UserBar from './user_related/UserBar';
import LoginForm from './user_related/LoginForm';

function App() {
  return (
    <div className="App">
      <UserBar />
      <Switch>
        <Route exact path='/'>
          <header className="App-header">
            <p>Haiya! If by some miracle you have obtained the url to this website, know that it is still being created.</p>
          </header>
        </Route>
        <Route path='/login'>
          <LoginForm />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
