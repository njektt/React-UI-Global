import * as React from "react";
import axios from "axios";
import Filters from "./Filters";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Grid, Typography } from "@mui/material";
import renderCellExpand from "./renderCellExpand";
import LoadingButton from "@mui/lab/LoadingButton";

const columns = [
	{
		field: "key",
		headerName: "Key",
		flex: 1,
		renderCell: renderCellExpand,
	},
	{
		field: "value",
		headerName: "Value",
		flex: 2,
		renderCell: renderCellExpand,
	},
];

export default function KeyValueTable() {
	const [selectedGlobal, setSelectedGlobal] = React.useState("");
	const [data, setData] = React.useState([]);
	const [isLoading, setLoading] = React.useState(false);
	const [pageSize, setPageSize] = React.useState(200);
	const [selectedNamespace, setSelectedNamespace] = React.useState("");

	const updateData = (start = selectedGlobal, type = "add") => {
		setLoading(true);
		let startGlobal = "";
		type === "add" ? (startGlobal = data[data.length - 1].key) : (startGlobal = start);

		axios
			.get(
				process.env.REACT_APP_API_URL +
					"/api/getGlobalData?name=" +
					startGlobal +
					"&size=" +
					pageSize +
					"&namespace=" +
					selectedNamespace
			)
			.then((respose) => {
				var res = [];
				respose.data.map((item) => {
					return res.push({ id: item.key, key: item.key, value: item.value });
				});

				type === "add" ? setData((prevData) => prevData.concat(res)) : setData(res);
				setSelectedGlobal(start);
				setLoading(false);
			});
	};

	return (
		<Grid container spacing={3}>
			<Grid item md={2.5} xs={12}>
				<Filters
					selectedNamespace={selectedNamespace}
					setSelectedNamespace={setSelectedNamespace}
					selectedGlobal={selectedGlobal}
					handleUpdateData={updateData}
				/>
			</Grid>
			<Grid item md={9.5} xs={12}>
				<Typography sx={{ textAlign: "left", mb: 1 }} variant="h6" component="div">
					Globals
				</Typography>
				<DataGrid
					sx={{ height: 760, backgroundColor: "#fff" }}
					disableSelectionOnClick
					rowHeight={32}
					rowsPerPageOptions={[10, 25, 50, 200, 1000]}
					initialState={{
						pagination: {
							pageSize: 200,
						},
					}}
					onPageSizeChange={(pageSize) => setPageSize(pageSize)}
					components={{
						Toolbar: GridToolbar,
					}}
					columns={columns}
					rows={data}
				/>
				<LoadingButton
					variant="contained"
					loadingIndicator="Loading..."
					loading={isLoading}
					onClick={updateData}
					fullWidth
					sx={{ mt: 2 }}
				>
					Load more
				</LoadingButton>
			</Grid>
		</Grid>
	);
}
