export default function Select({ value, onChange, options = [], className = "" }) {
  return (
    <select
      className={`generic-select ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {/* בדיקה אם יש אופציות לפני הרינדור כדי למנוע שגיאות */}
      {options.length > 0 ? (
        options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))
      ) : (
        <option disabled>No options available</option>
      )}
    </select>
  );
}