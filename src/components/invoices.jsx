import { Link, Outlet } from "react-router-dom";
import { getInvoices } from "./data";

export default function Invoices() {
  let invoices = getInvoices();
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