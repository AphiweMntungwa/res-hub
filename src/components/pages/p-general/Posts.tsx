"use client";

import React, { useState, lazy, Suspense } from "react";
import { Card, CardContent, Typography, IconButton, Avatar, Box, Input } from "@mui/joy";
import { FavoriteBorder, Favorite, ChatBubbleOutline, CommentOutlined, Search } from "@mui/icons-material";
import { motion } from "framer-motion";
import Link from "next/link";
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';

interface User {
  id: number;
  name: string;
  avatar: string;
}

interface Post {
  id: number;
  user: User;
  content: string;
  loves: number;
}

const placeholderPosts: Post[] = [
  { id: 1, user: { id: 1, name: "John Doe", avatar: "" }, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", loves: 5 },
  { id: 2, user: { id: 2, name: "Jane Smith", avatar: "" }, content: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", loves: 3 },
  { id: 3, user: { id: 3, name: "Alice Brown", avatar: "" }, content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", loves: 8 }
];

const FixedInfoCard = () => (
  <Card
    variant="solid"
    sx={{
      backgroundColor: 'transparent',
      position: "fixed",
      left: 50,
      top: '66px',
      width: "320px",
      height: "88vh",
      overflowY: "auto",
      p: 2,
      display: { xs: "none", md: "block" } // Hide on screens smaller than 870px
    }}
  >
    <Typography level="h4" fontWeight="bold" mb={2}>Information</Typography>
    <Typography level="body-md">This is a placeholder information card that stays fixed on the left.</Typography>
  </Card>
);

const PostCard = ({ post }: { post: Post }) => {
  const [loved, setLoved] = useState(false);
  const [loveCount, setLoveCount] = useState(post.loves);

  const toggleLove = () => {
    setLoved(!loved);
    setLoveCount(loveCount + (loved ? -1 : 1));
  };

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300 }}
      style={{ width: "100%", maxWidth: "600px", margin: "5px auto" }}
    >
      <Card variant="outlined" sx={{ p: 2 }}>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <Link href={`/profile/${post.user.id}`} passHref>
            <Avatar src={post.user.avatar} alt={post.user.name} />
          </Link>
          <Link href={`/profile/${post.user.id}`} passHref>
            <Typography level="title-md" fontWeight="bold">
              {post.user.name}
            </Typography>
          </Link>
        </Box>
        <CardContent>
          <Typography level="body-md">{post.content}</Typography>
        </CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton onClick={toggleLove} color={loved ? "danger" : "neutral"}>
              {loved ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
            <Typography>{loveCount}</Typography>
            <IconButton>
              <CommentOutlined />
            </IconButton>
          </Box>
        </Box>
      </Card>
    </motion.div>
  );
};

const AddPostDialog = lazy(() => import("@/components/pages/p-general/AddPost"));

const PostList = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredPosts = placeholderPosts.filter(post =>
    post.content.toLowerCase().includes(search.toLowerCase())
  );

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <Box className="post-card-cover" ml={{ xs: 0, md: "320px" }} mt={2}>
      <Box
        className={"posts-searchbox"}
        mb={2}
        display="flex"
        alignItems="center"
        gap={1}
        sx={{
          position: "sticky",
          top: "64px",
          backgroundColor: "white",
          zIndex: 1000,
          padding: "10px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
        }}
      > <IconButton sx={{ borderRight: '1px solid #ddd', ml: 2 }}>
          <Search />
        </IconButton>
        <Input
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: "100%", maxWidth: "600px" }}
        />
        <IconButton sx={{ borderLeft: '1px solid #ddd', ml: 2 }} onClick={handleClickOpen}>
          <AddTaskOutlinedIcon />
        </IconButton>
      </Box>
      {filteredPosts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
      <Suspense fallback={<div>Loading...</div>}>
        {isDialogOpen && (<AddPostDialog open={isDialogOpen} handleClose={handleClose} />)}
      </Suspense>
    </Box>
  );
};

const App = () => (
  <Box className="post-cover-div" display="flex">
    <FixedInfoCard />
    <PostList />
  </Box>
);

export default App;
