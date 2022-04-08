import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, fontSize } from "@mui/system";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function DropItemForm(props) {
	const [openInsertForm, setOpenInsertForm] = React.useState(false);
	const [jsonValue, setJsonValue] = React.useState(JSON.stringify({ key: "value" }));

	const handleClickAction = () => {
		setOpenInsertForm(!openInsertForm);
	};

	const handleClickSubmit = () => {
		if (jsonValue !== "") {
			axios
				.post(process.env.REACT_APP_API_URL + "/api/docdb/createItem", {
					namespace: props.selectedNamespace,
					database: props.selectedCollection.database,
					collection: props.selectedCollection.collection,
					value: jsonValue,
					id: uuidv4(),
				})
				.then(() => {
					props.updateData();
					setJsonValue(JSON.stringify({ key: "value" }));
					handleClickAction();
				});
		}
	};

	return (
		<>
			{props.selectedCollection.length !== 0 && (
				<Box textAlign="left">
					<Button
						onClick={handleClickAction}
						sx={{ alignSelf: "left", width: 200, mt: 2, mb: 2 }}
						variant="contained"
					>
						Add Data
					</Button>
					<Dialog onClose={handleClickAction} open={openInsertForm}>
						<DialogTitle>
							Insert to Collection
							{props.selectedCollection.length !== 0 &&
								" " + props.selectedCollection.database + "." + props.selectedCollection.collection}
						</DialogTitle>
						<DialogContent>
							<Box sx={{ textAlign: "left" }}>
								<JSONInput
									id="a_unique_id"
									style={{ body: { fontSize: "16px" } }}
									placeholder={{ key: "value" }}
									colors={{ background: "#f7f7f7" }}
									locale={locale}
									onChange={(item) => setJsonValue(item.json)}
									height="400px"
								/>
							</Box>
						</DialogContent>
						<DialogActions>
							<Button variant="outlined" onClick={handleClickAction}>
								Cancel
							</Button>
							<Button variant="contained" onClick={handleClickSubmit}>
								Insert
							</Button>
						</DialogActions>
					</Dialog>
				</Box>
			)}
		</>
	);
}
