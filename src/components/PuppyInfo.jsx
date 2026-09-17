import { useI18n } from "../context/LanguageContext";
import { formatDate, loc } from "../translations";

export default function PuppyInfo({ puppy }) {
  const { t, lang } = useI18n();
  const rows = [
    [t.puppies.breed, t.breedNames[puppy.breed]],
    [t.puppies.variety, loc(puppy.variety, lang)],
    [t.puppies.sex, t.sex[puppy.sex]],
    [t.details.birthDate, formatDate(puppy.birthDate, lang)],
    [t.puppies.age, `${puppy.ageWeeks} ${t.puppies.weeks}`],
    [t.puppies.color, loc(puppy.color, lang)],
    [t.details.size, loc(puppy.size, lang)],
    [t.details.weight, puppy.weight],
    [t.details.location, loc(puppy.location, lang)]
  ];

  return (
    <dl className="puppy-info">
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
