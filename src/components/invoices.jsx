import { Link, Outlet } from "react-router-dom";
import { getInvoices } from "./data";
import moment from 'moment'
import { useEffect } from "react";
export default function Invoices() {

  let invoices = getInvoices();

  useEffect(()=>{
    const time=moment().format("MMMM Do YYYY, h:mm:ss a Z")
    const formatted=moment(time, "MMMM Do YYYY, h:mm:ss a Z");
    const time1=moment().format("MMMM Do YYYY, h:mm:ss a Z")
    const formatted1=moment(time, "MMMM Do YYYY, h:mm:ss a Z");


    console.log(time)
    console.log(formatted)
    console.log(time1)
    console.log(formatted1)
  },[])
  return (
    <div>
      <nav>
        {invoices.map((invoice) => (
          <Link
            style={{ display: "block", margin: "1rem 0" }}
            to={`/invoices/${invoice.number}`}
            key={invoice.number}
          >
            {invoice.name}
          </Link>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}