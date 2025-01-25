export const BlogSkeleton = () => {
  return (
    <div role="status" className=" animate-pulse">
      <div className="max-w-screen-md w-screen p-4 ">
        <div className="flex">
          <div className="flex flex-col justify-center">
            <div className="h-3.5 bg-gray-200 rounded-full w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>

            <div className="h-2 bg-gray-200 rounded-full  max-w-[360px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>

            <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
          </div>
          <div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full  max-w-[300px] mb-2.5"></div>

          <div className="h-2 bg-gray-200 rounded-full  max-w-[300px] mb-2.5"></div>
        </div>
        <div className="h-2 bg-gray-200 rounded-full  max-w-[360px]"></div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
