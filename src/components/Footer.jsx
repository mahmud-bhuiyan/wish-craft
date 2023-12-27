import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative bg-[#200E3A] p-8">
      <div className="container flex justify-center align-middle mx-auto">
        <Link
          to="https://github.com/mahmud-bhuiyan"
          target="_blank"
          className="font-semibold text-sm text-white lg:mt-0"
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
