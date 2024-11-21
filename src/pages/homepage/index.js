import SGUBackground_1 from "../../assets/images/bg-SGU.jpg";
import SGUBackground_2 from "../../assets/images/bg-SGU-2.webp";
import Activity_1 from "../../assets/images/activity-1.jpg";

export default function HomePage() {
  return (
    <div className="homepage">
      {/* IMAGE AND SLOGAN */}
      <div className="relative flex justify-center items-center">
        <img src={SGUBackground_1} alt="Saigon University Background" />
        <div className="absolute flex flex-col text-center">
          <div className=" text-8xl text-white font-bold mb-7">Saigon University Volunteer</div>
          <div className=" text-2xl text-white font-bold italic">
            Empowering Change, One Act at a Time!
          </div>
        </div>
      </div>

      {/* ABOUT US */}
      <div className="relative flex flex-row py-10 bg-gray-100">
        <img src={SGUBackground_2} alt="Saigon University Background" className="size-2/5" />

        <div className="relative px-10">
          <h2 className="font-extrabold text-7xl text-[#1976d2] mb-10">About Us ___</h2>
          <div className="text-3xl text-gray-500 italic mb-10">
            SGU Volunteers are dedicated to creating positive change through compassion, teamwork,
            and impactful service.
          </div>
          <button className="bg-[#1976d2] text-white text-3xl px-4 py-5 w-44 transition ease-out hover:brightness-150 rounded-xl">
            Join us!
          </button>
        </div>
      </div>

      {/* OUR PROJECT */}
      <div className="relative flex flex-col justify-center items-center my-10">
        <h2 className="font-extrabold text-7xl text-[#1976d2] mb-10">Our Project</h2>

        {/* NEED TO FETCH DATA FOR THIS */}
        <div className="flex flex-row justify-center items-center">
          <div className="shadow-2xl pb-10 border-8 w-1/4 mx-10">
            <img src={Activity_1} alt="Volunteer Img" />
            <div className="text-2xl pl-2 py-4 font-semibold">Lunch for college student</div>
          </div>
          <div className="shadow-2xl pb-10 border-8 w-1/4 mx-10">
            <img src={Activity_1} alt="Volunteer Img" />
            <div className="text-2xl pl-2 py-4 font-semibold">Lunch for college student</div>
          </div>
          <div className="shadow-2xl pb-10 border-8 w-1/4 mx-10">
            <img src={Activity_1} alt="Volunteer Img" />
            <div className="text-2xl pl-2 py-4 font-semibold">Lunch for college student</div>
          </div>
        </div>
      </div>
    </div>
  );
}
