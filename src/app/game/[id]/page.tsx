import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  return <div>Game Page {params.id}</div>;
};

export default page;
