import * as React from "react";
import { Box } from "@mui/system";
import AddGlobalForm from "./AddGlobalForm";
import UsageGlobalList from "./GlobalList/UsageGlobalList";
import AllGlobalList from "./GlobalList/AllGlobalList";

export default function BasicSelect(props) {
	// const [nameSpaces, setNameSpaces] = React.useState("");

	const selectGlobal = (globalname) => {
		props.handleUpdateData(globalname, "update");
	};

	// const handleChange = (event) => {
	// 	setNameSpaces({
	// 		Mapped: event.target.value,
	// 		All: nameSpaces.All,
	// 	});
	// };

	// React.useEffect(() => {
	// 	axios.get(process.env.REACT_APP_IRIS_URL + "/MDX2JSON/Test").then((response) => {
	// 		setNameSpaces({
	// 			Mapped: response.data.Mappings.Mapped[0],
	// 			All: response.data.Mappings.Unmapped.concat(response.data.Mappings.Mapped),
	// 		});
	// 	});
	// }, []);

	return (
		<Box sx={{ paddingBottom: 3 }}>
			{/* <FormControl fullWidth>
				<Typography sx={{ mb: 1, textAlign: "left" }} variant="h6" component="div">
					Select Namespace
				</Typography>
				<Select
					value={nameSpaces && nameSpaces.Mapped}
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
			</FormControl> */}

			<AddGlobalForm setSelectedGlobal={selectGlobal} />

			<UsageGlobalList selectedGlobal={props.selectedGlobal} setSelectedGlobal={selectGlobal} />
			<AllGlobalList selectedGlobal={props.selectedGlobal} setSelectedGlobal={selectGlobal} />
		</Box>
	);
}
