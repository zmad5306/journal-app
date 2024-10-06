import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function EntryForm({ initialEntry = { title: "", body: "" }, onSave }) {
  const [entry, setEntry] = useState(initialEntry);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntry({ ...entry, [name]: value });
  };

  const handleSave = () => {
    if (!entry.title || !entry.body) {
      setError("Title and Body are required.");
      return;
    }
    onSave(entry);
    navigate("/");
  };

  const handleCancel = () => {
    if (
      window.confirm(
        "Are you sure you want to cancel? Changes will not be saved."
      )
    ) {
      navigate("/");
    }
  };

  return (
    <div>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          name="title"
          value={entry.title}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Body</label>
        <textarea
          className="form-control"
          name="body"
          value={entry.body}
          onChange={handleChange}
        ></textarea>
      </div>
      {error && <p className="text-danger">{error}</p>}
      <button className="btn btn-success" onClick={handleSave}>
        Save
      </button>
      <button className="btn btn-secondary ms-2" onClick={handleCancel}>
        Cancel
      </button>
    </div>
  );
}

export default EntryForm;
