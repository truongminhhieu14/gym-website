import { toast } from "react-toastify";
import SummaryApi from "./SummaryApi";
import { AppDispatch } from "@/store/store";
import { setUserDetails } from "@/store/userSlice";

const fetchUserDetails = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const dataResponse = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: "include",
      });
      const dataApi = await dataResponse.json();
      console.log("User detail:", dataApi);
      if (dataApi.success) {
        dispatch(setUserDetails(dataApi.data));
      } else {
        throw new Error(dataApi.message);
      }
    } catch (err) {
      //console.log("🚀 ~ fetchUserDetails ~ err:", err);
      toast.error("Error fetching user details!");
    }
  };
};

export default fetchUserDetails;
