import React, { useState } from "react";
import { Scissors, Sparkles } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Removeobject = () => {
  const [image, setImage] = useState(null);
  const [object, setObject] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload an image.");
      return;
    }

    if (!object.trim()) {
      toast.error("Please describe the object you want to remove.");
      return;
    }

    try {
      setLoading(true);

      const token = await getToken();

      const formData = new FormData();
      formData.append("image", image);
      formData.append("object", object);

      const { data } = await axios.post("/api/ai/remove-image-object",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        setContent(data.content);
        toast.success("Object removed successfully!");
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to remove object."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto p-6 flex flex-wrap gap-4 text-slate-700">
      {/* Left Panel */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg bg-white p-5 rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl font-semibold">Object Removal</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Upload Image</p>

        <input
          type="file"
          accept="image/*"
          required
          className="w-full mt-2 p-3 border border-gray-300 rounded-md"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <p className="mt-6 text-sm font-medium">
          Describe the object to remove
        </p>

        <textarea
          rows={4}
          required
          value={object}
          onChange={(e) => setObject(e.target.value)}
          placeholder="Example: person, car, tree, bag..."
          className="w-full mt-2 p-3 border border-gray-300 rounded-md outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-gradient-to-r from-[#417df6] to-[#8e37eb] text-white py-3 rounded-lg flex justify-center items-center gap-2"
        >
          {loading ? (
            <>
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Removing...
            </>
          ) : (
            <>
              <Scissors className="w-5 h-5" />
              Remove Object
            </>
          )}
        </button>
      </form>

      {/* Right Panel */}
      <div className="w-full max-w-lg bg-white p-5 rounded-lg border border-gray-200 min-h-[420px] flex flex-col">
        <div className="flex items-center gap-3">
          <Scissors className="w-5 h-5 text-[#8e37eb]" />
          <h1 className="text-xl font-semibold">Processed Image</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-center text-gray-400 flex flex-col items-center gap-4">
              <Scissors className="w-10 h-10 text-[#8e37eb]" />
              <p>Click on "Remove Object" to process your image.</p>
            </div>
          </div>
        ) : (
          <div className="mt-4 flex justify-center items-center flex-1">
            <img
              src={content}
              alt="Processed"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Removeobject;