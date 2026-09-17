import { createContext, useContext, useEffect, useState } from "react";
import { getContent, getPublicSettings, getPuppies } from "../../public/api/store";

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [settings, setSettings] = useState(null);
  const [puppies, setPuppies] = useState([]);
  const [content, setContent] = useState({ testimonials: [], kennelPhotos: [] });
  const [loading, setLoading] = useState(true);

  function refresh() {
    setSettings(getPublicSettings());
    setPuppies(getPuppies());
    setContent(getContent());
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <StoreContext.Provider value={{ settings, puppies, content, loading, refresh }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
