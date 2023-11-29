import {Routes, Route} from 'react-router-dom'
import UserBar from './user_related/UserBar';
import NavBar from './NavBar';
import LoginForm from './user_related/LoginForm';
import Home from './Home'
import SignupForm from './user_related/SignupForm';
import StoryTable from './story_related/StoryTable';
import NewStoryForm from './story_related/NewStoryForm';
import StoryPage from './story_related/StoryPage'
import GenreList from './genre_related/GenreList';
import GenrePage from './genre_related/GenrePage'

function App() {
  return (
    <div className="App">
      <NavBar />
      <UserBar />
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/signup' element={<SignupForm/>}/>
        <Route path='/stories/new' element={<NewStoryForm/>}/>
        <Route path='/stories/:id/*' element={<StoryPage/>}/>
        <Route path='/stories' element={<StoryTable/>}/>
        <Route path='/genres/:id/*' element={<GenrePage/>}/>
        <Route path='/genres' element={<GenreList/>}/>
      </Routes>
    </div>
  );
}

export default App;
