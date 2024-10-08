import {
  EditOutlined, DeleteOutlined,
  AttachFileOutlined, GifBoxOutlined,
  ImageOutlined, MicOutlined, MoreHorizOutlined
} from "@mui/icons-material";
import {
  Box, Divider, Typography, InputBase,
  useTheme, Button, IconButton, useMediaQuery
} from "@mui/material";
import Dropzone from "react-dropzone";
import { FlexBetween, UserImage, WidgetWrapper } from "../../components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setLoading } from "../../state";
import { PropagateLoader } from "react-spinners";

const MyPostWidget = ({ image, apiURL }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [postImage, setPostImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const loading = useSelector((state) => state.loading);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    dispatch(setLoading(true))
    try {
      const formData = new FormData();
      formData.append("userId", _id);
      formData.append("description", post);
      if (postImage) {
        formData.append("file", postImage);
        formData.append("image", postImage.name);
      }
      
      const response = await fetch(`${apiURL}/posts`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      
      if (!response.ok) {
        dispatch(setLoading(false))        
        throw new Error("Failed to create post");
      }
      
      const posts = await response.json();
      dispatch(setPosts({ posts }));
      setPostImage(null);
      dispatch(setLoading(false))        
      setPost("");
    } catch (error) {
      dispatch(setLoading(false))        
      console.error(error);
    }
  };

  return (
    <>
    {loading && 
    <Box sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
        }}>
            <PropagateLoader color="#0091ff" />
        </Box>
    }
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={image} size={"70px"} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setPostImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!postImage ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{postImage.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {postImage && (
                  <IconButton
                    onClick={() => setPostImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
    </>
  );
};

export default MyPostWidget;
