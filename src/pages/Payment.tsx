import React from "react";
import { useParams } from "react-router-dom";

const Payment = () => {
  const { id } = useParams();

  return (
    <div className="container-max py-16 flex flex-col items-center justify-center">
      <div className="card p-8 w-full max-w-md flex flex-col gap-6">
        <h1 className="text-3xl font-extrabold text-brand-600 mb-2 text-center">Payment</h1>
        <p className="text-neutral-700 text-center mb-4">
          You are about to purchase template <span className="font-bold">{id}</span>.
        </p>
        {/* Payment form or integration goes here */}
        <button className="btn btn-primary mt-2">Proceed to Payment</button>
      </div>
    </div>
  );
};

export default Payment;
