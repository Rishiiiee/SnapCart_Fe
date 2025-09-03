import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");

  useEffect(() => {
    // Optional: sessionId ko UI me show ya order fetch karo
    console.log("Stripe session:", sessionId);
  }, [sessionId]);

  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold">Payment Successful 🎉</h2>
      <p className="mt-2">Thank you for your order.</p>
      <Link className="text-blue-600 underline mt-4 inline-block" to="/orders">
        View Orders
      </Link>
    </div>
  );
}
