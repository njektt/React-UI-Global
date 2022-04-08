import * as React from "react";
import { FormControl, Typography, Select, MenuItem } from "@mui/material";
import axios from "axios";

export default function SelectorNamespace(props) {
	const [nameSpacesList, setNameSpacesList] = React.useState("");

	const handleChange = (event) => {
		props.setSelectedNamespace(event.target.value);
		props.updateGlobalList(event.target.value);
	};

	React.useEffect(() => {
		axios.get(process.env.REACT_APP_IRIS_URL + "/MDX2JSON/Test").then((response) => {
			setNameSpacesList({
				Mapped: response.data.Mappings.Mapped[0],
				All: response.data.Mappings.Unmapped.concat(response.data.Mappings.Mapped),
			});
			props.setSelectedNamespace("IRISAPP");
			props.updateGlobalList("IRISAPP");
		});
	}, []);

	return (
		<FormControl fullWidth>
			<Typography sx={{ mb: 1, textAlign: "left" }} variant="h6" component="div">
				Select Namespace
			</Typography>
			<Select
				value={props.selectedNamespace && props.selectedNamespace}
				labelId="demo-customized-select-label"
				id="demo-customized-select"
				sx={{ backgroundColor: "white" }}
				onChange={handleChange}
			>
				{nameSpacesList &&
					nameSpacesList.All.map((item) => (
						<MenuItem key={item} value={item}>
							{item}
						</MenuItem>
					))}
			</Select>
		</FormControl>
	);
}
