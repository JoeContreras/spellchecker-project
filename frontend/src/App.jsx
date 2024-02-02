import { Routes, Route } from 'react-router-dom';
import SpellCheck from './pages/SpellCheck';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<SpellCheck />} />
    </Routes>
  );
};

export default App;
