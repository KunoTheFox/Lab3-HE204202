import { ThemeContext } from "./contexts/ThemeContext";
import { useState, useRef, useEffect } from "react";
import AddStudentInfo from "./components/AddStudentInfo";
import SearchStudent from "./components/SearchStudent";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [major, setMajor] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addStudent = () => {
    if (!name.trim() || !age.trim() || !major.trim()) return;

    if (editingId) {
      setStudents((prev) =>
        prev.map((student) =>
          student.id === editingId
            ? {
                ...student,
                name: name.trim(),
                age: age.trim(),
                major: major.trim(),
              }
            : student
        )
      );
      setEditingId(null);
    } else {
      const newStudent = {
        id: Date.now(),
        name: name.trim(),
        age: age.trim(),
        major: major.trim(),
      };

      setStudents((prev) => [...prev, newStudent]);
    }

    setName("");
    setAge("");
    setMajor("");
    inputRef.current?.focus();
  };

  const handleEdit = (id) => {
    const student = students.find((item) => item.id === id);
    if (!student) return;

    setName(student.name);
    setAge(student.age);
    setMajor(student.major);
    setEditingId(id);
    inputRef.current?.focus();
  };

  const handleDelete = (id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setName("");
      setAge("");
      setMajor("");
    }
  };

  const filteredStudents = students.filter((student) => {
    const matchesName = student.name
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());
    const matchesMajor =
      majorFilter === "all major" || student.major === majorFilter;
    return matchesName && matchesMajor;
  });

  return (
    <ThemeContext.Provider value={{ darkMode }}>
      <div
        style={{
          minHeight: "100vh",
          padding: 20,
          background: darkMode ? "#1e1e1e" : "#f5f5f5",
          color: darkMode ? "#fff" : "#000",
        }}
      > 
        <h2>Student Management</h2>
        <button onClick={() => setDarkMode((prev) => !prev)}>
          {darkMode ? (
            <>Light Mode</>
          ) : (
            <>
              Dark Mode
            </>
          )}
        </button>

        <br />
        <AddStudentInfo
          name={name}
          setName={setName}
          age={age}
          setAge={setAge}
          major={major}
          setMajor={setMajor}
          addStudent={addStudent}
          inputRef={inputRef}
        />
        <br />
        <div style={{ display: "flex", gap: 10, marginTop: 15 }}>
          <SearchStudent value={searchTerm} onChange={setSearchTerm} />
          <select
            style={{
              marginTop:15,
              padding: 8,
              width: 200,
              height:45,
            }}
          >
            <option value="all major">All Major</option>
            <option value="information technology">Information Technology</option>
            <option value="business administration">Business Administration</option>
            <option value="marketing">Marketing</option>
            <option value="software engineering">Software Engineering</option>
          </select>
        </div>

        {filteredStudents.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                background: darkMode ? "#2a2a2a" : "#fff",
              }}
            >
              <thead>
                <tr>
                  <th style={{ border: "1px solid #ccc", padding: 8 }}>ID</th>
                  <th style={{ border: "1px solid #ccc", padding: 8 }}>Name</th>
                  <th style={{ border: "1px solid #ccc", padding: 8 }}>Age</th>
                  <th style={{ border: "1px solid #ccc", padding: 8 }}>Major</th>
                  <th style={{ border: "1px solid #ccc", padding: 8 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>
                      {student.id}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>
                      {student.name}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>
                      {student.age}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>
                      {student.major}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>
                      <button
                        onClick={() => handleEdit(student.id)}
                        style={{ marginRight: 8, padding: "6px 10px" }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(student.id)}
                        style={{ padding: "6px 10px" }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
           <p>Total Students: {filteredStudents.length}</p>
          </div>
        )}
      </div>
    </ThemeContext.Provider>
  );
}

export default App;