import './App.css';
import UnitsTable from './UnitsTable';
import AddUnit from './AddUnit';
import {
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UnitsTable />} />
      <Route path="/addUnit" element={<AddUnit />} />
    </Routes>
  );
}

export default App;
