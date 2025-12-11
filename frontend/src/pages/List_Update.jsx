import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const List_Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    pic: "",
    price: ""
  });

  useEffect(() => {
    axios.get(`http://localhost:4000/${id}`).then((res) => {
      setForm({
        name: res.data.name,
        pic: res.data.pic,
        price: res.data.price
      });
    });
  }, [id]);

  const validate = () => {
    let errors = [];

    // Name: only letters and spaces
    if (!/^[A-Za-z\s]+$/.test(form.name)) {
      errors.push("Name must contain only letters.");
    }

    // Pic: basic URL check
    try {
      new URL(form.pic);
    } catch (_) {
      errors.push("Image URL is invalid.");
    }

    // Price: must be a positive number
    if (isNaN(form.price) || Number(form.price) <= 0) {
      errors.push("Price must be a positive number.");
    }

    if (errors.length > 0) {
      alert(errors.join("\n")); // show all errors in one alert
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    await axios.put(`http://localhost:4000/${id}`, form);
    alert("Update Successfully!");
    navigate("/");
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "90vh",
      background: "linear-gradient(135deg, #F72585, #4CC9F0)"
    }}>
      <div style={{
        width: "350px",
        padding: "30px",
        borderRadius: "20px",
        backdropFilter: "blur(12px)",
        background: "rgba(255,255,255,0.2)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
        color: "white",
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "25px" }}>Update Fruit</h2>

        {["name", "pic", "price"].map((field) => (
          <input
            key={field}
            type={field === "price" ? "number" : "text"}
            value={form[field]}
            placeholder={`Enter ${field}`}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "none",
              marginBottom: "15px",
              fontSize: "15px",
              outline: "none",
            }}
          />
        ))}

        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            background: "#3A0CA3",
            color: "white",
            border: "none",
            fontSize: "17px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Save Changes
        </button>
      </div>
    </div>

  );
};

export default List_Update;
