import * as React from "react";
import axios from "axios";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Card } from "@mui/material";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { Divider } from "@mui/material";

export default function UsageGlobalList(props) {
	const [globalList, setGlobalList] = React.useState("");

	React.useEffect(() => {
		axios.get(process.env.REACT_APP_API_URL + "/api/getGlobalUsageList").then((response) => {
			setGlobalList(response.data);
		});
	}, []);

	return (
		<Box>
			<Typography sx={{ mt: 2, mb: 1, textAlign: "left" }} variant="h6" component="div">
				Global usage
			</Typography>
			<Card>
				<List sx={{ maxHeight: 285, overflow: "auto" }} component="nav" aria-label="secondary mailbox folder">
					<Divider />
					{globalList &&
						globalList.map((item) => (
							<div key={item.globalname}>
								<ListItemButton
									selected={item.globalname === props.selectedGlobal}
									onClick={(event) => props.setSelectedGlobal(item.globalname)}
									sx={{ flexDirection: "column", alignItems: "flex-start" }}
								>
									<ListItemText primary={item.globalname} />
									<Typography fontSize={12}>{item.usedby}</Typography>
								</ListItemButton>
								<Divider />
							</div>
						))}
				</List>
			</Card>
		</Box>
	);
}
