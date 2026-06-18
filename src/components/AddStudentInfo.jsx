export default function AddStudentInfo({
  name,
  setName,
  age,
  setAge,
  major,
  setMajor,
  addStudent,
  inputRef,
}) {
  return (
    <>
      <input
        ref={inputRef}
        value={name}
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addStudent();
          }
        }}
        style={{
          padding: 8,
          width: 250,
          marginRight: "10px",
          marginTop: "15px",
        }}
      />
      <input
        value={age}
        placeholder="Age"
        onChange={(e) => setAge(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addStudent();
          }
        }}
        style={{
          padding: 8,
          width: 250,
          marginRight: "10px",
        }}
      />

      <input
        value={major}
        placeholder="Major"
        onChange={(e) => setMajor(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addStudent();
          }
        }}
        style={{
          padding: 8,
          width: 250,
          marginRight: "10px",
        }}
      />

      <button
        onClick={addStudent}
        style={{
          marginLeft: 10,
          padding: 8,
        }}
      >
        Add Student
      </button>
    </>
  );
}
