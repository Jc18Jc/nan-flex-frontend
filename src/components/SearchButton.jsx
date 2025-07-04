function SearchButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontSize: "1.5rem",
        background: "transparent",
        border: "none",
        color: "#fff",
        cursor: "pointer",
      }}
    >
      <img
        src="/src/assets/search.png"
        alt="검색"
        style={{ width: "24px", height: "24px" }}
      />
    </button>
  );
}

export default SearchButton;