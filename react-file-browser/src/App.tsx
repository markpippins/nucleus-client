import React, { useState } from "react";
import FileBrowser from "./FileBrowser";

function App() {
  const [alias, setAlias] = useState("user123");
  const [activeAlias, setActiveAlias] = useState("");

  return (
    <div className="max-w-2xl mx-auto p-6">
      {!activeAlias && (
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Login</h1>
          <input
            className="border p-2 w-full"
            placeholder="Enter alias..."
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setActiveAlias(alias)}
          >
            Enter
          </button>
        </div>
      )}
      {activeAlias && <FileBrowser alias={activeAlias} />}
    </div>
  );
}

export default App;
