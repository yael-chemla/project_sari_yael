export default function SearchBar({
  value,
  onChange,
  searchType,
  onSearchTypeChange,
  searchOptions,
  placeholder = "Search...",
  className = "",
}) {
  return (
    <div className={`search-bar-container ${className}`}>
      {/* שדה הקלט לחיפוש */}
      <input
        type={searchType === "id" ? "number" : "text"} // שיפור: משנה את סוג המקלדת בטלפונים כשמחפשים ID
        className="search-input"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />

      {/* בחירת סוג החיפוש - מופיע רק אם הועברו אפשרויות */}
      {searchOptions && (
        <select
          className="search-type-select"
          value={searchType}
          onChange={(e) => onSearchTypeChange(e.target.value)}
        >
          {searchOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}