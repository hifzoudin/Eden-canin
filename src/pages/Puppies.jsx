import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PuppyCard from "../components/PuppyCard";
import { useI18n } from "../context/LanguageContext";
import { useStore } from "../context/StoreContext";
import { loc } from "../translations";

export default function Puppies() {
  const { t, lang } = useI18n();
  const { puppies, breeds, loading } = useStore();
  const [params] = useSearchParams();
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    breed: params.get("race") || "",
    variety: "",
    sex: "",
    color: "",
    status: "",
    price: "",
    age: ""
  });

  const varieties = [...new Set(puppies.map((p) => loc(p.variety, lang)).filter(Boolean))];
  const colors = [...new Set(puppies.map((p) => loc(p.color, lang)).filter(Boolean))];

  const list = useMemo(() => {
    return puppies.filter((p) => {
      if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false;
      if (filters.breed && p.breed !== filters.breed) return false;
      if (filters.variety && loc(p.variety, lang) !== filters.variety) return false;
      if (filters.sex && p.sex !== filters.sex) return false;
      if (filters.color && loc(p.color, lang) !== filters.color) return false;
      if (filters.status && p.status !== filters.status) return false;
      if (filters.price === "lt1500" && p.price >= 1500) return false;
      if (filters.price === "1500-1700" && (p.price < 1500 || p.price > 1700)) return false;
      if (filters.price === "gt1700" && p.price <= 1700) return false;
      if (filters.age === "young" && p.ageWeeks > 10) return false;
      if (filters.age === "older" && p.ageWeeks <= 10) return false;
      return true;
    });
  }, [puppies, query, filters, lang]);

  const set = (key) => (e) => setFilters((prev) => ({ ...prev, [key]: e.target.value }));
  const reset = () => {
    setQuery("");
    setFilters({ breed: "", variety: "", sex: "", color: "", status: "", price: "", age: "" });
  };

  return (
    <section className="page puppies-page">
      <div className="page-header">
        <h1>{t.puppies.title}</h1>
        <p>{t.puppies.intro}</p>
      </div>
      <div className="filters">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t.puppies.search} />
        <select value={filters.breed} onChange={set("breed")}>
          <option value="">{t.puppies.breed} — {t.puppies.all}</option>
          {(breeds || []).map((breed) => (
            <option key={breed.slug} value={breed.slug}>{loc(breed.name, lang)}</option>
          ))}
        </select>
        <select value={filters.variety} onChange={set("variety")}>
          <option value="">{t.puppies.variety} — {t.puppies.all}</option>
          {varieties.map((v) => <option key={v} value={v}>{v}</option>)}
        </select>
        <select value={filters.sex} onChange={set("sex")}>
          <option value="">{t.puppies.sex} — {t.puppies.all}</option>
          <option value="female">{t.sex.female}</option>
          <option value="male">{t.sex.male}</option>
        </select>
        <select value={filters.color} onChange={set("color")}>
          <option value="">{t.puppies.color} — {t.puppies.all}</option>
          {colors.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={filters.price} onChange={set("price")}>
          <option value="">{t.puppies.price} — {t.puppies.all}</option>
          <option value="lt1500">&lt; 1 500 €</option>
          <option value="1500-1700">1 500 – 1 700 €</option>
          <option value="gt1700">&gt; 1 700 €</option>
        </select>
        <select value={filters.age} onChange={set("age")}>
          <option value="">{t.puppies.age} — {t.puppies.all}</option>
          <option value="young">≤ 10 {t.puppies.weeks}</option>
          <option value="older">&gt; 10 {t.puppies.weeks}</option>
        </select>
        <select value={filters.status} onChange={set("status")}>
          <option value="">{t.puppies.availability} — {t.puppies.all}</option>
          <option value="available">{t.status.available}</option>
          <option value="pending">{t.status.pending}</option>
          <option value="sold">{t.status.sold}</option>
        </select>
        <button type="button" className="btn btn-ghost" onClick={reset}>{t.puppies.reset}</button>
      </div>
      {loading ? null : list.length === 0 ? (
        <p className="empty">{t.puppies.empty}</p>
      ) : (
        <div className="puppy-grid">
          {list.map((puppy) => <PuppyCard key={puppy.id} puppy={puppy} />)}
        </div>
      )}
    </section>
  );
}
