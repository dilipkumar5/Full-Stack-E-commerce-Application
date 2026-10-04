import { Pagination as MuiPagination } from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
const Pagination = ({ totalPages, totalProducts }) => {
    const [searchParams] = useSearchParams();
    const pathname = useLocation().pathname;
    const params = new URLSearchParams(searchParams);
    const navigate = useNavigate();
    const paramValue = searchParams.get("page")
                ? Number(searchParams.get("page"))
                : 1;

    const onChangeHandler = (event, value) => {
        params.set("page", value.toString());
        navigate(`${pathname}?${params}`);
    }

    return (
        <MuiPagination
            count={totalPages}
            page = {paramValue}
            defaultPage={1}
            siblingCount={1}
            boundaryCount={1}
            shape="rounded"
            color="primary"
            onChange={onChangeHandler}
        />
       
    )
};

export default Pagination;