import React from "react";
import EntryForm from "./EntryForm";

function NewEntry() {
  const handleSave = (newEntry) => {
    newEntry.createdDate = new Date().toLocaleString();
    fetch("/secure/entry", {
      method: "PUT",
      body: JSON.stringify(newEntry),
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
      <h1>New Journal Entry</h1>
      <EntryForm onSave={handleSave} />
    </div>
  );
}

export default NewEntry;
