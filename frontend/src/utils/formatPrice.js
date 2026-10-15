const formatPrice = (amount) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(amount);
}

export default formatPrice;


export const formatPriceCalculation = (quantity, amount) => {
    return (Number(quantity) * Number(amount)).toFixed(2);
}