import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import moment from "moment";
import { Dispatch, SetStateAction } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomizedDialogs from "../../components/Modal";
import { DataProps, useAppContext } from "../../context/AppContext";

type Props = {
  handleOnSave: () => void;
  itemSelected: DataProps | null;
  setItemSelected: Dispatch<SetStateAction<DataProps | null>>;
};

const NewsView = (props: Props) => {
  const { handleOnSave, itemSelected, setItemSelected } = props;

  const navigate = useNavigate();
  const { data } = useAppContext();

  return (
    <>
      <Box sx={{ textAlign: "right", marginBottom: "2rem" }}>
        <Link to="/news/create">
          <Button variant="contained">Add News</Button>
        </Link>
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>No.</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Content
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Date
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Views
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                ?.sort((a: DataProps, b: DataProps) => b.order - a.order)
                ?.map((row: DataProps) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&:hover": {
                        background: "rgba(21, 101, 192, 0.13)",
                      },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row.order}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      onClick={() => navigate(`/news/view/${row.id}`)}
                      sx={{ cursor: "pointer" }}
                    >
                      {row.label}
                    </TableCell>
                    <TableCell align="left">{row.content}</TableCell>
                    <TableCell align="right">
                      {moment(row.createdAt).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell align="right">{row.views}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => navigate(`/news/edit/${row.id}`)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setItemSelected(row);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {!!itemSelected?.id && (
          <CustomizedDialogs
            title={"Confirm Deletion"}
            isOpen={!!itemSelected?.id}
            onClose={() => setItemSelected(null)}
            onSave={handleOnSave}
            content={`Are you sure you want to delete "${itemSelected?.label}"? This action cannot be reversed.`}
            saveTitle="confirm"
          />
        )}
      </Box>
    </>
  );
};

export default NewsView;
