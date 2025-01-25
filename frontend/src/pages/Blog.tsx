import { useBlog } from "../hooks";
import { IndividualBlog } from "../components/IndividualBlog";
import { useParams } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { BlogSkeleton } from "../components/BlogSkeleton";
export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });
  if (loading) {
    return <div className="h-screen">
    <Appbar />
    <div className="p-12 ">
      <BlogSkeleton/>
    </div>
  </div>
  }
  return (
    <div className="h-screen">
      <Appbar />
      <div className="p-12  flex flex-col justify-center h-full ">
        <IndividualBlog blog={blog} />
      </div>
    </div>
  );
};
