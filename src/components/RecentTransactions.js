import React from "react";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { RiProgress3Line } from "react-icons/ri";
import { TiWarning } from "react-icons/ti";
import { Link } from "react-router-dom";

const RecentTransactions = ({ data }) => {
  const dummyData = [
    {
      createdAt: "05-05-2024",
      description: "paypal",
      status: "Completed",
      type: "income",
      amount: "3000",
      source: "Cash",
    },
    {
      createdAt: "06-06-2024",
      description: "freelance payment",
      status: "Completed",
      type: "income",
      amount: "5000",
      source: "Paypal",
    },
    {
      createdAt: "07-06-2024",
      description: "grocery shopping",
      status: "Completed",
      type: "expense",
      amount: "2000",
      source: "Cash",
    },
    {
      createdAt: "08-06-2024",
      description: "utility bill",
      status: "Pending",
      type: "expense",
      amount: "1500",
      source: "Credit Card",
    },
    {
      createdAt: "09-06-2024",
      description: "refund",
      status: "Rejected",
      type: "income",
      amount: "2500",
      source: "Paypal",
    },
    {
      createdAt: "10-06-2024",
      description: "online subscription",
      status: "Completed",
      type: "expense",
      amount: "800",
      source: "Visa Debit Card",
    },
  ];
  return (
    <div className="flex-1 w-full py-20">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-semibold text-black">
          Latest Transactions
        </h1>
        <Link
          to="/transactions"
          className="text-sm text-gray-600 mr-5 hover:text-violet-600 hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full">
          <thead className="w-full border-b border-gray-300">
            <tr className="w-full text-left text-black">
              <th className="py-2">Date</th>
              <th className="px-2 py-2">Description</th>
              <th className="px-2 py-2">Status</th>
              <th className="px-2 py-2">Source</th>
              <th className="px-2 py-2">Amount</th>
            </tr>
          </thead>

          <tbody>
            {dummyData.map((item, index) => (
              <tr
                key={index}
                className="text-sm text-gray-600 border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-4">
                  {new Date(item.createdAt).toLocaleDateString}
                </td>
                <td className="px-2 py-3">
                  <div className="flex flex-col">
                    <p className="text-base font-sm text-black 2xl:text-lg line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                </td>
                <td className="flex items-center gap-2 px-2 py-3">
                  {item.status === "Pending" && (
                    <RiProgress3Line className="text-amber-600" size={24} />
                  )}
                  {item.status === "Completed" && (
                    <IoCheckmarkDoneCircle
                      className="text-emerald-600"
                      size={24}
                    />
                  )}
                  {item.status === "Rejected" && (
                    <TiWarning className="text-red-600" size={24} />
                  )}
                  <span>{item.status}</span>
                </td>

                <td className="px-2 py-3">
                  <p className="line-clamp-1">{item.source}</p>
                </td>

                <td className="flex items-center px-2 py-4 font-medium text-black">
                  <span
                    className={`${
                      item.type === "income"
                        ? "text-emerald-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.type === "income" ? "+" : "-"}
                  </span>
                  {`Rs.${item.amount}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTransactions;
