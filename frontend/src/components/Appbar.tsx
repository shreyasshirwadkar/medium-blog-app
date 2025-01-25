import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const Appbar = () => {
  return (
    <div className="flex  shadow-sm justify-between px-10 py-4 ">
      <Link
        to="/blogs"
        className="flex flex-col justify-center font-bold text-xl"
      >
        Medium
      </Link>
      <div className="flex">
        <div>
          <Link to="/publish">
            <button className="py-2 px-5 font-bold text-lg bg-black text-white mr-4 rounded-full">
              Create Post
            </button>
          </Link>
        </div>
        <div className="flex flex-col justify-center">
          {" "}
          <Avatar size={10} name="Shreyas" />{" "}
        </div>
      </div>
    </div>
  );
};
