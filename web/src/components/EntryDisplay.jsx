import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function EntryForm({ initialEntry = { title: "", body: "" } }) {
  const [entry, setEntry] = useState(initialEntry);
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="mb-3">
        <h3>{entry.title}</h3>
        <p>{entry.body}</p>
      </div>
      <button className="btn btn-secondary" onClick={handleCancel}>
        Back
      </button>
    </div>
  );
}

export default EntryForm;
