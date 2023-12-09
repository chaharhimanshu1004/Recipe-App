
import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import { Home } from './pages/home';
import { SavedRecipie } from './pages/saved-recipes';
import { CreateRecipie } from './pages/create-recipes';
import { Auth } from './pages/auth';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route to='/' element={<Home></Home>}  ></Route>
          <Route to='/auth' element={<Auth></Auth>}  ></Route>
          <Route to='/create-recipe' element={<CreateRecipie></CreateRecipie>}  ></Route>
          <Route to='/saved-recipes' element={<SavedRecipie></SavedRecipie>}  ></Route>

          
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
