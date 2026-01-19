import { describe, it, expect } from "vitest";
// 💡 IMPORTACIÓN ACTUALIZADA: Usando el nombre correcto de la función
import { calculateDiscount } from "../utils/DataValidator.js";
// Usamos 'describe' para agrupar todos los tests relacionados con la función de descuento.
describe("calculateDiscount", () => {
  // --- Tests de Éxito (Cálculos Nominales) ---

  it("debe calcular el precio con un descuento nominal del 20%", () => {
    // ARRANGE (Preparar: Precio de 100, Descuento del 20%)
    const price = 100;
    const discount = 20;

    // ACT (Ejecutar: Llamar a la función)
    const result = calculateDiscount(price, discount);

    // ASSERT (Verificar: El resultado debe ser 80)
    expect(result).toBe(80.0);
  });

  // --- Test 2 Testear con 0% de descuento (Caso Borde)
  it("debe devolver el precio original cuando el descuento es 0% ", () => {
    // ARRANGE
    const price = 50;
    const discount = 0;

    // ACT
    const result = calculateDiscount(price, discount);

    // ASSERT
    expect(result).toBe(50.0);
  });

  // --- Test 3 Testear con 100% de descuento (Caso Borde) ---
  it("debe devolver 0 cuando el descuento es 100% ", () => {
    // ARRANGE
    const price = 200;
    const discount = 100;

    // ACT
    const result = calculateDiscount(price, discount);

    // ASSERT
    expect(result).toBe(0.0); //Gratis
  });

  // --- Test 4: Verificar que se lanza un error si el precio inicial es cero o negativo.
  it("debe lanzar un error si el precio es negativo o cero", () => {
    // ASSERT DIRECTO
    // Probamos con precio negativo
    expect(() => calculateDiscount(-10, 20)).toThrow();

    // Probamos con precio 0 (si tu lógica lo prohíbe)
    expect(() => calculateDiscount(0, 20)).toThrow();
  });

  // --- Tests 5: Precisión Decimal Verificar que el resultado se redondea correctamente a dos decimales (Punto 13).
  it("debe devolver el resultado redondeado a dos decimales", () => {
    // ARRANGE: 100 - 33.333% = 66.667...
    // Debería redondearse a 66.67
    const result = calculateDiscount(100, 33.333);

    // ASSERT
    expect(result).toBe(66.67);
  });

  // -- Test 6: testear el toThrow todos los casos posibles
  it("debe lanzar error si el descuento es inválido (negativo o > 100)", () => {
    // Descuento negativo
    expect(() => calculateDiscount(100, -5)).toThrow();

    // Descuento mayor al 100%
    expect(() => calculateDiscount(100, 150)).toThrow();
  });
});
