import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// TESTTNG DATA
function createData(name, totalDonation) {
  return { name, totalDonation };
}

const rows = [
  createData("Frozen yoghurt", 159),
  createData("Ice cream sandwich", 444),
  createData("Eclair", 262),
  createData("Cupcake", 305),
  createData("Gingerbread", 356),
];

export default function MyDonations() {
  return (
    <div className="flex flex-col justify-center items-center mb-10">
      <h1 className="font-extrabold text-sgu-blue text-5xl pt-10 pb-10">My Donations</h1>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 450 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Activities </TableCell>
              <TableCell>Total Donation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .sort((a, b) => b.totalDonation - a.totalDonation)
              .map((row) => (
                <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.totalDonation}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
