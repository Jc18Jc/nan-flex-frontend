function CreateButton({ onClick, label = "등록" }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "0.5rem 1rem",
        backgroundColor: "#444",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      {label}
    </button>
  );
}

export default CreateButton;