import { Outlet } from "react-router-dom";
import './../App.css'

const Title = () => {
  return (
    <>
        <h1 className="page_title">This is a better version of Stack Overflow</h1>
        <Outlet />
    </>
  );
}

export default Title;