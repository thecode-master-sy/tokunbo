"use client";
import { ChevronDown } from "./checkout-icons";
import { CheckoutForm } from "./checkout-client";
import { Input } from "@/components/ui/input";
import { CircleQuestionMark } from "lucide-react";

const NIGERIAN_STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

export default function DeliveryForm({
  formValues: { firstName, lastName, address, city, state, phone },
  setFormValues,
}: {
  formValues: CheckoutForm;
  setFormValues: React.Dispatch<React.SetStateAction<CheckoutForm>>;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-[20px] font-medium">Delivery</h2>

      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-2 z-10 text-[12px] text-[#888]">
          Country/Region
        </span>
        <select
          defaultValue="Nigeria"
          className="w-full appearance-none rounded-md outline-none  px-3 pt-7 pb-2 h-auto bg-white border text-sm"
        >
          <option>Nigeria</option>
        </select>
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#666]">
          <ChevronDown />
        </span>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Input
          id="fname"
          value={firstName}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, firstName: e.target.value }))
          }
          className="w-full px-3 py-3.5 h-auto bg-white border text-sm"
          placeholder="First name"
        />
        <Input
          id="lname"
          value={lastName}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, lastName: e.target.value }))
          }
          className="w-full px-3 py-3.5 h-auto bg-white border text-sm"
          placeholder="Last name"
        />
      </div>

      <Input
        id="addr"
        value={address}
        onChange={(e) =>
          setFormValues((prev) => ({ ...prev, address: e.target.value }))
        }
        autoComplete="street-address"
        className="w-full px-3 py-3.5 h-auto bg-white border text-sm"
        placeholder="Address"
      />

      <div className="flex gap-4 flex-col sm:flex-row">
        <Input
          id="city"
          value={city}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, city: e.target.value }))
          }
          className="w-full px-3 py-3.5 h-auto bg-white border text-sm flex-1"
          placeholder="City"
        />

        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-3 top-2 z-10 text-[11px] text-[#888]">
            State
          </span>
          <select
            value={state}
            onChange={(e) =>
              setFormValues((prev) => ({ ...prev, state: e.target.value }))
            }
            className="w-full appearance-none rounded-md outline-none  px-3 pt-7 pb-2 h-auto bg-white border text-sm"
          >
            <option value="" />
            {NIGERIAN_STATES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#666]">
            <ChevronDown />
          </span>
        </div>
      </div>

      <div className="relative mt-3">
        <Input
          id="phone"
          value={phone}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, phone: e.target.value }))
          }
          type="tel"
          autoComplete="tel"
          className="w-full px-3 py-3.5 h-auto bg-white border text-sm"
          placeholder="Phone"
        />
        <div className="pointer-events-none absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-1.5 text-[18px]">
          <CircleQuestionMark strokeWidth={1.5} size={15} />
        </div>
      </div>
    </div>
  );
}
