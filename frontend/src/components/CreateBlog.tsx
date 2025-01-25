import axios from "axios";
import { ChangeEvent, useState } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center w-4xl ">
      <div className="text-5xl">
        {" "}
        <input
          placeholder="Title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="p-2 w-full text-gray-900 rounded-xl focus:outline-none border border-gray-200 "
        ></input>{" "}
      </div>
      <div className="text-3xl mt-4">
        {" "}
        <textarea
          placeholder="Content"
          onChange={(e) => {
            setContent(e.target.value);
          }}
          className="p-2 w-full h-56 text-gray-900 rounded-xl border border-gray-200 focus:outline-none"
        ></textarea>{" "}
      </div>
      <div className="mt-5">
        <button
          onClick={async () => {
            const res = await axios.post(
              `${BACKEND_URL}/api/v1/blog`,
              {
                title: title,
                content: content,
              },
              {
                headers: {
                  Authorization: localStorage.getItem("token"),
                },
              }
            );
            navigate(`/blog/${res.data.id}`);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold  p-2 rounded-md"
        >
          Publish
        </button>
      </div>
    </div>
  );
};
