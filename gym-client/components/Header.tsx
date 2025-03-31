"use client";

import Link from "next/link";
import MobileNav from "./MobileNav";
import Nav from "./Nav";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdMenu } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import fetchUserDetails from "@/services/userService";
import { FaRegUserCircle } from "react-icons/fa";
import ROLE from "@/constants/roles";
import SummaryApi from "@/services/SummaryApi";
import { toast } from "react-toastify";
import { setUserDetails } from "@/store/userSlice";

const Header = () => {
  const [headerActive, setHeaderActive] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const router = useRouter();

  const [menuDisplay, setMenuDisplay] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);
  console.log("🚀 user header:", user);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });
    const data = await fetchData.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      router.push("/login");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };
  useEffect(() => {
    dispatch(fetchUserDetails());

    const handleScroll = () => {
      setHeaderActive(window.scrollY > 50);
    };

    // add scroll event
    window.addEventListener("scroll", handleScroll);
    // clear scroll event
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch, user?._id]);
  return (
    <header
      className={`${
        headerActive ? "h-[100px]" : "h-[124px]"
      } sticky max-w-[1920px] top-0 w-full bg-primary-200 h-[100px] transition-all z-50`}
    >
      <div className="container mx-auto h-full flex items-center justify-between">
        {/* logo */}
        <Link href="">
          <Image
            src={"/assets/assets/img/logo1.png"}
            width={150}
            height={55}
            alt=""
          />
        </Link>
        {/* mobile nav */}
        <MobileNav
          containerStyles={`${headerActive ? "top-[90px]" : "top-[124px]"}
                ${
                  openNav
                    ? "max-h-max pt-8 border-t border-white/10"
                    : "max-h-0 pt-0 pb-0 overflow-hidden border-white/0"
                }
                flex flex-col text-center gap-8 fixed bg-primary-200 w-full left-0 text-base uppercase font-medium text-white transition-all xl:hidden`}
        />
        {/* desktop nav */}
        <Nav containerStyles="flex gap-4 text-white test-base uppercase font-medium transition-all hidden xl:flex" />
        {/* menu button */}
        <div className="flex items-center gap-4">
          {user?._id && (
            <div
              className="text-3xl cursor-pointer relative flex justify-center"
              onClick={() => setMenuDisplay((prev) => !prev)}
            >
              <FaRegUserCircle className="text-white" />
            </div>
          )}

          {menuDisplay && (
            <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
              <nav>
                {user?.role === ROLE.ADMIN && (
                  <Link
                    href={"/adminPanel"}
                    className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                    onClick={() => setMenuDisplay((prev) => !prev)}
                  >
                    Admin Panel
                  </Link>
                )}
              </nav>
            </div>
          )}

          {/* login & register */}

          <div className="text-white flex items-center gap-4">
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="hover:text-accent transition-all text-base uppercase font-medium"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => router.push("/login")}
                  className="hover:text-accent transition-all test-base uppercase font-medium "
                >
                  Login
                </button>
                <button
                  onClick={() => router.push("/register")}
                  className="hover:text-accent transition-all test-base uppercase font-medium"
                >
                  Register
                </button>
              </>
            )}
          </div>
          <button
            onClick={() => setOpenNav(!openNav)}
            className="text-white xl:hidden"
          >
            <MdMenu className="text-4xl " />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
