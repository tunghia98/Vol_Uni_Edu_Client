/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import SGUBackground_3 from "../../assets/images/bg-SGU-3.jpg";
import PlaceholderPic from "../../assets/images/bg-reset-cover.jpeg";

export default function Activities({ activities }) {
  return (
    <div className="relative flex flex-col justify-center items-center">
      <img
        src={SGUBackground_3}
        alt="Saigon University Banner"
        className="w-full h-96 object-cover object-center shadow-lg mb-10"
      />

      <h1 className="font-extrabold text-sgu-blue text-7xl pt-10 pb-20">All Activities</h1>

      {/* CARD CONTAINER */}
      <div className="w-full px-10 pb-20 flex flex-wrap">
        {activities.map((activity) => (
          <ActivityCard
            key={activity.id}
            id={activity.id}
            title={activity.title}
            image={activity.image}
            targetAmount={activity.targetAmount}
            status={activity.status}
          />
        ))}
      </div>
    </div>
  );
}

function ActivityCard({ id, title, image, targetAmount, status }) {
  return (
    <div className="w-5/12 h-auto border-2 p-3 rounded-md shadow-md m-5">
      <img src={image} alt="Activity Image" className="w-full h-3/4" />
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-xl">Target Amount: {targetAmount}</p>
      <p className="text-xl">Status: {status}</p>
      <Link to={`/all-activities/${id}`}>
        <button className="bg-sgu-blue text-xl px-8 py-4 text-white rounded-lg transition-all ease-out hover:brightness-125">
          Detail
        </button>
      </Link>
    </div>
  );
}
