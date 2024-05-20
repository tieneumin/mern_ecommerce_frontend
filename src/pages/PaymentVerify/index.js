import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

import { verifyPayment } from "../../utils/api_payment";

export default function PaymentVerify() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // extract query string from URL
  const billplzId = searchParams.get("billplz[id]");
  const billplzPaid = searchParams.get("billplz[paid]");
  const billplzPaidAt = searchParams.get("billplz[paid_at]");
  const billplzSignature = searchParams.get("billplz[x_signature]");

  // console.log(billplzId);
  // console.log(billplzPaid);
  // console.log(billplzPaidAt);
  // console.log(billplzSignature);

  useEffect(() => {
    // trigger payment verification mutation on page load
    verifyPaymentMutation.mutate({
      billplzId,
      billplzPaid,
      billplzPaidAt,
      billplzSignature,
    });
  }, []);

  const verifyPaymentMutation = useMutation({
    mutationFn: verifyPayment,
    onSuccess: (updatedOrder) => {
      // verify order is paid
      // if paid, show payment success message
      if (updatedOrder.status === "paid") {
        enqueueSnackbar("Payment is successful", {
          variant: "success",
        });
      }
      // if failed, show payment failure message
      if (updatedOrder.status === "failed") {
        enqueueSnackbar("Payment failed", {
          variant: "error",
        });
      }
      // redirect user to /orders page
      navigate("/orders");
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
    },
  });

  return <>Verifying your payment...</>;
}

// http://localhost:3000/verify-payment?billplz%5Bid%5D=sau0dlyq&billplz%5Bpaid%5D=true&billplz%5Bpaid_at%5D=2024-05-09+10%3A34%3A40+%2B0800&billplz%5Bx_signature%5D=2f70a7e14d77843e1f68a36c1841e8d9b85cbeb37bcea4d57f37afb66d16b516
