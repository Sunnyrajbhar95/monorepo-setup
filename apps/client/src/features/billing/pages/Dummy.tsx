import React from "react";

function Dummy() {
  const handleClick = async () => {
    const response = await fetch("http://localhost:3000/data", {headers:{x:"123"}});
    const data = await (await response).json();
    console.log(data);
  };
  const handlePostClick = async () => {
    const response = await fetch("http://localhost:3000/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "Hello, World!" }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
      >
        Click me
      </button>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handlePostClick}
      >
        click post
      </button>
    </div>
  );
}

export default Dummy;
