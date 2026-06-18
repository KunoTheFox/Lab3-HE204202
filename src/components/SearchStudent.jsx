export default function SearchStudent({ value, onChange }) {
  return (
    <input
      value={value}
      placeholder="Search student by name"
      onChange={(e) => onChange(e.target.value)}
      style={{
        padding: 8,
        width: "100%",
        maxWidth: 300,
        marginTop: 15,
        marginBottom: 15,
      }}
    />
  );
}
