import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { List, ListItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";

export default function CreateDatabaseForm(props) {
	const [formInput, setFormInput] = React.useReducer((state, newState) => ({ ...state, ...newState }), {
		collection: "",
	});

	const handleClickClose = () => {
		props.setOpenAddForm(!props.openAddForm);
	};

	const handleClickSubmit = () => {
		if (formInput.collection !== "") {
			props.addFormConfig.bodyRequest.collection = formInput.collection;

			axios.post(props.addFormConfig.url, props.addFormConfig.bodyRequest).then((response) => {
				props.updateGlobalList();
				setFormInput({ database: "", collection: "" });
				handleClickClose();
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
			<Box>
				<Dialog onClose={handleClickClose} open={props.openAddForm}>
					<DialogTitle>{"Create Collection"}</DialogTitle>
					<DialogContent>
						<List sx={{ width: 300 }}>
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
