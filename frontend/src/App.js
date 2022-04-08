import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import KeyValueTable from './components/Pages/Viewer/index'
import DocDB from './components/Pages/DocDB';

const links = [
  { id: 1, link: "/", title: "Viewer" },
  { id: 2, link: "/docdb", title: "Document store" },
];

const routes = (
  <Routes>
    <Route path='/' element={<KeyValueTable />}/>
    <Route path='/docdb' element={<DocDB />}/>
  </Routes>
)

function App() {
  return (
    <div className="App">
      <Navigation links={links} routes={routes}/>
    </div>
  );
}

export default App;
