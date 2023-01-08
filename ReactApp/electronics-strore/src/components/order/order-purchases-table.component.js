import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
// Import custom types and utils
import { formatter } from "../../utils/formatter";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export default function OrderPurchasesTable(props) {
  const { goods, purchases } = props;

  const navigate = useNavigate();

  // const handleClick = (event, id) => {
  //   navigate(`/details/${id}`);
  // };

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" component="div">
          <TableHead component="div">
            <TableRow component="div">
              <TableCell component="div">Name</TableCell>
              <TableCell align="right" component="div">
                Brand
              </TableCell>
              <TableCell align="right" component="div">
                Cost
              </TableCell>
              <TableCell align="right" component="div">
                Count
              </TableCell>
              <TableCell align="right" component="div">
                Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody component="div">
            {goods.map((g) => (
              <TableRow
                hover
                // onClick={(event) => handleClick(event, g.id)}
                key={g.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                component={StyledLink}
                to={`/details/${g.id}`}
              >
                <TableCell component="div" scope="row">
                  {g.name}
                </TableCell>
                <TableCell align="right" component="div">
                  {g.brand}
                </TableCell>
                <TableCell align="right" component="div">
                  {`${formatter.format(
                    purchases.find((p) => p.goodsId === g.id).cost
                  )}`}
                </TableCell>
                <TableCell align="right" component="div">
                  {purchases.find((p) => p.goodsId === g.id).count}
                </TableCell>
                <TableCell align="right" component="div">
                  {`${formatter.format(
                    purchases.find((p) => p.goodsId === g.id).count *
                      purchases.find((p) => p.goodsId === g.id).cost
                  )}`}
                </TableCell>
              </TableRow>
            ))}
            <TableRow component="div">
              <TableCell rowSpan={3} component="div" />
              <TableCell align="right" colSpan={2} component="div">
                Total
              </TableCell>
              <TableCell align="right" component="div">
                {purchases.reduce((sum, current) => sum + current.count, 0)}
              </TableCell>
              <TableCell align="right" component="div">{`${formatter.format(
                purchases.reduce(
                  (sum, current) => sum + current.cost * current.count,
                  0
                )
              )}`}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
