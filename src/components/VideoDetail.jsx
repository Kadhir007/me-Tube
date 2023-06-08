import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Typography, Box, Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import Videos from "./Videos";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import ReactPlayer from "react-player";

const VideoDetail = () => {
  const [videoDetail, setvideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setvideoDetail(data.items[0])
    );
    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => setVideos(data.items)
    );
  }, [id]);
  if (!videoDetail?.snippet) return "Loading...;";
  console.log("video", videoDetail);
  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    <Box minHeight="92vh">
      <Stack direction={{ xs: "column", sm: "row" }} >
        <Box flex={1} sx>
        <Box
          sx={{
            width: "100%",
            position: "sticky",
            top: "80px",
            zIndex: 1, // Set a higher zIndex to ensure the video player is above other elements
          }}
        >
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${id}`}
            className="react-player"
            controls
            playing
            style={{
              position: "sticky",
              top: 0,
              height: "100%", // Set the height to occupy the full available space
              width: "100%", // Set the width to occupy the full available space
              "@media (max-width: 768px)": {
                position: "static",
              },
            }}
          />

            <Typography color="#fff" variant="h5" fontweight="bold" p={2}>
              {title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              py={1}
              px={2}
              fontSize={"15px"}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography
                  variant={{ sm: "subtitle1", md: "h7" }}
                  color="#fff"
                  style={ {whiteSpace: "nowrap"}}
                >
                  {channelTitle}
                  
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography
                  variant="body1"
                  style={ {whiteSpace: "nowrap"}}
                  sx={{
                    opacity: 0.7,
                    fontSize: {
                      xs: "11px", // for small devices
                      md: "13px", // for medium devices and above
                    },
                  }}
                >
                  {parseInt(viewCount).toLocaleString()}{" "}
                  <span style={{ color: "#FC1503", paddingLeft: "5px" }}>
                    Views
                  </span>
                </Typography>

                <Typography
                  variant="body1"
                  style={ {whiteSpace: "nowrap"}}
                  sx={{
                    opacity: 0.7,
                    fontSize: {
                      xs: "11px", // for small devices
                      md: "14px", // for medium devices and above
                    },
                  }}
                >
                  {parseInt(likeCount).toLocaleString()}
                  <span style={{ color: "#FC1503", paddingLeft: "7px" }}>
                    Likes
                  </span>
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box
          px={"1.5rem"}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
          maxWidth={"377px"}
        >
          {videos && <Videos videos={videos} direction="column" />}
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
