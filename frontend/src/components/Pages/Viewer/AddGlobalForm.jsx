import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Input, TextField } from "@mui/material";
import { List, ListItem } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import { FormControl } from "@mui/material";

export default function AddGlobalForm(props) {
	const [open, setOpen] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);
	const [formInput, setFormInput] = React.useReducer((state, newState) => ({ ...state, ...newState }), {
		globalname: "",
		rowcount: "",
	});

	const handleInput = (evt) => {
		const name = evt.target.id;
		const newValue = evt.target.value;
		setFormInput({ [name]: newValue });
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleSubmit = () => {
		axios
			.post(process.env.REACT_APP_API_URL + "/api/generateGlobal", {
				globalname: "^" + formInput.globalname,
				rowcount: parseInt(formInput.rowcount),
				namespace: props.selectedNamespace,
			})
			.then((response) => {
				console.log(response);
				setIsLoading(false);
				setOpen(false);
				setFormInput({ globalname: "", rowcount: "" });
				props.updateGlobalList();
				props.setSelectedGlobal("^" + formInput.globalname);
			});
	};

	return (
		<div>
			<Box>
				<Button onClick={handleClickOpen} sx={{ mt: 2 }} fullWidth variant="contained">
					Create Global
				</Button>
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">{"Generate Global data"}</DialogTitle>
					<DialogContent>
						<List sx={{ width: 300 }}>
							<ListItem sx={{ paddingRight: 0, paddingLeft: 0 }}>
								<FormControl fullWidth variant="standard">
									<InputLabel htmlFor="standard-adornment-amount">Global Name</InputLabel>
									<Input
										startAdornment={<InputAdornment position="start">^</InputAdornment>}
										id="globalname"
										required
										fullWidth
										label="Global Name"
										variant="standard"
										onChange={handleInput}
									/>
								</FormControl>
							</ListItem>
							<ListItem sx={{ paddingRight: 0, paddingLeft: 0 }}>
								<TextField
									type="number"
									required
									fullWidth
									id="rowcount"
									label="Row Count"
									variant="standard"
									onChange={handleInput}
								/>
							</ListItem>
						</List>
					</DialogContent>
					<DialogActions>
						<Button variant="outlined" onClick={handleClose}>
							Cancel
						</Button>
						<LoadingButton
							variant="contained"
							loading={isLoading}
							onClick={handleSubmit}
							endIcon={<SendIcon />}
							loadingPosition="end"
						>
							Generate
						</LoadingButton>
					</DialogActions>
				</Dialog>
			</Box>
		</div>
	);
}
