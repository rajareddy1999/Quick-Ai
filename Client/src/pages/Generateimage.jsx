import React, { useState } from "react";
import { Sparkles, Hash, Image } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import toast from "react-hot-toast";
import FormData from "form-data";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Generateimage = () => {
  const imageStyles = [
    "Realistic style",
    "Ghibli style",
    "Cartoon style",
    "Anime style",
    "Pixel Art",
    "3D Render",
    "Watercolor",
    "Oil Painting",
    "Digital Art",
    "Fantasy",
    "Sci-Fi",
    "Cyberpunk",
    "Steampunk",
    "Surrealism",
    "Pop Art",
    "Minimalist",
    "Abstract",
    "Concept Art",
    "Character Design",
    "Landscape",
    "Architecture",
  ];

  const [selectedStyle, setSelectedStyle] = useState("Realistic style");
  const [input, setInput] = useState("");
  const [publish, setPublish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!input.trim()) {
      toast.error("Please enter an image description.");
      return;
    }

    try {
      setLoading(true);

      const token = await getToken();

      const prompt = `Generate an image based on the description "${input}" in the style "${selectedStyle}".`;

      const { data } = await axios.post("/api/ai/generate-image",
        {
          prompt,
          publish,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setContent(data.content);
        toast.success("Image generated successfully!");
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to generate image."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto p-6 flex flex-wrap gap-4 text-slate-700">
      {/* Left */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg bg-white p-5 rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-green-600" />
          <h1 className="text-xl font-semibold">AI Image Generator</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Describe your Image</p>

        <textarea
          rows={4}
          placeholder="Describe the image you want to generate..."
          className="w-full mt-2 p-3 border border-gray-300 rounded-md outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />

        <p className="mt-5 text-sm font-medium">Style</p>

        <select
          value={selectedStyle}
          onChange={(e) => setSelectedStyle(e.target.value)}
          className="w-full mt-2 p-3 border border-gray-300 rounded-md bg-green-50 text-green-700"
        >
          {imageStyles.map((style) => (
            <option key={style} value={style}>
              {style}
            </option>
          ))}
        </select>

        <div className="my-6 flex items-center gap-2">
          <label className="relative cursor-pointer">
            <input
              type="checkbox"
              checked={publish}
              onChange={(e) => setPublish(e.target.checked)}
              className="sr-only peer"
            />

            <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-green-500 transition"></div>

            <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-5"></span>
          </label>

          <p className="text-sm">Make this image public</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Generating...
            </>
          ) : (
            <>
              <Image className="w-5 h-5" />
              Generate Image
            </>
          )}
        </button>
      </form>

      {/* Right */}
      <div className="w-full max-w-lg bg-white p-5 rounded-lg border border-gray-200 min-h-[420px] flex flex-col">
        <div className="flex items-center gap-3">
          <Image className="w-5 h-5 text-green-600" />
          <h1 className="text-xl font-semibold">Generated Image</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-center text-gray-400 flex flex-col items-center gap-4">
              <Image className="w-10 h-10 text-purple-500" />
              <p>Click on "Generate Image" to create your image.</p>
            </div>
          </div>
        ) : (
          <div className="mt-5 flex-1 flex justify-center items-center">
            <img
              src={content}
              alt="Generated"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Generateimage;