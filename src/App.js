import React, { useState } from "react";

const App = () => {
  const [question, setQuestion] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setSuggestion("");

    try {
      const response = await fetch("http://52.87.156.149:8080/api/suggestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await response.json();
      if (data.suggestion) setSuggestion(data.suggestion);
      else setSuggestion("Error: " + (data.error || "Unknown error"));
    } catch (error) {
      setSuggestion("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Coding Advisor</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <input
          type="text"
          placeholder="Ask a coding question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          {loading ? "Thinking..." : "Get Suggestion"}
        </button>
      </form>
      {suggestion && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800">Suggestion:</h2>
          <p className="text-gray-700 mt-2">{suggestion}</p>
        </div>
      )}
    </div>
  );
};

export default App;
