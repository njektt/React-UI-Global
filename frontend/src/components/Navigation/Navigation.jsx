import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Routes, Route, Link } from "react-router-dom";

const drawerWidth = 240;

export default function PermanentDrawerLeft(props) {
	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
				<Toolbar sx={{ backgroundColor: "white", color: "black" }}>
					<Typography variant="h6" noWrap component="div">
						React-UI-Global
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
				}}
			>
				<Toolbar />
				<Box sx={{ overflow: "auto" }}>
					<List>
						{props.links.map((item) => (
							<Link style={{ textDecoration: "none", color: "black" }} key={item.id} to={item.link}>
								<ListItem button key={item.title}>
									<ListItemText primary={item.title} />
								</ListItem>
							</Link>
						))}
					</List>
				</Box>
			</Drawer>
			<Box component="main" sx={{ flexGrow: 1, p: 2.5, backgroundColor: "#F6F8FA" }}>
				<Toolbar />
				{props.routes}
			</Box>
		</Box>
	);
}
