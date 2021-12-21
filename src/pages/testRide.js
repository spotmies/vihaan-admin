import { filter } from "lodash";
import { Icon } from "@iconify/react";
import { sentenceCase } from "change-case";
import { useState, useEffect } from "react";
import plusFill from "@iconify/icons-ant-design/reload-outline";
import { useObserver } from "mobx-react";
import { Link as RouterLink } from "react-router-dom";
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Paper,
} from "@mui/material";
// components
import Page from "../components/Page";
import Label from "../components/Label";
import Scrollbar from "../components/Scrollbar";
import SearchNotFound from "../components/SearchNotFound";
import {
  UserListHead,
  UserListToolbar,
  TestRideMoreMenu,
} from "../components/_dashboard/user";
//
import USERLIST from "../_mocks_/user";
import { useStores } from "../state_management/store";
import Popup from "./popup";
import React from "react";
import TestRideModel from "../components/reusable/testRide_model";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "company", label: "phone number", alignRight: false },
  { id: "role", label: "model", alignRight: false },
  { id: "status", label: "Booked at", alignRight: false },
  // { id: 'isVerified', label: 'vtatus', alignRight: false },
  { id: "menu", label: "menu" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function TestRides() {
  const { TestRides, UserStore, ProductStore } = useStores();

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedData, setSelectedData] = useState();
  const [Pop, setPop] = useState(false);
  const [userData, setUserData] = useState();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  useEffect(() => {
    if (UserStore.listUser.length < 1) UserStore.fetchUserFromDB();
  }, []);

  useEffect(() => {
    if (ProductStore.listProducts.length < 1) ProductStore.fetchProductFromDB();
  }, []);

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(
    USERLIST,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  const selectedItem = (item) => {
    setSelectedData(item);
    setUserData(UserStore.getUserDetById(item.userDetails));
    console.log(userData);
    setPop(true);
  };

  useEffect(() => {
    if (TestRides.listRides.length < 1) {
      TestRides.fetchRidesFromDB();
  }}, []);
  return useObserver(() => (
    <Page title="User">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Test Rides
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
            onClick={() => TestRides.fetchRidesFromDB()}
          >
            Reload
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {TestRides.listRides.map((ride) => (
                    <TableRow
                      hover
                      key={ride.id}
                      tabIndex={-1}
                      role="checkbox"
                      // onClick= {() => selectedItem(user)}
                      // selected={isItemSelected}
                      // aria-checked={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                        // checked={isItemSelected}
                        // onChange={(event) => handleClick(event, name)}
                        />
                      </TableCell>

                      <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                        onClick={() => {
                          selectedItem(ride);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar
                            alt={
                              UserStore.getUserDetById(ride.userDetails).name
                            }
                            src={UserStore.getUserDetById(ride.userDetails).pic}
                          />
                          <Typography variant="subtitle2" noWrap>
                            {UserStore.getUserDetById(ride.userDetails).name}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">
                        {UserStore.getUserDetById(ride.userDetails).mobile}
                      </TableCell>
                      <TableCell align="left">
                        {
                          ProductStore.getProdDetById(ride.vehicleDetails).basicDetails.modelName
                        }
                      </TableCell>
                      <TableCell align="left">{ride.schedule}</TableCell>

                      {/* <TableCell align="left">{user.isActive ? 'Yes' : 'No'}</TableCell> */}
                      {/* <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={(user.userState === 'banned' && 'error') || 'success'}
                            >
                              {sentenceCase(user.userState)}
                            </Label>
                          </TableCell> */}

                      <TableCell align="center">
                        <TestRideMoreMenu 
                          onDelete={() => {
                            TestRides.deleteRide(ride.driveId);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          {/* <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
          {Pop ? (
            <TestRideModel
              details={selectedData}
              userDet={userData}
              onClose={() => {
                setPop(false);
              }}
            />
          ) : null}
        </Card>
      </Container>
    </Page>
  ));
}
