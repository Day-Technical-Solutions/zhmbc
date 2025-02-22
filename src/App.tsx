import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import NoPage from "./components/NoPage";
import Events from "./components/Events";
import Members from "./components/Members";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/members" element={<Members />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  );
}
