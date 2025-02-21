import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { DialogWrapper } from "./wrapper/DialogWrapper";
import { DialogPanel, DialogTitle } from "@headlessui/react";
import { toast } from "react-toastify";
import Input from "./ui/Input";
import { Button } from "./ui/Button";

const AddMoney = ({ isOpen, setIsOpen, id, refetch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (data) => {
    try {
      setLoading(true);
      const { data: res } = await axios.put(`/account/add-money/${id}`, data);

      if (res?.data) {
        toast.success(res?.message);
        setIsOpen(false);
        refetch();
      }
    } catch (error) {
      console.error("Something went wrong:", error);
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <DialogWrapper isOpen={isOpen} closeModal={closeModal}>
      <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
        <DialogTitle
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900 mb-4 uppercase"
        >
          Add Money to Account
        </DialogTitle>

        <form onSubmit={handleSubmit(submitHandler)}>
          <Input
            type="number"
            name="amount"
            label="Amount"
            placeholder="10.56"
            {...register("amount", {
              required: "Account is required!",
            })}
            error={errors.amount ? errors.amount.message : ""}
          />

          <div className="w-full mt-8">
            <Button
              loading={loading}
              type="submit"
              className="bg-violet-700 text-white w-full"
            >
              {loading
                ? "Submitting..."
                : `Submit Rs.${watch("amount") || " 0"}`}
            </Button>
          </div>
        </form>
      </DialogPanel>
    </DialogWrapper>
  );
};

export default AddMoney;
