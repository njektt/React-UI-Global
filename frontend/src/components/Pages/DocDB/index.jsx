import * as React from "react";
import Navigation from "./Navigation";
import { Grid } from "@mui/material";
import DocumentViewer from "./DocumentViewer";

export default function DocDB() {
	const [selectedCollection, setSelectedCollection] = React.useState("");
	const [selectedNamespace, setSelectedNamespace] = React.useState("");

	return (
		<Grid container sx={{ height: "100vh" }}>
			<Grid container xs="auto" sx={{ height: "100%" }} item>
				<Navigation
					selectedNamespace={selectedNamespace}
					setSelectedNamespace={setSelectedNamespace}
					selectedCollection={selectedCollection}
					setSelectedCollection={setSelectedCollection}
				/>
			</Grid>

			<Grid xs item>
				<DocumentViewer selectedNamespace={selectedNamespace} selectedCollection={selectedCollection} />
			</Grid>
		</Grid>
	);
}
