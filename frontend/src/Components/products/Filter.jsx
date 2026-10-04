import { Button, FormControl, InputLabel, MenuItem, Select, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { FaSearch, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Filter = ({categories}) => {

    const [searchParams] = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const pathname = useLocation().pathname;
    const navigate = useNavigate();

    const [category, setCategory] = useState("all");
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(()=>{
        const currentCatergory = searchParams.get("category") || "all";
        const currentSortOrder = searchParams.get("sortby") || "asc";
        const currentSearchTerm = searchParams.get("keyword") || "";

        setCategory(currentCatergory);
        setSortOrder(currentSortOrder);
        setSearchTerm(currentSearchTerm);
    }, [searchParams]);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchTerm) {
                searchParams.set("keyword", searchTerm);
            } else {
                searchParams.delete("keyword");
            }
            navigate(`${pathname}?${searchParams.toString()}`);
        }, 700);
        return () => {
            clearTimeout(handler);
        };
    }, [searchParams, searchTerm, navigate, pathname]);

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        if(selectedCategory === "all"){
            params.delete("category");
        }
        else{
            params.set("category", selectedCategory);
        }
        navigate(`${pathname}?${params}`);
        setCategory(event.target.value);
    };

    const toggleSortOrder = () => {
        const newOrder = ( sortOrder==="asc" ) ? "desc" : "asc";
        params.set("sortby", newOrder);
        navigate(`${pathname}?${params}`);
        setSortOrder(newOrder);
    };
    
    const handleClearFilters = () => {
        navigate({pathname: window.location.pathname});
    };

    return(
        <div className="flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4">
            {/*  search bar */}
            <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full">
                <input type="text"
                value={searchTerm}
                onChange = {(e) => setSearchTerm(e.target.value)}
                placeholder="Search Products"
                className="border border-gray-400 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-[#1976d2]" />
                <FaSearch className="absolute left-3 text-slate-800 size={20}"/>
            </div>

            {/* category dropdown */}
            <div className="flex sm:flex-row flex-col gap-4 items-center ">
                <FormControl
                    className="text-slate-800 border-slate-700"
                    variant="outlined"
                    size="small">
                        <InputLabel> Category </InputLabel>
                        <Select
                            labelId="category-select-label"
                            value = {category}
                            onChange={handleCategoryChange}
                            label="Category"
                            className="min-w-[120px] text-slate-800 border-slate-700"
                        >
                            <MenuItem value="all"> All </MenuItem>
                            {categories.map(category => (
                                <MenuItem value={category.categoryName}
                                    key={category.categoryId}>
                                    {category.categoryName}
                                </MenuItem>
                            ))}
                        </Select>
                </FormControl>
                
                {/* sort button and clear filter */}
                <Tooltip title="sorted by price: asc">
                    <Button variant="contained"
                        onClick = {toggleSortOrder} 
                        color="primary"
                        className="flex items-center gap-2 h-10">
                        Sort by
                        {sortOrder === "asc" ? (<FaArrowUp/>) : (<FaArrowDown/>)}
                    </Button>
                </Tooltip>

                <button
                    className="flex items-center gap-2 bg-rose-900 text-white px-3 py-2 rounded-md transition duration-300 ease-in shadow-md focus:outline-none"
                    onClick={handleClearFilters}
                >
                    <FiRefreshCw className="font-semibold" size={16} />
                    <span className="font-semibold">Clear Filters</span>
                </button>
            </div>


        </div>
    );
}

export default Filter;