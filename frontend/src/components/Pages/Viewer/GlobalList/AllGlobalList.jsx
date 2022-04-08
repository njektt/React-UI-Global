import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Card } from "@mui/material";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { Divider } from "@mui/material";
import { CircularProgress } from "@mui/material";

export default function UsageGlobalList(props) {
	return (
		<Box>
			<Typography sx={{ mt: 2, mb: 1, textAlign: "left" }} variant="h6" component="div">
				Global List
			</Typography>
			<Card>
				<List sx={{ maxHeight: 670, overflow: "auto" }} component="nav">
					{props.globalList &&
						props.globalList.map((item) => (
							<div key={item.name}>
								<ListItemButton
									selected={item.name === props.selectedGlobal}
									onClick={(event) => props.setSelectedGlobal(item.name)}
									sx={{ flexDirection: "column", alignItems: "flex-start" }}
								>
									<ListItemText primary={item.name} />
									<Typography fontSize={12}>{item.usedby}</Typography>
								</ListItemButton>
								<Divider />
							</div>
						))}

					{props.globalList === "" && <CircularProgress />}
				</List>
			</Card>
		</Box>
	);
}
