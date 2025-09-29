import React, { useEffect, useState } from "react";
import { callApi } from "./api";

interface FileBrowserProps {
  alias: string;
}

export default function FileBrowser({ alias }: FileBrowserProps) {
  const [path, setPath] = useState<string[]>([]);
  const [items, setItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function listDirectory(newPath = path) {
    setLoading(true);
    try {
      const res = await callApi({ alias, path: newPath, operation: "ls" });
      setItems(res.items || []);
      setPath(newPath);
    } catch (err) {
      alert("Error listing directory");
    }
    setLoading(false);
  }

  async function createFolder() {
    const name = prompt("Enter folder name:");
    if (!name) return;
    await callApi({ alias, path: [...path, name], operation: "mkdir" });
    listDirectory(path);
  }

  async function createFile() {
    const name = prompt("Enter file name:");
    if (!name) return;
    await callApi({
      alias,
      path,
      operation: "newfile",
      filename: name,
    });
    listDirectory(path);
  }

  async function deleteItem(name: string) {
    const confirmDel = window.confirm(`Delete ${name}?`);
    if (!confirmDel) return;
    const itemPath = [...path];
    if (name.includes(".")) {
      await callApi({
        alias,
        path: itemPath,
        operation: "deletefile",
        filename: name,
      });
    } else {
      await callApi({
        alias,
        path: [...itemPath, name],
        operation: "rmdir",
      });
    }
    listDirectory(path);
  }

  async function renameItem(name: string) {
    const newName = prompt("Enter new name:");
    if (!newName) return;
    await callApi({
      alias,
      path: [...path, name],
      operation: "rename",
      new_name: newName,
    });
    listDirectory(path);
  }

  useEffect(() => {
    listDirectory([]);
  }, [alias]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">File Browser</h2>
      <div className="mb-2">
        <span className="font-mono bg-gray-100 px-2 py-1 rounded">
          /{[alias, ...path].join("/")}
        </span>
      </div>
      <div className="space-x-2 mb-4">
        <button
          onClick={createFolder}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          + Folder
        </button>
        <button
          onClick={createFile}
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          + File
        </button>
        <button
          onClick={() => listDirectory(path)}
          className="bg-gray-400 text-white px-3 py-1 rounded"
        >
          Refresh
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {!loading && (
        <ul className="border p-2 rounded-md">
          {items.length === 0 && <li className="text-gray-500">Empty folder</li>}
          {items.map((item) => (
            <li
              key={item}
              className="flex justify-between items-center border-b last:border-none py-1"
            >
              <span
                className="cursor-pointer text-blue-700"
                onClick={() =>
                  !item.includes(".") &&
                  listDirectory([...path, item])
                }
              >
                {item}
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => renameItem(item)}
                  className="text-yellow-600 hover:underline"
                >
                  Rename
                </button>
                <button
                  onClick={() => deleteItem(item)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
