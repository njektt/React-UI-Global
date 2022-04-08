import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";

const drawerWidth = 240;

export default function PermanentDrawerLeft(props) {
	return (
		<Box sx={{ display: "flex" }}>
			<Drawer
				variant="permanent"
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
				}}
			>
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
			<Box component="main" sx={{ flexGrow: 1, backgroundColor: "#F6F8FA" }}>
				{props.routes}
			</Box>
		</Box>
	);
}
