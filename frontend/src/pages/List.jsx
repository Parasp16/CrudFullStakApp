import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const List = () => {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const res = await axios.get("http://localhost:4000/");
      setList(res.data);
    }
    getData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you Sure?");
    if (!confirmDelete) return;

    await axios.delete(`http://localhost:4000/${id}`);
    alert("Delete Successfully!");
    setList(list.filter((u) => u.id !== id));
  };

  const filteredList = list.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: "1000px", margin: "40px auto", padding: "10px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px", fontSize: "36px", fontWeight: "700", color: "#2B2D42" }}>
        🍎 Fruit Collection
      </h1>

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search fruits..."
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "10px",
          border: "2px solid #ddd",
          marginBottom: "20px",
          fontSize: "16px",
          outline: "none",
        }}
      />

      {/* Add Button */}
      <button
        onClick={() => navigate("/add")}
        style={{
          width: "100%",
          padding: "14px",
          backgroundColor: "#EF233C",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontSize: "18px",
          marginBottom: "25px",
          fontWeight: "600",
          letterSpacing: "1px",
        }}
      >
        + Add New Fruit
      </button>

      {/* Grid Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredList.length > 0 ? (
          filteredList.map((u) => (
            <div
              key={u.id}
              style={{
                padding: "20px",
                borderRadius: "15px",
                backgroundColor: "white",
                boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
                textAlign: "center",
                transition: "0.3s",
              }}
            >
              <img
                src={u.pic}
                alt={u.name}
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "12px",
                  objectFit: "cover",
                  marginBottom: "10px",
                }}
              />

              <h2 style={{ color: "#333", fontSize: "22px", marginBottom: "10px" }}>{u.name}</h2>

              <span
                style={{
                  background: "#2B2D42",
                  padding: "5px 12px",
                  color: "white",
                  borderRadius: "8px",
                  fontSize: "15px",
                }}
              >
                ₹ {u.price}
              </span>

              <div style={{ marginTop: "15px" }}>
                <button
                  onClick={() => navigate(`/update/${u.id}`)}
                  style={{
                    padding: "8px 12px",
                    marginRight: "8px",
                    background: "#3A86FF",
                    border: "none",
                    color: "white",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(u.id)}
                  style={{
                    padding: "8px 12px",
                    background: "#FF006E",
                    border: "none",
                    color: "white",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ gridColumn: "1 / -1", textAlign: "center" }}>No results found</p>
        )}
      </div>
    </div>

  );
};

export default List;
