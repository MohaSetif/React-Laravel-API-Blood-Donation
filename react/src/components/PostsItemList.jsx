import React from "react";

export default function PostsItemList({ post }) {
  return (
    <div className="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[350px]">
      <img
        src={post.image_url}
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <h4 className="mt-4 text-lg font-bold">{post.title}</h4>
      <div
        dangerouslySetInnerHTML={{ __html: post.description }}
        className="overflow-hidden flex-1"
      ></div>
      <div className="text-xl">
        {post.created_at}
      </div>
    </div>
  );
}
