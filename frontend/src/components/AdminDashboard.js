import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import DeleteFromHome from "./DeleteFromHome";

const url = "http://localhost:3000";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const storedUserJSONString = localStorage.getItem('user');
  const user = storedUserJSONString ? JSON.parse(storedUserJSONString) : null;

  useEffect(() => {
    if(user === null){
      navigate('/');
    }
    getAllItems();
  }, [])

  const CustomHeader = ({ onClick }) => (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <EditIcon onClick={onClick} />
    </div>
  );
  
  const CustomHeader2 = ({ onClick }) => (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <DeleteIcon onClick={onClick} />
    </div>
  );
  
  const ActionCell = ({ icon }) => (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      {icon}
    </div>
  );
  
  const [itemId, setItemId] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [items, setItems] = useState("");
  
  const openDeleteFromHome = (id) => {
    setOpenDeleteDialog(true);
    setItemId(id);
  }
    
  const closingDeleteFromHomeDialog = () => {
    setOpenDeleteDialog(false);
    setItemId(false);
  }
    
  const columns = [
    {
      field: "title",
      headerName: (
        <div>
          <strong>Naziv</strong>
        </div>
      ),
      width: 350,
    },
    {
      field: "required",
      headerName: (
        <div>
          <strong>Obaveznost</strong>
        </div>
      ),
      width: 150,
      renderCell: (params) => (
        <div style={{ paddingLeft: '20%', paddingRight: '20%' }}>
          {params.value === true ? "Da" : "Ne"}
        </div>
      ),
      sortable: false,
    },
    {
      field: "update",
      headerAlign: "center",
      renderHeader: () => <CustomHeader />,
      renderCell: (params) => <ActionCell icon={<Button variant="outlined" onClick={() => {updateItem(params.row._id)}}>Uredi</Button>} />,
      width: 110,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "delete",
      headerAlign: "center",
      renderHeader: () => <CustomHeader2 />,
      renderCell: (params) => <ActionCell icon={<Button variant="outlined" onClick={() => {openDeleteFromHome(params.row._id)}}>Obriši</Button>} />,
      sortable: false,
      width: 110,
      disableColumnMenu: true,
    },
  ];

  const getAllItems = async () => {
    const fetchedItemsData = await fetch(url + "/Home");
    const itemsData = await fetchedItemsData.json();
    setItems(itemsData);
  };

  const addItem = () => {
    navigate('/AirsoftItem/new');
  }

  const deleteItem = (id) => {
    fetch(url + "/AirsoftItem/delete/" + id, {
      method: "DELETE",
    }).then(() => {
      getAllItems();
    });
  };

  const updateItem = (id) => {
    navigate(`/AirsoftItem/edit/${id}`);
  };

  return (
    <div className="adminDashboard">
      <div className="items">
        <div className="buttonAdd" style={{ display: "flex" }}>
          <Button variant="contained" color="secondary" style={{ marginLeft: "auto", marginRight: "2%" }} onClick={addItem}>
            Dodaj stavku
          </Button>
        </div>
        <Box
          sx={{
            height: 400,
            width: "54%",
            margin: 'auto'
          }}
        >
          <DataGrid
            rows={items}
            columns={columns}
            getRowId={(row) => row._id}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            autoHeight
          />
        </Box>
        {openDeleteDialog === true && (
          <DeleteFromHome
            id={itemId} 
            isOpen={openDeleteDialog} 
            closingDialog={closingDeleteFromHomeDialog}
            deleteItem={deleteItem}/>)}
      </div>
    </div>
  );
}
