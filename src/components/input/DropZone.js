import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";

const DropZone = ({
  onSelected,
  className,
  title,
  subTitle,
  subTitleStyle,
  titleStyle,
  icon,
}) => {
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
    onSelected(files);
    // eslint-disable-next-line
  }, [acceptedFiles, files]);
  return (
    <div
      {...getRootProps({
        className: `cursor-pointer flex flex-col justify-center items-center rounded-square bg-caak-liquidnitrogen ${
          className && className
        }`,
      })}
    >
      <input {...getInputProps()} />
      {icon && icon}
      <span className={`${titleStyle}`}>{title}</span>
      <span className={`${subTitleStyle}`}>{subTitle}</span>
    </div>
  );
};

export default DropZone;
