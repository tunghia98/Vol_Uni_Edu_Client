/* eslint-disable react/prop-types */
import { useState } from "react";
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

export default function Activity(props) {
  const [showModal, setShowModal] = useState(false);

  const { id, title, image, targetAmount, currentAmount, status, startDate, endDate, description } =
    props;

  return (
    <div className="m-5">
      <h1 className="text-5xl font-semibold my-10 mx-5 text-sgu-blue">
        {`${title} ${title} ${title} ${title} ${title} `}
      </h1>

      <div className="relative flex my-10 px-5">
        <img src={image} alt={`Activity ${id}`} className="w-1/2 rounded-2xl mr-10" />

        <div className="relative text-2xl pt-5">
          <p className="mb-2">
            <b>Description:</b> {description}
          </p>
          <p className="mb-2">
            <b>Target Amount:</b> {targetAmount}
          </p>
          <p className="mb-2">
            <b>Current Amount:</b> {currentAmount}
          </p>
          <p className="mb-2">
            <b>Status:</b> {status}
          </p>
          <p className="mb-2">
            <b>Start Date:</b> {startDate.toDateString()}
          </p>
          <p className="mb-2">
            <b>End Date:</b> {endDate.toDateString()}
          </p>

          {status === "Active" && (
            <button
              className="bg-sgu-blue my-5 px-8 py-4 text-white rounded-lg transition-all ease-out hover:brightness-125"
              onClick={() => setShowModal(true)}
            >
              Donate now!
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col justify-center items-center">
        <h2 className="text-4xl font-md my-7 text-sgu-blue underline">TOP DONATIONS</h2>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 450 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name </TableCell>
                <TableCell>Total Donation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .sort((a, b) => b.totalDonation - a.totalDonation)
                .map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
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

      <div
        className={`${
          showModal ? "block" : "hidden"
        } fixed top-0 left-0 z-1 w-full h-full bg-black bg-opacity-10`}
      >
        <div className="relative h-full flex justify-center items-center">
          <div className="block relative bg-white w-1/3 h-auto p-2 rounded-lg">
            <h2 className="font-medium text-2xl">Create your Donation!</h2>

            <button
              className="absolute right-0 top-0 bg-sgu-blue py-3 px-4 text-white text-xs rounded-lg transition-all ease-out hover:brightness-125"
              onClick={() => setShowModal(false)}
            >
              X
            </button>

            <form className="flex flex-col">
              <label className="mt-5">Amount</label>
              <input
                type="number"
                className="border border-sgu-blue rounded-lg p-2"
                placeholder="Amount"
              />

              <button className="bg-sgu-blue text-white rounded-lg p-2 mt-5">Donate</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
