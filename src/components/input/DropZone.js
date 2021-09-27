import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import awsExports from "../../aws-exports"

const DropZone = ({
  onSelected,
  className,
  title,
  subTitle,
  subTitleStyle,
  titleStyle,
  icon,
}) => {
  const [dropZoneFiles, setDropZoneFiles] = useState([]);
  const [data, setData] = useState([])
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: setDropZoneFiles,
    accept: "image/*, video/*",
    noKeyboard: true,
    noClick: false,
    multiple: true,
  });

  useEffect(() => {
    if((data.length + dropZoneFiles.length) > 10){
      alert("maxFiles 10 files")
    }else{
        let files = []

        dropZoneFiles.map((file, index) => {
            let fileData = {
                    ext: getFileExt(file.name),
                    name: getFileName(file.name),
                    key: file.name,
                    type: file.type,
                    url: URL.createObjectURL(file),
                    bucket: awsExports.aws_user_files_s3_bucket,
                    region: awsExports.aws_user_files_s3_bucket_region,
                    level: 'public',
            }

            // if(post.length <= 0 && index === 0){
            //     postData.featured = true
            // }
            files.push(fileData)
            return true
        })

        setData(files)
    }
    // eslint-disable-next-line
  }, [dropZoneFiles]);

  useEffect(() => {
    onSelected(data)
    // eslint-disable-next-line
  },[data])

  const getFileExt = (fileName) => {
    return fileName.substring(fileName.lastIndexOf('.') + 1)
  }

  const getFileName = (fileName) => {
      return fileName.replace("." + getFileExt(fileName), '')
  }

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
