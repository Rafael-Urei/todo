"use client";

import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import Link from "next/link";
import { Logo } from "../Logo";
import { useRef, useState } from "react";
import { Settings, User2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { Home, Label, Task } from "@mui/icons-material";

export function Header() {
  const avatarRef = useRef(null);

  const [open, setOpen] = useState<boolean>(false);

  const pathname = usePathname();

  return (
    <Paper
      component={"header"}
      elevation={0}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        paddingY: 2,
        paddingX: 12,
      }}
    >
      <Box
        component={"div"}
        sx={{ display: "flex", alignItems: "center", gap: 10 }}
      >
        <Link href="/">
          <Logo />
        </Link>
        <Box component={"nav"}>
          <List component={"ul"} sx={{ display: "flex", gap: 2 }}>
            <Link href="/">
              <ListItemButton
                selected={pathname === "/"}
                sx={{ display: "flex", alignItems: "center", gap: 2 }}
              >
                <Home />
                <ListItemText>Home</ListItemText>
              </ListItemButton>
            </Link>
            <Link href="/all-tasks">
              <ListItemButton
                selected={pathname === "/all-tasks"}
                sx={{ display: "flex", alignItems: "center", gap: 2 }}
              >
                <Task />
                <Badge variant="dot">
                  <ListItemText>All</ListItemText>
                </Badge>
              </ListItemButton>
            </Link>
            <Link href="/sticky-wall">
              <ListItemButton
                selected={pathname === "/sticky-wall"}
                sx={{ display: "flex", alignItems: "center", gap: 2 }}
              >
                <Label />
                <Badge variant="dot">
                  <ListItemText>Sticky Wall</ListItemText>
                </Badge>
              </ListItemButton>
            </Link>
          </List>
        </Box>
      </Box>
      <Box>
        <Button ref={avatarRef} onClick={() => setOpen((prev) => !prev)}>
          <Avatar></Avatar>
        </Button>
        <Popper
          open={open}
          placement="bottom-start"
          anchorEl={avatarRef?.current}
          sx={{}}
        >
          <Paper sx={{ width: 200 }}>
            <MenuList>
              <MenuItem sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {" "}
                <User2 /> Profile
              </MenuItem>
              <Divider></Divider>
              <MenuItem sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {" "}
                <Settings /> Settings
              </MenuItem>
              <Divider></Divider>
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Paper>
        </Popper>
      </Box>
    </Paper>
  );
}
