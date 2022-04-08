import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";
import axios from "axios";
import { DialogContentText } from "@mui/material";

export default function DropItemForm(props) {
	const handleClickClose = () => {
		props.setOpenDropForm(false);
	};

	const handleClickSubmit = () => {
		axios.post(props.dropConfig.url, props.dropConfig.bodyRequest).then((response) => {
			handleClickClose();
			props.updateGlobalList();
			props.config.setSelectedCollection("");
		});
	};

	return (
		<>
			<Box>
				<Dialog onClose={handleClickClose} open={props.openDropForm}>
					<DialogTitle>{props.dropConfig.formTitle}</DialogTitle>
					<DialogContent>
						<DialogContentText>{props.dropConfig.formBody}</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClickClose} variant="outlined">
							Cancel
						</Button>
						<Button onClick={handleClickSubmit} variant="contained">
							Drop
						</Button>
					</DialogActions>
				</Dialog>
			</Box>
		</>
	);
}
