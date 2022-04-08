import * as React from "react";
import { Box } from "@mui/system";
import AddGlobalForm from "./AddGlobalForm";
import AllGlobalList from "./GlobalList/AllGlobalList";
import axios from "axios";
import SelectorNamespace from "./SelectorNamespace";

export default function BasicSelect(props) {
	const [globalList, setGlobalList] = React.useState("");

	const selectGlobal = (globalname) => {
		props.handleUpdateData(globalname, "update");
	};

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
			<SelectorNamespace
				updateGlobalList={updateGlobalList}
				setSelectedNamespace={props.setSelectedNamespace}
				selectedNamespace={props.selectedNamespace}
			/>

			<AddGlobalForm
				updateGlobalList={updateGlobalList}
				selectedNamespace={props.selectedNamespace}
				setSelectedGlobal={selectGlobal}
			/>

			<AllGlobalList
				selectedNamespace={props.selectedNamespace}
				selectedGlobal={props.selectedGlobal}
				setSelectedGlobal={selectGlobal}
				globalList={globalList}
			/>
		</Box>
	);
}
