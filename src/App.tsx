import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes";
import './index.css'
function App() {
  return (
    <Router>
      <Routes>
        {routes.map(({ path, component: Component }, index) => (
          <Route key={index} path={path} element={<Component />} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
