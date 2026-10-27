import { useQuery } from "@tanstack/react-query";
import getDashboardUsers from "../../service/Admin/getDashboardUsers";

function useGetDashboardUsers() {
    return useQuery({
        queryKey: ["dashboardUsers"],
        queryFn: getDashboardUsers,
    });
}

export default useGetDashboardUsers;