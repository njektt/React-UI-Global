import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { ListItem } from "@mui/material";
import SelectorNamespace from "../Viewer/SelectorNamespace";
import FolderIcon from "@mui/icons-material/Folder";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CreateDatabaseForm from "./Forms/CreateDatabaseForm";
import axios from "axios";
import DropItemForm from "./Forms/DropItemForm";
import CreateCollectionForm from "./Forms/CreateCollectionForm";
import { v4 as uuidv4 } from "uuid";

export default function NestedList(props) {
	const [dataList, setDataList] = React.useState([]);
	const [openDropForm, setOpenDropForm] = React.useState(false);
	const [openAddForm, setOpenAddForm] = React.useState(false);
	const [dropConfig, setDropConfig] = React.useState("");
	const [addFormConfig, setAddFormConfig] = React.useState("");

	const openCollapse = (event, key) => {
		dataList.databases[key].isOpen = !dataList.databases[key].isOpen;
		setDataList((prev) => ({ ...prev, dataList }));
	};

	const updateGlobalList = (namespace = props.selectedNamespace) => {
		axios
			.post(process.env.REACT_APP_API_URL + "/api/docdb/getStructure", { namespace: namespace })
			.then((respose) => {
				if (dataList.length !== 0) {
					var res = {
						databases: respose.data.databases.map((item, key) => {
							if (dataList.databases[key]) item.isOpen = dataList.databases[key].isOpen;
							return item;
						}),
					};

					setDataList(res);
				}

				setDataList(respose.data);
			});
	};

	const handleClickAddCollection = (database) => {
		setAddFormConfig({
			bodyRequest: {
				database: database,
				namespace: props.selectedNamespace,
				value: "",
				id: uuidv4(),
			},
			url: process.env.REACT_APP_API_URL + "/api/docdb/createItem",
		});
		setOpenAddForm(!openAddForm);
	};

	const handleRemoveDatabase = (database, collection) => {
		if (!collection) {
			setDropConfig({
				bodyRequest: { database: database, namespace: props.selectedNamespace },
				url: process.env.REACT_APP_API_URL + "/api/docdb/dropDatabase",
				formBody: "Do you really want to drop Database " + database + " ?",
				formTitle: "Drop Database",
			});
			setOpenDropForm(!openDropForm);
		}

		if (collection) {
			setDropConfig({
				bodyRequest: { database: database, collection: collection, namespace: props.selectedNamespace },
				url: process.env.REACT_APP_API_URL + "/api/docdb/dropCollection",
				formBody: "Do you really want to drop Collection " + collection + " ?",
				formTitle: "Drop Collection",
			});
			setOpenDropForm(!openDropForm);
		}
	};

	return (
		<List
			sx={{ width: "100%", minWidth: 300, bgcolor: "#3D4F59", color: "white", height: "100%", p: 0 }}
			component="nav"
			aria-labelledby="nested-list-subheader"
		>
			<ListItem sx={{ mb: 4 }}>
				<SelectorNamespace
					updateGlobalList={updateGlobalList}
					setSelectedNamespace={props.setSelectedNamespace}
					selectedNamespace={props.selectedNamespace}
				/>
			</ListItem>

			<ListItem>
				<CreateDatabaseForm selectedNamespace={props.selectedNamespace} updateGlobalList={updateGlobalList} />
				<DropItemForm
					updateGlobalList={updateGlobalList}
					dropConfig={dropConfig}
					config={props}
					setDropConfig={setDropConfig}
					openDropForm={openDropForm}
					setOpenDropForm={setOpenDropForm}
				/>
				<CreateCollectionForm
					updateGlobalList={updateGlobalList}
					addFormConfig={addFormConfig}
					setAddFormConfig={setAddFormConfig}
					setOpenAddForm={setOpenAddForm}
					openAddForm={openAddForm}
				/>
			</ListItem>

			{dataList.length !== 0 &&
				dataList.databases.map((database, key) => {
					return (
						<>
							<ListItem sx={{ mt: 2 }} disablePadding>
								<ListItemButton onClick={(event) => openCollapse(event, key)}>
									{dataList.databases[key].isOpen ? <ExpandLess /> : <ExpandMore />}
									<ListItemText sx={{ ml: 1 }} primary={database.name} />
								</ListItemButton>
								<IconButton onClick={() => handleClickAddCollection(database.name)}>
									<AddIcon sx={{ color: "white" }} />
								</IconButton>
								<IconButton sx={{ mr: 2 }} onClick={() => handleRemoveDatabase(database.name)}>
									<DeleteIcon sx={{ color: "white" }} />
								</IconButton>
							</ListItem>

							<Collapse in={dataList.databases[key].isOpen} timeout="auto" unmountOnExit>
								<List component="div" disablePadding>
									{database.collections.map((collection) => {
										return (
											<ListItem disablePadding>
												<ListItemButton
													onClick={() =>
														props.setSelectedCollection({
															database: database.name,
															collection: collection,
														})
													}
													key={collection}
													sx={{ pl: 4 }}
												>
													<ListItemIcon>
														<FolderIcon sx={{ color: "white" }} />
													</ListItemIcon>
													<ListItemText primary={collection} />
												</ListItemButton>
												<IconButton
													onClick={() => handleRemoveDatabase(database.name, collection)}
													aria-label="delete"
													sx={{ mr: 2 }}
												>
													<DeleteIcon sx={{ color: "white" }} />
												</IconButton>
											</ListItem>
										);
									})}
								</List>
							</Collapse>
						</>
					);
				})}
		</List>
	);
}
