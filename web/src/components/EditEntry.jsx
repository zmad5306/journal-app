import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EntryForm from "./EntryForm";

function EditEntry() {
  const { id } = useParams();
  const [initialEntry, setInitialEntry] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/secure/entry/" + id)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((fetchedEntry) => setInitialEntry(fetchedEntry))
      .catch((error) => {
        console.error("Error fetching entry", error);
        alert("Entry not found");
        navigate("/");
      });
  }, [id, navigate]);

  const handleSave = (updatedEntry) => {
    updatedEntry.id = id;
    fetch("/secure/entry", {
      method: "PATCH",
      body: JSON.stringify(updatedEntry),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error adding entry", error);
        alert("Saving entry failed");
      });
  };

  return (
    <div>
      <h1>Edit Journal Entry</h1>
      {initialEntry ? (
        <EntryForm initialEntry={initialEntry} onSave={handleSave} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default EditEntry;
