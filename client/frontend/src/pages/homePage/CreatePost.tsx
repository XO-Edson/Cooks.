import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InitialState, setPosts } from "../../ReduxContext/context";
import noProfile from "../../assets/no-profile-picture-icon-13.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faPaperclip, faTrash } from "@fortawesome/free-solid-svg-icons";
import Dropzone from "react-dropzone";

type stateType = {
  auth: InitialState;
};

function CreatePosts() {
  const dispatch = useDispatch();
  const [post, setPost] = useState("");
  const [image, setImage] = useState<any>(null);
  const [isImage, isSetImage] = useState(false);
  const { token, user } = useSelector((state: stateType) => state.auth);

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", user?._id || "");
    formData.append("description", post || "");

    /* if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    } */

    const response = await fetch("https://cooks-server.vercel.app/post", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const posts = await response.json();

    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
  };

  return (
    <section className="bg-slate-900 p-2 rounded-md h-fit ">
      <div className="flex mb-3 items-center">
        <div>
          <img
            src={
              !user?.picturePath
                ? noProfile
                : `https://cooks-server.vercel.app/assets/${user.picturePath}`
            }
            alt="userImg"
            className="object-cover h-[60px] w-[60px] rounded-full mr-10"
          />
        </div>
        <textarea
          rows={3}
          placeholder="Create post..."
          className="rounded-3xl text-black outline-none border-none p-2 h-11 resize-none w-full overflow-hidden ml"
          value={post}
          onChange={(e) => setPost(e.target.value)}
        ></textarea>
      </div>
      {isImage ? (
        <Dropzone
          multiple={false}
          onDrop={(acceptedFiles) => {
            console.log(acceptedFiles);
            setImage(acceptedFiles[0]);
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section className="input col-span-2 h-20 ">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {!image ? (
                  <p>(image feature under maintainance...)</p>
                ) : (
                  <p>{image.name}</p>
                )}
              </div>
              {image && (
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => setImage(null)}
                  className=" mt-6"
                />
              )}
            </section>
          )}
        </Dropzone>
      ) : (
        ""
      )}
      <hr className=" border-gray-700" />

      <div className=" flex items-center justify-around mt-2">
        <p onClick={() => isSetImage(!isImage)} className=" cursor-pointer">
          <FontAwesomeIcon icon={faImage} />
          Image
        </p>
        <p>
          <FontAwesomeIcon icon={faPaperclip} />
          Attachment
        </p>

        <button
          disabled={!post}
          className=" px-4 py-2 bg-orange-700 rounded-2xl cursor-pointer"
          onClick={handlePost}
        >
          POST
        </button>
      </div>
    </section>
  );
}

export default CreatePosts;
