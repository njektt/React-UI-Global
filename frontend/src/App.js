import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import KeyValueTable from './components/Pages/Viewer/KeyValue'
import DataMove from './components/Pages/DataMove/DataMove';

const links = [
  { id: 1, link: "/", title: "Viewer" },
  { id: 2, link: "/page2", title: "Data Move" },
];

const routes = (
  <Routes>
    <Route path='/' element={<KeyValueTable />}/>
    <Route path='/page2' element={<DataMove />}/>
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
