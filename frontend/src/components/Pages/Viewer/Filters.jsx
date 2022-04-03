import * as React from "react";
import { Box } from "@mui/system";
import AddGlobalForm from "./AddGlobalForm";
import UsageGlobalList from "./GlobalList/UsageGlobalList";
import AllGlobalList from "./GlobalList/AllGlobalList";
import axios from "axios";
import { FormControl, Typography, Select, MenuItem } from "@mui/material";

export default function BasicSelect(props) {
	const [nameSpaces, setNameSpaces] = React.useState("");
	const [globalList, setGlobalList] = React.useState("");

	const selectGlobal = (globalname) => {
		props.handleUpdateData(globalname, "update");
	};

	const handleChange = (event) => {
		props.setSelectedNamespace(event.target.value);
		updateGlobalList(event.target.value);
	};

	React.useEffect(() => {
		axios.get(process.env.REACT_APP_IRIS_URL + "/MDX2JSON/Test").then((response) => {
			setNameSpaces({
				Mapped: response.data.Mappings.Mapped[0],
				All: response.data.Mappings.Unmapped.concat(response.data.Mappings.Mapped),
			});
			props.setSelectedNamespace("IRISAPP");
			updateGlobalList("IRISAPP");
		});
	}, []);

	const updateGlobalList = (namespace = props.selectedNamespace) => {
		setGlobalList("");

		axios.get(process.env.REACT_APP_API_URL + "/api/getAllGlobalList?nameSpace=" + namespace).then((response) => {
			setGlobalList(
				response.data.filter((item) => {
					return item.name !== "" && item.name[1] !== "%";
				})
			);
		});
	};

	return (
		<Box sx={{ paddingBottom: 3 }}>
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
					{nameSpaces &&
						nameSpaces.All.map((item) => (
							<MenuItem key={item} value={item}>
								{item}
							</MenuItem>
						))}
				</Select>
			</FormControl>

			<AddGlobalForm
				updateGlobalList={updateGlobalList}
				selectedNamespace={props.selectedNamespace}
				setSelectedGlobal={selectGlobal}
			/>

			{/* <UsageGlobalList selectedGlobal={props.selectedGlobal} setSelectedGlobal={selectGlobal} /> */}
			<AllGlobalList
				selectedNamespace={props.selectedNamespace}
				selectedGlobal={props.selectedGlobal}
				setSelectedGlobal={selectGlobal}
				globalList={globalList}
			/>
		</Box>
	);
}
