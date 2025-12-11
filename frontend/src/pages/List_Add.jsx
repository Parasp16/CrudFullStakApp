import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const List_Add = () => {
  const [name, setName] = useState("")
  const [pic, setPic] = useState("")
  const [price, setPrice] = useState("")

  const navigate = useNavigate()

  const validate = () => {
    let errors = []

    // Name: only letters and spaces
    if (!/^[A-Za-z\s]+$/.test(name)) {
      errors.push("Name must contain only letters.")
    }

    // Pic: basic URL check
    try {
      new URL(pic)
    } catch (_) {
      errors.push("Image URL is invalid.")
    }

    // Price: must be a positive number
    if (isNaN(price) || Number(price) <= 0) {
      errors.push("Price must be a positive number.")
    }

    if (errors.length > 0) {
      alert(errors.join("\n"))
      return false
    }

    return true
  }

  function addData(e) {
    e.preventDefault()

    if (!validate()) return

    axios.post("http://localhost:4000/", { name, pic, price })
      .then(() => {
        alert("Added Successfully")
        setName("")
        setPic("")
        setPrice("")
        navigate("/")
      })
      .catch(err => console.log(err))
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
      <form
        onSubmit={addData}
        style={{
          padding: "30px",
          width: "340px",
          borderRadius: "15px",
          background: "#F8F9FA",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#333", marginBottom: "20px", fontWeight: "600" }}>
          Add a New Fruit 🍉
        </h2>

        {[{ v: name, set: setName, p: "Enter Fruit Name" },
        { v: pic, set: setPic, p: "Enter Image URL" },
        { v: price, set: setPrice, p: "Enter Price", type: "number" }].map((inp, i) => (
          <input
            key={i}
            type={inp.type || "text"}
            value={inp.v}
            placeholder={inp.p}
            onChange={(e) => inp.set(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "10px",
              border: "2px solid #ddd",
              fontSize: "15px",
              outline: "none"
            }}
          />
        ))}

        <input
          type="submit"
          value="Add Fruit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#48BFE3",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "17px",
            fontWeight: "600",
            marginTop: "10px",
          }}
        />
      </form>
    </div>

  )
}

export default List_Add
