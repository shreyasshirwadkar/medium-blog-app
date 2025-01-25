import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: number;
}
export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  id,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="max-w-screen-md w-screen p-4 border-b-1 border-slate-400">
        <div className="flex">
          <div className="flex flex-col justify-center">
            <Avatar name={authorName} />
          </div>
          <div className="pl-2 text-xs flex flex-col justify-center text-gray-400">
            &#9679;
          </div>

          <div className="font-medium pl-2">{authorName}</div>
          <div className="pl-2 text-xs flex flex-col justify-center text-gray-400">
            &#9679;
          </div>
          <div className="pl-2 text-slate-500">{publishedDate}</div>
        </div>
        <div className="font-bold text-2xl pt-2">{title}</div>
        <div className="text-xl font-medium ">
          {content.slice(0, 100) + "..."}
        </div>
        <div className="text-sm text-slate-500 pt-2">{`${Math.ceil(
          content.length / 100
        )} minute ago`}</div>
      </div>
    </Link>
  );
};

export const Avatar = ({ name }: { name: string; size?: number }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center w-5 h-5 overflow-hidden rounded-full bg-gray-600`}
    >
      <span className="text-sm font-bold text-white ">
        {name[0].toUpperCase()}
      </span>
    </div>
  );
};
