import Header from "../../components/Header";
import SGUBackground from "../../assets/images/SGU_background.jpg";

export default function HomePage() {
  return (
    <div className="homepage">
      {/* NEED TO TAKE AUTH STATE OUTSIDE */}
      <Header />

      <div className="relative flex justify-center items-center">
        <img src={SGUBackground} alt="" />
        <div className="absolute flex flex-col text-center">
          <div className=" text-8xl text-white font-bold mb-7">Saigon University Volunteer</div>
          <div className=" text-2xl text-white font-bold italic">
            Empowering Change, One Act at a Time!
          </div>
        </div>
      </div>

      <div className="content">
        <div>About Us</div>
        <div>Our Project</div>
      </div>
      <div>Footer</div>
    </div>
  );
}
