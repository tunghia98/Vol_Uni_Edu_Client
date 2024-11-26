import { useState } from "react";

/* eslint-disable react/prop-types */
export default function CreateActivity(props) {
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [targetAmount, setTargetAmount] = useState(props.targetAmount);
  const [currentAmount, setCurrentAmount] = useState(props.currentAmount);
  const [status, setStatus] = useState(props.status);

  // REMEMBER TO RECONVERT DATE STRING TO DATE OBJECT
  const [startDate, setStartDate] = useState(props.startDate);
  const [endDate, setEndDate] = useState(props.endDate);

  return (
    <div className="flex flex-col justify-center mx-10 mb-10">
      <h2 className="text-sgu-blue text-4xl pt-10 pb-20">Create Activity</h2>

      <div className="relative flex">
        <form className="relative text-2xl pt-5 w-full">
          <label htmlFor="patch" className="mb-2 font-bold">
            Title:
          </label>
          <input
            className="border-2 ml-3 px-1 mb-5"
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />

          <label htmlFor="description" className="mb-2 font-bold">
            Description:
          </label>
          <br />
          <textarea
            className="border-2 ml-3 px-1 mb-5 mt-3 w-1/2 h-52"
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <br />

          <label htmlFor="targetAmount" className="mb-2 font-bold">
            Target Amount:
          </label>
          <input
            className="border-2 ml-3 px-1 mb-5"
            type="number"
            name="targetAmount"
            min="0"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
          />
          <br />

          <label htmlFor="status" className="mb-2 font-bold">
            Status:
          </label>
          <input
            className="border-2 ml-3 px-1 mb-5"
            type="text"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
          <br />

          <label htmlFor="startDate" className="mb-2 font-bold">
            Start Date:
          </label>
          <input
            className="border-2 ml-3 px-1 mb-5"
            type="date"
            name="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <br />

          <label htmlFor="endDate" className="mb-2 font-bold">
            End Date:
          </label>
          <input
            className="border-2 ml-3 px-1"
            type="date"
            name="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <br />

          {/* AXIOS HANDLING OR SOMETHINGS... */}
          <button className="bg-sgu-blue text-white rounded-lg p-2 mt-5 mx-3">Create</button>
        </form>
      </div>
    </div>
  );
}
