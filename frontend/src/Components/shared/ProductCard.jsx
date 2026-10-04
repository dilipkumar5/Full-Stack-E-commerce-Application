import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ProductViewModal from "./ProductViewModal";
import truncateText from "../../utils/truncateText";
import { addToCart } from "../../store/actions";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const ProductCard = ({
        productId,
        productName,
        image,
        description,
        quantity,
        price,
        discount,
        specialPrice 
}) => {
    const [openProductViewModal, setOpenProductViewModal] = useState(false);
    const btnLoader = false;
    const [selectedViewProduct, setSelectedViewProduct] = useState("");
    const isAvailable = quantity && Number(quantity) > 0;

    const handleProductView = (product) => {
        setSelectedViewProduct(product);
        setOpenProductViewModal(true);
    }
    const dispatch = useDispatch();

    const addToCartHandler = (cartItems) => {
        dispatch(addToCart(cartItems, 1, toast));
    }

    return (
        <div className="border-2 border-slate-300 rounded-lg shadow-xl overflow-hidden transition-shadow duration-300">
            <div onClick={() => {
                handleProductView({
                    productId,
                    productName,
                    image,
                    description,
                    quantity,
                    price,
                    discount,
                    specialPrice
                })
            }}
            className="w-full overflow-hidden aspect-[3/2]">
                <img className="w-full h-full cursor-pointer transition-transform duration-300 transform hover:scale-105"
                     src={ image }>
                </img>
            </div>
            <div className = "p-4">
                <h2 onClick={() => {
                    handleProductView({
                        productId,
                        productName,
                        image,
                        description,
                        quantity,
                        price,
                        discount,
                        specialPrice
                    })
                }}
                    className="text-lg font-semibold mb-2 cursor-pointer">
                    {productName}
                </h2>

                <div className="min-h-20 max-h-20">
                    <p className="text-gray-600 text-sm">
                        {/* <truncateText/> */}
                        {truncateText(description, 90)}
                    </p>
                </div>

                <div className="flex items-center justify-between">
                    {specialPrice ?  (
                        <div className="flex flex-col">
                            <span className="text-gray-400 line-through">
                                ${Number(price).toFixed(2)}
                            </span>
                            <span className="text-xl font-bold text-slate-700">
                                ${Number(specialPrice).toFixed(2)}
                            </span>
                        </div>
                    ) : (
                        <div>
                            <span className="text-xl font-bold text-slate-700 ">
                                {" "}
                                ${Number(price).toFixed(2)}
                            </span>
                        </div>
                    )}

                    <button
                        disabled={!isAvailable || btnLoader}
                        onClick={() => addToCartHandler({
                            image,
                            productName,
                            description,
                            specialPrice,
                            price,
                            productId,
                            quantity
                        })}
                        className={`bg-blue-500 ${isAvailable ? "opacity-100 hover:bg-blue-600 cursor-pointer" : "opacity-70 " }
                                        text-white py-2 px-3 rounded-lg items-center transition-colors duration-300 w-36 flex justify-center` }>
                                            <FaShoppingCart className = "mr-2"/>
                        {isAvailable ? "Add to cart" : "Out of Stock"}
                    </button>
                </div>
                
            </div>
            <ProductViewModal
                open = {openProductViewModal}
                setOpen ={setOpenProductViewModal}
                product = {selectedViewProduct}
                isAvailable = {isAvailable}
            />
        </div>
    )
}

export default ProductCard;