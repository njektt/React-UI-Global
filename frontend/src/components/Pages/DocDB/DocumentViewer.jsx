import { Card, ListItem } from "@mui/material";
import { Box } from "@mui/system";
import ReactJson from "react-json-view";
import { List } from "@mui/material";
import * as React from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import JsonEditorForm from "./Forms/JsonEditorForm";
import { Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import DropItemForm from "./Forms/DropItemForm";

export default function DocumentViewer(props) {
	const [data, setData] = React.useState("");
	const [dropConfig, setDropConfig] = React.useState("");
	const [openDropForm, setOpenDropForm] = React.useState(false);

	const updateData = () => {
		if (props.selectedNamespace !== "" && props.selectedCollection.length !== 0) {
			axios
				.post(process.env.REACT_APP_API_URL + "/api/docdb/getDocuments", {
					namespace: props.selectedNamespace,
					database: props.selectedCollection.database,
					collection: props.selectedCollection.collection,
				})
				.then((response) => {
					setData(
						response.data.data.map((item) => {
							return {
								_id: item.id,
								value: JSON.parse(item.value),
							};
						})
					);
				});
		} else {
			setData("");
		}
	};

	const dropDocument = (id) => {
		setDropConfig({
			bodyRequest: {
				database: props.selectedCollection.database,
				collection: props.selectedCollection.collection,
				id: id,
				namespace: props.selectedNamespace,
			},
			url: process.env.REACT_APP_API_URL + "/api/docdb/dropDocument",
			formBody: "Do you really want to drop Document ?",
			formTitle: "Drop Document",
		});
		setOpenDropForm(!openDropForm);
	};

	React.useEffect(() => {
		updateData();
	}, [props.selectedCollection, props.selectedNamespace]);

	return (
		<Box sx={{ maxHeight: "100vh", overflow: "auto" }}>
			{data && (
				<Paper sx={{ p: 2, position: "fixed", zIndex: 1000, borderRadius: 0, left: 540, right: 0 }}>
					<Typography
						sx={{ display: "fixed", height: "5vh", textAlign: "left" }}
						variant="h4"
						component="div"
					>
						{props.selectedCollection.length !== 0 &&
							props.selectedCollection.database + "." + props.selectedCollection.collection}
					</Typography>
					<JsonEditorForm
						updateData={updateData}
						selectedNamespace={props.selectedNamespace}
						selectedCollection={props.selectedCollection}
					/>
					<DropItemForm
						updateGlobalList={updateData}
						config={props}
						dropConfig={dropConfig}
						setDropConfig={setDropConfig}
						openDropForm={openDropForm}
						setOpenDropForm={setOpenDropForm}
					/>
				</Paper>
			)}

			<List sx={{ mt: 20 }}>
				{data &&
					data.map((item) => (
						<ListItem key={item["_id"]}>
							<Card sx={{ p: 2, width: "100%" }}>
								<IconButton
									onClick={() => dropDocument(item["_id"])}
									sx={{ position: "absolute", zIndex: 100, right: 30 }}
								>
									<DeleteIcon sx={{ color: "#b0b0b0" }} />
								</IconButton>
								<ReactJson displayDataTypes={false} name={false} src={item} />
							</Card>
						</ListItem>
					))}
			</List>
		</Box>
	);
}
