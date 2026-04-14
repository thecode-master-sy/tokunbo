import { Input } from "@/components/ui/input";
import {
  SiInstagram,
  SiFacebook,
  SiWhatsapp,
  SiTiktok,
} from "@icons-pack/react-simple-icons";

export default function Footer() {
  return (
    <footer className="bg-hero mt-14 px-4 py-10 grid md:grid-cols-2 gap-7">
      <div className="grid md:grid-cols-2">
        <div className="space-y-2">
          <p>
            Enter your email for the latest updates about our newest product
            launches, member discounts, and more!
          </p>

          <Input
            placeholder="Enter your email address"
            className="bg-white rounded-sm h-10 text-body"
          />
          <button className="bg-banner h-10 flex justify-center items-center rounded-full w-full">
            Subscribe
          </button>

          <div className="flex mb-15 mt-16 gap-4">
            <SiInstagram size={18} />
            <SiFacebook size={18} />
            <SiWhatsapp size={18} />
            <SiTiktok size={18} />
          </div>
        </div>
        <div className="hidden md:block">
          <div></div>
        </div>
      </div>

      <div className="grid gap-7">
        <div className="flex flex-wrap gap-14 md:gap-20">
          <div className="space-y-2">
            <p className="font-bold">Shop</p>
            <ul>
              <li>Pots</li>
              <li>Blenders</li>
              <li>Air fryers</li>
              <li>Kettle</li>
              <li>Gas cookers</li>
              <li>Knives</li>
              <li>Childrens toys</li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="font-bold">Useful links</p>
            <ul>
              <li>Home</li>
              <li>About us</li>
              <li>Contact</li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="font-bold">Get help</p>
            <ul>
              <li>Stocklist</li>
              <li>
                Shipping <br /> & Returns
              </li>
              <li>Refunds</li>
            </ul>
          </div>
        </div>

        <div className="self-end text-[10px]">
          <div className="space-x-4">
            <span>Privacy Policy</span>
            <span>Terms & Conditions</span>
            <span>Site by thecodemaster</span>
          </div>
          <p>© 2026 Blessing Tokunbo Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
