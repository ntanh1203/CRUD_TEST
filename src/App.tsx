import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import MiniDrawer from "./components/MiniDrawer";
import HomePage from "./page/home";
import NewsPage from "./page/news";
import NewsDetailsPage from "./page/news/details";
import NotFoundPage from "./page/not-found";

function App() {
  const [isDrawer, setIsDrawer] = useState(false);

  return (
    <MiniDrawer
      isOpen={isDrawer}
      onClose={() => setIsDrawer(false)}
      onOpen={() => setIsDrawer(true)}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/create" element={<NewsDetailsPage />} />
        <Route path="/news/:action/:id" element={<NewsDetailsPage />} />

        {/* Redirect to 404 if route does not match */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MiniDrawer>
  );
}

export default App;
