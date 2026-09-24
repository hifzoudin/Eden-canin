import { createContext, useContext, useEffect, useState } from "react";
import { supabase, supabaseConfigured } from "../lib/supabase";
import { getBreeds, getContent, getPublicSettings, getPuppies } from "../lib/store";

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [settings, setSettings] = useState(null);
  const [puppies, setPuppies] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [content, setContent] = useState({ testimonials: [], kennelPhotos: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function refresh() {
    if (!supabaseConfigured) {
      setError("config");
      setLoading(false);
      return Promise.resolve();
    }
    return Promise.all([getPublicSettings(), getPuppies(), getContent(), getBreeds()])
      .then(([nextSettings, nextPuppies, nextContent, nextBreeds]) => {
        setSettings(nextSettings);
        setPuppies(nextPuppies);
        setContent(nextContent);
        setBreeds(nextBreeds);
        setError("");
      })
      .catch(() => setError("load"))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    const timer = setTimeout(() => refresh(), 0);
    const channel = supabase.channel("store-sync")
      .on("postgres_changes", { event: "*", schema: "public", table: "puppies" }, () => refresh())
      .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, () => refresh())
      .on("postgres_changes", { event: "*", schema: "public", table: "settings" }, () => refresh())
      .subscribe();
    return () => {
      clearTimeout(timer);
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <StoreContext.Provider value={{ settings, puppies, breeds, content, loading, error, refresh }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
