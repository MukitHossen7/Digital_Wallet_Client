import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface IProps {
  children: ReactNode;
}

const CommonLayout = ({ children }: IProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="grow-1">{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
