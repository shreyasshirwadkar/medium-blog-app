import { Blog } from "../hooks";
import { Avatar } from "./BlogCard";

export const IndividualBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div className="grid grid-cols-12   h-full ">
      <div className="flex flex-col   col-span-8">
        <div className="font-extrabold text-5xl">{blog.title}</div>
        <div className="text-gray-500 text-lg mt-4 ">Posted on 26th January 2025</div>
        <div className="text-xl mt-6 ">{blog.content}</div>
      </div>
      <div className="col-span-4 flex flex-col">
        <div className="text-xl font-bold text-gray-500">Author</div>
        <div className="flex mt-4">
          <div className="pr-4 flex flex-col justify-center">
            <Avatar name={blog.author.name} />
          </div>
          <div>
            {" "}
            <div className="font-extrabold text-3xl">{blog.author.name}</div>
            <div className="text-xl text-gray-500  max-w-2xs mt-4">
              {" "}
              I Really like Lionel Messi. I love football.
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};
