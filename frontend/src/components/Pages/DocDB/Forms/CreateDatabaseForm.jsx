import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { List, ListItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function CreateDatabaseForm(props) {
	const [open, setOpen] = React.useState(false);
	const [formInput, setFormInput] = React.useReducer((state, newState) => ({ ...state, ...newState }), {
		database: "",
		collection: "",
	});

	const handleClickClose = () => {
		setOpen(!open);
	};

	const handleClickOpen = () => {
		setOpen(!open);
	};

	const handleClickSubmit = () => {
		if (formInput.globalname !== "" && formInput.collection !== "") {
			axios
				.post(process.env.REACT_APP_API_URL + "/api/docdb/createItem", {
					namespace: props.selectedNamespace,
					database: formInput.globalname,
					collection: formInput.collection,
					value: "",
					id: uuidv4(),
				})
				.then((response) => {
					props.updateGlobalList();
					setFormInput({ database: "", collection: "" });
					setOpen(false);
				});
		}
	};

	const handleInput = (evt) => {
		const name = evt.target.id;
		const newValue = evt.target.value;
		setFormInput({ [name]: newValue });
	};

	return (
		<>
			<Button onClick={handleClickOpen} fullWidth variant="contained">
				Create database
			</Button>
			<Box>
				<Dialog onClose={handleClickClose} open={open}>
					<DialogTitle>{"Create database"}</DialogTitle>
					<DialogContent>
						<List sx={{ width: 300 }}>
							<ListItem sx={{ paddingRight: 0, paddingLeft: 0 }}>
								<TextField
									type="text"
									required
									fullWidth
									onChange={handleInput}
									id="globalname"
									label="Database Name"
									variant="standard"
								/>
							</ListItem>
							<ListItem sx={{ paddingRight: 0, paddingLeft: 0 }}>
								<TextField
									type="text"
									required
									fullWidth
									onChange={handleInput}
									id="collection"
									label="Collection Name"
									variant="standard"
								/>
							</ListItem>
						</List>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClickClose} variant="outlined">
							Cancel
						</Button>
						<Button onClick={handleClickSubmit} variant="contained">
							Create
						</Button>
					</DialogActions>
				</Dialog>
			</Box>
		</>
	);
}
