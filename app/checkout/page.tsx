import CheckoutClient from "@/app/checkout/_sections/checkout-client";
import CheckoutNavBar from "@/app/checkout/_sections/checkout-navbar";

export default function Checkout() {
  return (
    <div>
      <CheckoutNavBar />
      <CheckoutClient />
    </div>
  );
}
