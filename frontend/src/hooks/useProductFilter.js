import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../store/actions";

const useProductFilter = () => {
    const [searchparams] = useSearchParams();
    const dispatch = useDispatch();
    useEffect(() => {
        const params = new URLSearchParams();

        const currentPage = searchparams.get("page") 
                            ? Number(searchparams.get("page"))
                            : 1;
        params.set("pageNumber", currentPage-1);
        const sortOrder = searchparams.get("sortby") || "asc";
        const categoryParams = searchparams.get("category") || null;
        const keyword = searchparams.get("keyword") || null;
        params.set("sortBy", "price");
        params.set("sortOrder", sortOrder);
        if(categoryParams){
            params.set("category", categoryParams);
        }
        if(keyword){
            params.set("keyword", keyword);
        }
        const queryString = params.toString();
        dispatch(fetchProducts(queryString));
        console.log("query: ",  queryString);
    }, [dispatch, searchparams]);
};
export default useProductFilter;