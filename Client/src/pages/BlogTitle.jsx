import React, { useState } from "react";
import { Sparkles, Hash } from "lucide-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const BlogTitle = () => {
  const blogCategories = [
    "General",
    "Technology",
    "Business",
    "Health",
    "Travel",
    "Food",
    "Lifestyle",
    "Education",
  ];

  const [selectedCategory, setSelectedCategory] = useState(
    blogCategories[0]
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!input.trim()) {
      toast.error("Please enter a topic.");
      return;
    }

    try {
      setLoading(true);

      const token = await getToken();

      const prompt = `Generate 5 catchy blog titles for the topic "${input}" in the category "${selectedCategory}".`;

      const { data } = await axios.post("/api/ai/generate-blog-title",
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setContent(data.content);
        toast.success("Titles generated successfully!");
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to generate titles."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto p-6 flex flex-wrap gap-4 text-slate-700">
      {/* Left Side */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg bg-white p-5 rounded-lg border border-gray-200 shadow-sm"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-purple-600" />
          <h1 className="text-xl font-semibold">AI Title Generator</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Keyword</p>

        <input
          type="text"
          placeholder="The future of Artificial Intelligence..."
          className="w-full mt-2 p-3 border border-gray-300 rounded-md outline-none focus:border-purple-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />

        <p className="mt-5 text-sm font-medium">Category</p>

        <select
          className="w-full mt-2 p-3 border border-gray-300 rounded-md bg-purple-100 text-purple-700 outline-none"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {blogCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg flex justify-center items-center gap-2 hover:opacity-90 disabled:opacity-70"
        >
          {loading ? (
            <>
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Generating...
            </>
          ) : (
            <>
              <Hash className="w-5 h-5" />
              Generate Titles
            </>
          )}
        </button>
      </form>

      {/* Right Side */}
      <div className="w-full max-w-lg bg-white p-5 rounded-lg border border-gray-200 shadow-sm min-h-[450px] flex flex-col">
        <div className="flex items-center gap-3">
          <Hash className="w-5 h-5 text-purple-600" />
          <h1 className="text-xl font-semibold">Generated Titles</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="flex flex-col items-center gap-4 text-gray-400">
              <Hash className="w-10 h-10 text-purple-500" />
              <p className="text-center">
                Click on <b>"Generate Titles"</b> to create AI blog titles.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-4 flex-1 overflow-y-auto">
            <div className="prose prose-sm max-w-none">
              <Markdown>{content}</Markdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogTitle;