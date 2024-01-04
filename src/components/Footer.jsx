import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative bg-[#402F3F] p-8 text-[#EDF0F1]">
      <div className="container flex justify-center align-middle mx-auto">
        <Link
          to="https://github.com/mahmud-bhuiyan"
          target="_blank"
          className="font-semibold text-sm lg:mt-0"
        >
          Developed by :{" "}
          <span className="font-bold hover:underline cursor-pointer">
            Md. Mahmudur Rahman Bhuiyan
          </span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
