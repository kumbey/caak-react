import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";

const DropZone = ({ onSelected }) => {
  const [files, setFiles] = useState([]);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    accept: "image/*, video/*",
    noKeyboard: true,
    noClick: false,
    multiple: true,
  });

  useEffect(() => {
    onSelected(acceptedFiles);
  }, [acceptedFiles, onSelected]);

  return (
    <div
      {...getRootProps({
        className:
          "cursor-pointer custom-file-upload flex flex-col justify-center items-center rounded-square bg-caak-liquidnitrogen  w-full h-64 ",
      })}
    >
      <input {...getInputProps()} />
      <span
        className={"items-center text-caak-generalblack font-medium text-18px"}
      >
        Зураг/Видео нэмэх
      </span>
      <span className={" text-caak-aleutian text-14px"}>
        эсвэл шууд чирэн оруулна уу
      </span>
    </div>
  );
};

export default DropZone;
