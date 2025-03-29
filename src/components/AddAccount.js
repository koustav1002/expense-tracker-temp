import React, { useState } from "react";
import useStore from "../store";
import { generateAccountNumber } from "../store/utils";
import { useForm } from "react-hook-form";
import { DialogWrapper } from "./wrapper/DialogWrapper";
import { DialogPanel, DialogTitle } from "@headlessui/react";
import { MdOutlineWarning } from "react-icons/md";
import Input from "./ui/Input";
import { Button } from "./ui/Button";
import { BiLoader } from "react-icons/bi";
import axios from "axios";
import { toast } from "react-toastify";

const accounts = ["Cash", "Crypto", "Paypal", "Visa Debit Card"];

const AddAccount = ({ isOpen, setIsOpen, id, refetch, key }) => {
  const { user } = useStore((state) => state);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { account_number: generateAccountNumber() },
  });

  const [selectedAccount, setSelectedAccount] = useState(accounts[0]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const newData = { ...data, name: selectedAccount };

      const { data: res } = await axios.post("/account/create", newData);
      if (res?.data) {
        toast.success(res?.message);
        setIsOpen(false);
        refetch();
      }
    } catch (error) {
      console.error("Something went wrong: ", error);
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <DialogWrapper isOpen={isOpen} closeModal={closeModal}>
      <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
        <DialogTitle
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900 mb-4 uppercase"
        >
          Add Account
        </DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
          <div className="flex flex-col gap-1 mb-2">
            <p className="text-gray-600 text-sm mb-2">Select Account</p>
            <select
              onChange={(e) => setSelectedAccount(e.target.value)}
              className="bg-transparent appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 outline-none focus:ring-1 ring-blue-500"
            >
              {accounts.map((acc, index) => (
                <option
                  key={index}
                  value={acc}
                  className="w-full flex items-center justify-center"
                >
                  {acc}
                </option>
              ))}
            </select>
          </div>

          {user?.accounts?.includes(selectedAccount) ? (
            <div className="flex items-center gap-2 bg-yellow-400 text-black p-2 mt-6 rounded">
              <MdOutlineWarning size={30} />
              <span className="text-sm">
                This account has already been activated. Try another one. Thank
                you.
              </span>
            </div>
          ) : (
            <>
              <Input
                name="account_number"
                label="Account Number"
                placeholder="1223457"
                {...register("account_number", {
                  required: "Account Number is required!!",
                })}
                // error={errors.account_number ? errors.account_number.message : ""}
                className="inputStyle"
              />

              <Input
                type="number"
                name="amount"
                label="Initial Amount"
                placeholder="10.56"
                {...register("account", {
                  required: "Initial amount is required!!",
                })}
                // error={errors.account_number ? errors.account_number.message : ""}
                className="inputStyle"
              />

              <Button
                disabled={loading}
                type="submit"
                className="bg-violet-700 text-white w-full mt-4"
              >
                {loading ? (
                  <BiLoader className="text-xl animate-spin text-white" />
                ) : (
                  "Create Account"
                )}
              </Button>
            </>
          )}
        </form>
      </DialogPanel>
    </DialogWrapper>
  );
};

export default AddAccount;
