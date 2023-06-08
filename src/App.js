import Register from './components/Register';
import Login from './components/Login';
import { Routes, Route } from "react-router-dom";
import { Layout } from './Layout';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<Register />} />
        <Route path="unauthorized" element={<Register />} />

        {/* Protected routes */}
        <Route path="/" element={<Register />} />
        <Route path="editor" element={<Register />} />
        <Route path="admin" element={<Register />} />
        <Route path="lounge" element={<Register />} />

        {/* Catch all */}
        <Route path="*" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;