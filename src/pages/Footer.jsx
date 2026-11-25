
import { useNavigate } from "react-router-dom";
import Button from "../components/button";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#171717] text-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">

          {/* Footer Heading */}
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-[#c6f221] mb-5">
              KEEP MOVING
            </p>

            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.05]">
              Good things
              <br />
              come in <span className="text-[#c6f221]">pairs.</span>
            </h2>
          </div>

          {/* Shop Button */}
          <Button
            onClick={() => navigate("/products")}
            className="self-start md:self-center rounded-none border border-white/40 bg-transparent px-7 py-4 text-white hover:bg-[#c6f221] hover:text-black"
          >
            View all sneakers →
          </Button>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
