import {Switch, Route} from 'react-router-dom'
import UserBar from './user_related/UserBar';
import NavBar from './NavBar';
import LoginForm from './user_related/LoginForm';
import Home from './Home'
import SignupForm from './user_related/SignupForm';
import StoryTable from './story_related/StoryTable';
import NewStoryForm from './story_related/NewStoryForm';
import Story from './story_related/Story'

function App() {
  return (
    <div className="App">
      <NavBar />
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
        <Route path='/stories/:id'>
          <Story />
        </Route>
        <Route path='/stories/new'>
          <NewStoryForm />
        </Route>
        <Route path='/stories'>
          <StoryTable />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
