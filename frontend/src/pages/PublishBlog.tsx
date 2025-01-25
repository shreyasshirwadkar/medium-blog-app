import { Appbar } from "../components/Appbar";
import { CreateBlog } from "../components/CreateBlog";
export const PublishBlog = () => {
  return (
    <div>
      <Appbar />
      <div className="p-14 flex justify-center">
        <CreateBlog/>
      </div>
    </div>
  );
};
