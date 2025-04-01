import React, { createContext, useContext, useEffect, useState } from "react";
import { addWithdraw } from "../services/executiveServices";
import useUserType from "./UserProvider";

export const ExecutiveContext = createContext();

function useExecutive() {
  return useContext(ExecutiveContext);
}

export const ExecutiveProvider = ({ children }) => {
  const { user } = useUserType();
  const [executiveId, setExectiveId] = useState();
  const [profile, setProfile] = useState({}); // Executive profile
  const [payoutBalance, setPayoutBalance] = useState(1500.0); // Current balance
  const [withdrawalRequests, setWithdrawalRequests] = useState([
    { id: 1, amount: 300, status: "Pending", date: "2024-08-01" },
    { id: 2, amount: 500, status: "Approved", date: "2024-07-15" },
  ]); // Withdrawal history

  useEffect(() => {
    if (user && user.doctorId) {
      setExectiveId(user.executiveId._id);
      setProfile(user.executiveId);
    }
  }, [user && user.doctorId]);

  const handleWithdraw = async () => {
    // Here you'd implement the request to withdraw logic
    alert(
      "Your withdrawal request has been submitted and is awaiting approval."
    );
    // Simulate a new request
    const newRequest = {
      id: 3,
      amount: payoutBalance,
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
    };
    try {
      const res = await addWithdraw(newRequest);
    } catch (error) {
      Alert.alert("Unable to create Withdraw request, Please Try Later!");
    }
    setWithdrawalRequests([...withdrawalRequests, newRequest]);
    setPayoutBalance(0); // Reset the payout balance
  };

  return (
    <ExecutiveContext.Provider
      value={{
        executiveId,
        profile,
        setPayoutBalance,
        payoutBalance,
        handleWithdraw,
        withdrawalRequests,
        setProfile,
      }}
    >
      {children}
    </ExecutiveContext.Provider>
  );
};

export default useExecutive;
