import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "../components/Counter.jsx";

// NOTA: Recuerda que para testear correctamente el estado, necesitas usar `await`
// o `findBy...` en casos más complejos, pero para los clics simples, `fireEvent.click`
// suele ser suficiente.

//RECOMENDACION: Sigue el patrón AAA (Arrange, Act, Assert) en cada test para mantener claridad.
//PONER await donde sea necesario, sobretodo en los fireEvent en casos más complejos, pero en estos básicos no es obligatorio
describe("Counter Component", () => {
  // --- TEST 1: Verificar el estado inicial ---
  it("debe renderizar el contador con el valor inicial de 0", () => {
    // ARRANGE: Renderizar el componente
    render(<Counter />);

    // ACT: No hay acció

    // ASSERT: Verificar el valor en el DOM
    expect(screen.getByTestId("current-count")).toHaveTextContent("0");
  });

  // --- TEST 2: Incremento básico (AAA) ---
  it("debe incrementar el contador en 1 al hacer clic", async () => {
    // ARRANGE
    render(<Counter />);
    const incrementButton = screen.getByTestId("btn-incrementar");

    // ACT
    //await no es obligatorio aquí pero puede ser útil en casos más complejos
    fireEvent.click(incrementButton);

    // ASSERT
    expect(screen.getByTestId("current-count")).toHaveTextContent("1");
  });

  // --- TEST 3: Límite Mínimo (Caso Borde) ---
  it("debe mostrar la advertencia de límite mínimo al iniciar y no permitir decrementar", async () => {
    // ARRANGE
    render(<Counter initialValue={0} />);
    const decrementButton = screen.getByTestId("btn-decrementar");

    // ACT
    // Intentar decrementar cuando ya está en el mínimo
    await fireEvent.click(decrementButton);

    // ASSERT
    expect(screen.getByTestId("min-warning")).toBeInTheDocument(); // Verificamos aviso
    expect(decrementButton).toBeDisabled(); // Verificamos botón bloqueado
    expect(screen.getByTestId("current-count")).toHaveTextContent("0"); // Verificamos que no baja
  });

  // --- TEST 4: Decremento básico ---
  it("debe decrementar el contador en 1 al hacer clic en el botón de restar", async () => {
    // ARRANGE
    render(<Counter initialValue={5} />);
    const decrementButton = screen.getByTestId("btn-decrementar");

    // ACT
    await fireEvent.click(decrementButton);

    // ASSERT
    expect(screen.getByTestId("current-count")).toHaveTextContent("4");
  });

  // --- TEST 5: Límite Máximo ---
  it("no debe permitir incrementar mas alla del valor maximo (10)", async () => {
    // ARRANGE
    render(<Counter initialValue={10} maxValue={10} />);
    const incrementButton = screen.getByTestId("btn-incrementar");

    // ACT
    await fireEvent.click(incrementButton);

    // ASSERT
    expect(screen.getByTestId("max-warning")).toBeInTheDocument(); // Verificamos aviso
    expect(incrementButton).toBeDisabled(); // Verificamos botón bloqueado
    expect(screen.getByTestId("current-count")).toHaveTextContent("10"); // Verificamos que no sube
  });
  // --- TEST 6: Incremento hasta el máximo y verificar estado del botón ---
  it("debe deshabilitar el boton de incrementar al llegar a 10", async () => {
    // ARRANGE
    render(<Counter initialValue={9} maxValue={10} />);
    const btnInc = screen.getByTestId("btn-incrementar");

    // ACT
    await fireEvent.click(btnInc); // Llevamos al maximo

    // ASSERT
    expect(screen.getByTestId("current-count")).toHaveTextContent("10"); // Verificamos valor
    expect(btnInc).toBeDisabled(); // Verificamos botón bloqueado
    expect(screen.getByTestId("max-warning")).toBeInTheDocument(); // Verificamos aviso
  });

  // --- TEST 7: Decremento hasta el mínimo y verificar estado del botón ---
  it("debe deshabilitar el boton de decrementar al llegar a 0", async () => {
    // ARRANGE
    render(<Counter initialValue={1} minValue={0} />);
    const btnDec = screen.getByTestId("btn-decrementar");

    // ACT
    await fireEvent.click(btnDec); // Llevamos al minimo

    // ASSERT
    expect(screen.getByTestId("current-count")).toHaveTextContent("0"); // Verificamos valor
    expect(btnDec).toBeDisabled(); // Verificamos botón bloqueado
    expect(screen.getByTestId("min-warning")).toBeInTheDocument(); // Verificamos aviso
  });

  // --- TEST 8: Resetear el contador ---
  it("debe resetear el contador al valor inicial al hacer clic en reset", async () => {
    // ARRANGE
    render(<Counter />); // Arranca en 0
    const btnInc = screen.getByTestId("btn-incrementar");
    const btnReset = screen.getByTestId("btn-reset");

    // ACT
    await fireEvent.click(btnInc); // Incrementa a 1
    expect(screen.getByTestId("current-count")).toHaveTextContent("1"); // Verifica a 1

    // ACT
    await fireEvent.click(btnReset); // Resetea

    // ASSERT
    expect(screen.getByTestId("current-count")).toHaveTextContent("0"); // Verifica reseteo a 0
  });
});
