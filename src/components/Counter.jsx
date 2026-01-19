import React, { useState } from 'react';

// Nuevo foco: Testear el estado, los límites y la interacción simple.
export default function Counter({ initialValue = 0, maxValue = 10 }) {
    const [count, setCount] = useState(initialValue);
    const MIN_VALUE = 0;

    const increment = () => {
        if (count < maxValue) {
            setCount(prev => prev + 1);
        }
    };

    const decrement = () => {
        if (count > MIN_VALUE) {
            setCount(prev => prev - 1);
        }
    };

    const reset = () => {
        setCount(initialValue);
    };

    // CRITERIO 2: Indicador de error/límite (funcionalidad crítica a testear)
    const isAtMax = count === maxValue;
    const isAtMin = count === MIN_VALUE;

    return (
        <div className="counter" data-testid="counter-app">
            <h1 data-testid="current-count">{count}</h1>
            
            {/* Indicadores de límite para testear el estado del DOM */}
            {isAtMax && <p data-testid="max-warning" style={{ color: 'red' }}>Límite Máximo alcanzado.</p>}
            {isAtMin && <p data-testid="min-warning" style={{ color: 'blue' }}>Límite Mínimo alcanzado.</p>}

            <button onClick={increment} disabled={isAtMax} data-testid="btn-incrementar">
                Incrementar
            </button>
            <button onClick={decrement} disabled={isAtMin} data-testid="btn-decrementar">
                Decrementar
            </button>
            <button onClick={reset} data-testid="btn-reset">
                Reset
            </button>
        </div>
    );
}