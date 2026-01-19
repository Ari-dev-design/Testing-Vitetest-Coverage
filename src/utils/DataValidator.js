export function calculateDiscount(price, discountPercentage) {
    if (price <= 0 || discountPercentage < 0 || discountPercentage > 100) {
        throw new Error("Parámetros de entrada inválidos.");
    }
    const finalPrice = price * (1 - discountPercentage / 100);
    return Math.round(finalPrice * 100) / 100;
}