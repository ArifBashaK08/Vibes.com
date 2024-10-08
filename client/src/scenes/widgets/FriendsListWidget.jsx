import { Box, Typography, useTheme } from "@mui/material";
import { Friend, WidgetWrapper } from "../../components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../../state";

const FriendsListWidget = ({ id, apiURL }) => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;

  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const getFriends = async () => {
    try {
      const response = await fetch(`${apiURL}/users/${id}/friends`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch friends");
      }

      const data = await response.json();
      dispatch(setFriends({ friends: data }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFriends();
  }, [id, token, apiURL]); // Added dependencies to avoid potential infinite loop

  return (
    <WidgetWrapper>
      <Typography
        color={dark}
        variant="h4"
        fontWeight={700}
        sx={{ mb: "1.5rem" }}
      >
        My Friends
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        gap="1.5rem"
      >
        {friends.length > 0 ? (
          friends.map(({ _id, firstName, lastName, occupation, imgLink }) => (
            <Friend
              hideTime={friends}
              key={_id}
              friendId={_id}
              name={`${firstName} ${lastName}`}
              subtitle={occupation}
              userImgLink={imgLink}
              apiURL={apiURL}
            />
          ))
        ) : (
          <Typography
            color={medium}
            variant="h5"
            fontWeight={600}
            textAlign="center"
            sx={{ mb: "1.5rem" }}
          >
            No friends found :(
          </Typography>
        )}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendsListWidget;
