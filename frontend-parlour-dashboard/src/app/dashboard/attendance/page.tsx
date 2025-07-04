import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export default function Attendance() {
  return (
    <div className="w-full h-full py-8 px-12">
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] px-6 py-4 text-2xl border-r">
              Invoice
            </TableHead>
            <TableHead className="w-[100px] px-6 py-4 text-2xl border-r">
              Status
            </TableHead>
            <TableHead className="w-[100px] px-6 py-4 text-2xl border-r">
              Method
            </TableHead>
            <TableHead className="w-[100px] px-6 py-4 text-2xl">
              Amount
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium px-6 py-4 border">
                {invoice.invoice}
              </TableCell>
              <TableCell className="border-r">
                {invoice.paymentStatus}
              </TableCell>
              <TableCell className="border-r">
                {invoice.paymentMethod}
              </TableCell>
              <TableCell className="">{invoice.totalAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
