import React, { ChangeEvent } from "react";
// import { readBuilderProgram } from "typescript";

const PostImage: React.FC = () => {
  const imageHander = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) {
      return;
    }
    const file = event.target.files[0];
    if (file === null) {
      return;
    }
    let imgTag = document.getElementById("preview") as HTMLImageElement;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result: string = reader.result as string;
      imgTag.src = result;
    };
  };
  return (
    <div>
      <input
        type="file"
        accept="image/png, image/jpeg, image/gif"
        onChange={imageHander}
      />
      <img id="preview" src="" />
    </div>
  );
};

export default PostImage;
