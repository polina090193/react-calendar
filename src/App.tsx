import { useEffect } from 'react';
import './App.css';
import Calendar from "./components/Calendar/Calendar"

const App: React.FC = () => {
  useEffect(() => {
    document.title = 'Calendar';
  }, []);

  return (
    <div className="app">
      <Calendar />
    </div>
  );
}

export default App;
