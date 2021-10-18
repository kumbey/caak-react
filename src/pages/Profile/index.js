import React, { useCallback, useEffect, useState } from "react";
import Button from "../../components/button";
import Card from "../../components/card";
import { useLocation, useParams } from "react-router";
import { getPostByStatus } from "../../graphql-custom/post/queries";
import useInfiniteScroll from "../Home/useFetch";
import { Link } from "react-router-dom";
import Loader from "../../components/loader";
import {
  ApiFileUpload,
  getUserById,
  useListPager,
} from "../../Utility/ApiHelper";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import Dummy from "dummyjs";
import { useDropzone } from "react-dropzone";
import awsExports from "../../aws-exports";
import {
  checkUser,
  getFileExt,
  getFileName,
  getFileUrl,
  getReturnData,
} from "../../Utility/Util";
import { updateUser } from "../../graphql-custom/user/mutation";
import { deleteFile } from "../../graphql-custom/file/mutation";
import { useUser } from "../../context/userContext";
import PostPendingUser from "../Group/PostPendingUser";
import PostArchivedUser from "../Group/PosArchivedUser";
import { onPostByUser } from "../../graphql-custom/post/subscription";

export default function Profile() {
  const [user, setUser] = useState();
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const { user: signedUser } = useUser();
  const [uploading, setUploading] = useState(false);
  const temp = useLocation();
  const [activeIndex, setActiveIndex] = useState(
    temp.state ? temp.state.index : 1
  );

  const [subscriptionPosts, setSubscriptionPosts] = useState(null);
  const subscriptions = {};

  const subscrib = () => {
    let authMode = "AWS_IAM";
    if (checkUser(signedUser)) {
      authMode = "AMAZON_COGNITO_USER_POOLS";
    }
    subscriptions.onPostByGroup = API.graphql({
      query: onPostByUser,
      variables: {
        user_id: userId,
        status: "CONFIRMED",
      },
      authMode: authMode,
    }).subscribe({
      next: (data) => {
        const onData = getReturnData(data, true);
        console.log("onData", onData);
        setSubscriptionPosts(onData);
      },
      error: (error) => {
        console.warn(error);
      },
    });
  };

  useEffect(() => {
    if (setSubscriptionPosts) {
      if (!posts.find((item) => item.id === subscriptionPosts.id))
        console.log(subscriptionPosts);
      setPosts((prev) => [subscriptionPosts, ...prev]);
    }
    // eslint-disable-next-line
  }, [subscriptionPosts]);

  useEffect(() => {
    if (userId) subscrib();
    return () => {
      Object.keys(subscriptions).map((key) => {
        subscriptions[key].unsubscribe();
        return true;
      });
      setPostScroll(null);
    };
    // eslint-disable-next-line
  }, [user]);

  const [nextPosts] = useListPager({
    query: getPostByStatus,
    variables: {
      filter: { user_id: { eq: userId } },
      sortDirection: "DESC",
      status: "CONFIRMED",
      limit: 6,
    },
  });

  const onDrop = useCallback((file) => {
    setProfilePictureDropZone({
      ext: getFileExt(file[0].name),
      name: getFileName(file[0].name),
      key: file[0].name,
      type: file[0].type,
      url: URL.createObjectURL(file[0]),
      bucket: awsExports.aws_user_files_s3_bucket,
      region: awsExports.aws_user_files_s3_bucket_region,
      level: "public",
      obj: file[0],
    });
  }, []);
  const [profilePictureDropZone, setProfilePictureDropZone] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    noKeyboard: true,
    noClick: false,
    multiple: false,
  });
  useEffect(() => {
    const updateProfileImage = async () => {
      try {
        setUploading(true);
        const resp = await ApiFileUpload(profilePictureDropZone);

        await API.graphql(
          graphqlOperation(updateUser, {
            input: {
              id: user.id,
              pic_id: resp.id,
            },
          })
        );
        if (user.pic_id)
          await API.graphql(
            graphqlOperation(deleteFile, {
              input: {
                id: user.pic_id,
              },
            })
          );
        user.pic = resp;
        setProfilePictureDropZone({});
        setUploading(false);
      } catch (ex) {
        setUploading(false);
        console.log(ex);
      }
    };
    if (profilePictureDropZone.name) updateProfileImage();
    // eslint-disable-next-line
  }, [profilePictureDropZone]);

  const [setPostScroll] = useInfiniteScroll(posts, setPosts);
  //FORCE RENDER STATE
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      if (checkUser(signedUser)) {
        getUserById({
          id: userId,
          setUser,
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
      } else {
        getUserById({
          id: userId,
          setUser,
          authMode: "AWS_IAM",
        });
      }
    } catch (ex) {
      console.log(ex);
    }
  }, [signedUser, userId]);

  useEffect(() => {
    fetchPosts(posts, setPosts);
    setPostScroll(fetchPosts);
    // eslint-disable-next-line
  }, []);

  const fetchPosts = async (data, setData) => {
    try {
      if (!loading) {
        setLoading(true);

        let resp = await nextPosts();
        if (resp) {
          setData([...data, ...resp]);
        }

        setLoading(false);
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  return user ? (
    <div>
      <div className="ph:block flex hidden">
        <span />
        <p />
        <div>
          <span />
          <span />
        </div>
      </div>
      <div
        style={{ height: "230px" }}
        className="ph:h-c22 flex items-center justify-center bg-white border-t"
      >
        <div className="md:flex md:justify-around grid justify-center w-full">
          <div className="ph:text-center">
            <div className="ph:grid flex">
              <div className="ph:grid ph:justify-center relative flex items-center justify-center">
                <img
                  style={{ height: "120px", width: "120px" }}
                  alt={user.nickname}
                  src={user.pic ? getFileUrl(user.pic) : Dummy.img("200x200")}
                  className="ph:w-c31 ph:h-c31 rounded-full cursor-pointer"
                />
                {uploading && (
                  <Loader
                    containerClassName={"absolute"}
                    className={"bg-caak-primary"}
                  />
                )}
                {signedUser?.sysUser?.id === userId && (
                  <>
                    <div
                      {...getRootProps()}
                      className={`flex justify-center items-center cursor-pointer transition ease-linear duration-200 absolute rounded-full opacity-0 hover:opacity-100  w-full h-full  left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2`}
                    >
                      {!uploading && (
                        <>
                          <span className={"icon-fi-rs-thick-add"} />
                          <input {...getInputProps()} />
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
              <div className="ph:grid ph:justify-center ph:mt-3 sm:ml-c6">
                <p
                  style={{ marginBlockStart: "13px" }}
                  className="text-26px ph:hidden font-bold"
                >
                  {user.firstname}
                </p>
                <p className="text-18px text-caak-generalblack ph:justify-center flex items-center font-normal">
                  @{user.nickname}
                  <span
                    style={{ marginInlineStart: "4px" }}
                    className="icon-fi-rs-verified text-13px text-caak-buttonblue"
                  />
                </p>
                <div className="mt-b4 flex">
                  <span className="flex items-center">
                    <p className="text-18px text-caak-generalblack font-medium">
                      {user.aura || "0"}
                    </p>{" "}
                    <p
                      style={{ marginInlineStart: "4px" }}
                      className="text-15px text-caak-darkBlue"
                    >
                      Аура
                    </p>
                  </span>
                  <span className="mx-c11 ph:mx-a2 flex items-center">
                    <p className="text-18px text-caak-generalblack font-medium">
                      {user.totals.followers}
                    </p>{" "}
                    <p
                      style={{ marginInlineStart: "4px" }}
                      className="text-15px text-caak-darkBlue"
                    >
                      дагагчид
                    </p>
                  </span>
                  <span className="flex items-center">
                    <p className="text-18px text-caak-generalblack font-medium">
                      {user.totals.confirmed}
                    </p>{" "}
                    <p
                      style={{ marginInlineStart: "4px" }}
                      className="text-15px text-caak-darkBlue"
                    >
                      пост
                    </p>
                  </span>
                </div>
              </div>
            </div>
            <p className="text-15px text-caak-generalblack mt-a2 sm:mt-c11">
              {user.about}
            </p>
          </div>
          <div>
            <div className="md:justify-center flex justify-end">
              {checkUser(signedUser) && userId === signedUser.sysUser.id ? (
                <Link
                  to={{
                    pathname: `/user/${user.id}/settings`,
                  }}
                >
                  <div className="h-c13 px-c1 flex items-center rounded-lg shadow cursor-pointer">
                    <span className="pr-a1 icon-fi-rs-settings text-18px" />
                    <p className="text-15px font-medium">Тохиргоо</p>
                  </div>
                </Link>
              ) : null}
              <span
                style={{ width: "49px", marginInlineStart: "10px" }}
                className="h-c13 text-4px icon-fi-rs-dots text-caak-generalblack flex items-center justify-center rounded-lg shadow cursor-pointer"
              />
            </div>
            <div className="md:mt-10 flex justify-center py-4">
              <span
                style={{ marginInlineEnd: "14px" }}
                className="icon-fi-rs-ig text-caak-blue cursor-pointer"
              />
              <span
                style={{ marginInlineEnd: "14px" }}
                className="icon-fi-rs-fb text-caak-blue cursor-pointer"
              />
              <span
                style={{ marginInlineEnd: "14px" }}
                className="icon-fi-rs-tiktok text-caak-blue cursor-pointer"
              />
              <span className="icon-fi-rs-tw text-caak-blue cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-c2 flex items-center justify-around w-full">
        <div className="flex flex-col md:flex-row">
          <Button
            key={1}
            onClick={() => setActiveIndex(1)}
            className={`text-15px h-c32 text-caak-primary mr-a1 hover:bg-caak-titaniumwhite flex items-center justify-center font-bold  rounded-lg 
                                    ${
                                      1 === activeIndex
                                        ? "bg-white shadow"
                                        : "bg-transparent text-caak-generalblack"
                                    }`}
          >
            <span className="icon-fi-rs-drag text-20px mr-a1" />

            <p className="text-17px ml-b1 font-medium">
              {checkUser(signedUser) && userId === signedUser.sysUser.id
                ? "Миний постууд"
                : "Хэрэглэгчийн постууд"}
            </p>
          </Button>
          {checkUser(signedUser) && userId === signedUser.sysUser.id ? (
            <>
              <Button
                key={2}
                onClick={() => setActiveIndex(2)}
                className={`text-15px h-c32 text-caak-primary mr-a1 hover:bg-caak-titaniumwhite flex items-center justify-center font-bold  rounded-lg 
                                    ${
                                      2 === activeIndex
                                        ? "bg-white shadow"
                                        : "bg-transparent text-caak-generalblack"
                                    }`}
              >
                <span className="icon-fi-rs-settings text-22px" />
                <p className="text-17px ml-b1 font-medium">
                  Хүлээгдэж буй постууд
                </p>
              </Button>
              <Button
                key={3}
                onClick={() => setActiveIndex(3)}
                className={`text-15px h-c32 text-caak-primary mr-a1 hover:bg-caak-titaniumwhite flex items-center justify-center font-bold  rounded-lg 
                                    ${
                                      3 === activeIndex
                                        ? "bg-white shadow"
                                        : "bg-transparent text-caak-generalblack"
                                    }`}
              >
                <span className="icon-fi-rs-bookmark text-20px mr-a1" />
                <p className="text-17px ml-b1 font-medium">
                  Архивлагдсан постууд
                </p>
              </Button>
            </>
          ) : null}
        </div>
        <select className="md:block text-15px w-c132 text-caak-generalblack hidden font-semibold bg-transparent border-0 cursor-pointer">
          <option>Илүү ихийг</option>
          <option>Илүү ихийг</option>
          <option>Илүү ихийг</option>
        </select>
      </div>
      <div className="flex justify-center">
        {/* post */}
        <div className="grid_container_container flex flex-col justify-center w-full">
          {/* contents */}
          <div
            className={`grid-container mt-b5  justify-center ${
              activeIndex === 1 ? "" : "hidden"
            }`}
          >
            {posts.map((data, index) => {
              return (
                <Card
                  key={index}
                  video={data.items.items[0].file.type.startsWith("video")}
                  post={data}
                  className="ph:mb-4 sm:mb-4"
                />
              );
            })}
            <Loader
              containerClassName={"self-center"}
              className={`bg-caak-primary ${
                loading ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
          <div
            className={`flex mt-b5  justify-center ${
              activeIndex === 2 ? "" : "hidden"
            }`}
          >
            <PostPendingUser userId={userId} />
            <Loader
              containerClassName={"self-center"}
              className={`bg-caak-primary ${
                loading ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
          <div
            className={`flex mt-b5  justify-center ${
              activeIndex === 3 ? "" : "hidden"
            }`}
          >
            <PostArchivedUser userId={userId} />
            <Loader
              containerClassName={"self-center"}
              className={`bg-caak-primary ${
                loading ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
