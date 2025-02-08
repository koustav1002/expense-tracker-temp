import React, { useEffect, useState } from "react";
import useStore from "../store/index";
import { FaBtc, FaPaypal } from "react-icons/fa";
import { RiVisaLine } from "react-icons/ri";
import { GiCash } from "react-icons/gi";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { MdAdd, MdVerifiedUser } from "react-icons/md";
import AccountMenu from "../components/AccountMenu";

const ICONS = {
  crypto: (
    <div className="w-12 h-12 bg-amber-600 text-white flex items-center justify-center rounded-full">
      <FaBtc size={26} />
    </div>
  ),
  "visa debit card": (
    <div className="w-12 h-12 bg-blue-600 text-white flex items-center justify-center rounded-full">
      <RiVisaLine size={26} />
    </div>
  ),
  cash: (
    <div className="w-12 h-12 bg-rose-600 text-white flex items-center justify-center rounded-full">
      <GiCash size={26} />
    </div>
  ),
  paypal: (
    <div className="w-12 h-12 bg-blue-700 text-white flex items-center justify-center rounded-full">
      <FaPaypal size={26} />
    </div>
  ),
};

const dummyData = [
  {
    account_name: "Cash",
  },
];

const AccountPage = () => {
  const { user } = useStore((state) => state);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTopup, setIsOpenTopup] = useState(false);
  const [isOpenTransfer, setIsOpenTransfer] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [data, setData] = useState(dummyData);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAccount = async () => {
    try {
      setIsLoading(true);
      // const {data: res} = await axios.get('/account')

      // setData(res?.data)
    } catch (error) {
      toast.error(error?.response?.data?.message);
      if (error?.response?.data?.status !== 200) {
        localStorage.remove("user");
        window.location.reload();
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(false);
    fetchAccount();
  }, []);

  const handleOpenAddMoney = async (acc) => {};

  const handleTransfermoney = async (acc) => {};

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full py-10">
          <div className="flex items-center justify-between">
            <p className="text-2xl 2xl:text-3xl font-semibold text-gray-600 mb-5">
              Accounts Information
            </p>

            <div className="flex items-center gap-4">
              <button className="py-1.5 px-2 rounded bg-black text-white flex items-center justify-center gap-2 border border-gray-500">
                <MdAdd size={22} />
                <span className="">Add</span>
              </button>
            </div>
          </div>

          {data?.length === 0 ? (
            <>
              {" "}
              <div className="w-full flex items-center justify-center py-10 text-gray-600 text-lg">
                <span>No Account Found</span>
              </div>
            </>
          ) : (
            <div className="w-full grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 py-10 gap-6">
              {data?.map((acc, index) => (
                <div
                  key={index}
                  className="w-full h-48 flex gap-4 bg-gray-50 p-3 rounded shadow"
                >
                  <div>{ICONS[acc?.account_name?.toLowerCase()]}</div>

                  <div className="space-y-2 w-full">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <p className="text-black text-2xl font-bold">
                          {acc?.account_name}
                        </p>

                        <MdVerifiedUser
                          size={26}
                          className="text-emerald-600 ml-1"
                        />
                      </div>
                      <AccountMenu
                        addMoney={() => handleOpenAddMoney(acc)}
                        transferMoney={() => handleTransfermoney(acc)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AccountPage;
