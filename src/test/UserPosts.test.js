import { describe, it, expect, vi, } from 'vitest';
import { fetchUserPosts } from '../utils/fetchUserPosts';
describe('Pruebas de Mocking con vi.spyOn(global, "fetch")', () => {

    // 💡 Limpieza: Es fundamental restaurar la función 'fetch' original después de cada test
    // para que un test no afecte al siguiente (aislamiento de pruebas).
    it.afterEach(() => {
        vi.restoreAllMocks();
    });

    // Test: Simular que la API devuelve 2 posts y verificar la cuenta.
    it('debe devolver 2 posts al simular una respuesta OK con datos (Punto 5)', async () => {
        
        // --- ARRANGE (Preparación) ---
        const respuestaError = {
            ok: false,
            status: 500,
            json: async () => ({ message: 'Error interno' }),
        }
        
        // 1. Definimos los datos que queremos que 'fetch' simule devolver.
        const mockPosts = [
            { userId: 5, id: 1, title: 'Post 1' },
            { userId: 5, id: 2, title: 'Post 2' },
        ];

        // 2. Creamos el objeto de Respuesta simulada (Mock Response).
        // Debe imitar la estructura de una respuesta real de fetch: ok, status, y el método .json()

        //estamos simulando una respuesta exitosa con datos, ya que acceder a la api real no es viable en tests unitarios
    
        const mockResponse = {
            ok: true,           // Simula un Status 200/201
            status: 200,
            // 💡 El método json() debe ser asíncrono y resolver con nuestros datos.
            json: async () => mockPosts, 
        };

        // 3. 🎯 ACCIÓN CLAVE: Espiar la función 'fetch' GLOBAL.
        // Forzamos al spy a resolver la Promesa de 'fetch' con nuestro objeto 'mockResponse'.
        const fetchSpy = vi.spyOn(global, 'fetch')
                           .mockResolvedValue(mockResponse);


        // --- ACT (Ejecución) ---
        
        const userIdToTest = 4;
        const result = await fetchUserPosts(userIdToTest); // Ejecuta la función que llama a fetch


        // --- ASSERT (Verificación) ---

        // 1. Verificar que 'fetch' fue llamado (Punto 6: Spy de Argumentos)
        const expectedUrl = `https://jsonplaceholder.typicode.com/posts?userId=${userIdToTest}`;
        expect(fetchSpy).toHaveBeenCalledWith(expectedUrl); // Verificar la URL y argumentos

        // 2. Verificar el resultado de la función de negocio (fetchUserPosts)
        expect(result.count).toBe(2);
        expect(result.message).toBe('Se encontraron 2 posts.');
    });


    //TEST 1: Llamada Exitosa Simular una respuesta 200 con datos mockeados y verificar que la función devuelve esos datos.
// Este test ya está implementado arriba (en el bloque 'debe devolver 2 posts...').
// Verificamos el éxito con: expect(result.count).toBe(2);

    //TEST 2: Verificación de Argumentos Asegurar que fetch es llamado exactamente con la URL correcta (ej. /posts?userId=5).
// Este test ya está implementado arriba.
 // Verificamos la URL con: expect(fetchSpy).toHaveBeenCalledWith(expectedUrl);

    //TEST 3: Simular Fallo de Red Mockear una respuesta con ok: false (ej. Status 500) y verificar que se lanza el mensaje de error esperado.
it('debe lanzar un error cuando la API falla (Status 500)', async () => {
    // --- ARRANGE ---
    const respuestaError = {
        ok: false,
        status: 500,
        json: async () => ({ message: 'Error interno' }),
    };
    vi.spyOn(global, 'fetch').mockResolvedValue(respuestaError);

    // --- ASSERT ---
    await expect(fetchUserPosts(1)).rejects.toThrow('Fallo en la conexión: 500');
});

    //TEST 4: Simular Lista Vacía Mockear una respuesta 200 con un array vacío ([]) y verificar que la función maneja este caso devolviendo un mensaje de "no hay posts".
    it('debe devolver 0 posts si la respuesta es una lista vacía', async () => {
        // ARRANGE: Preparamos la respuesta vacía
        const respuestaVacia = {
            ok: true,
            status: 200,
            json: async () => [],
        };

        vi.spyOn(global, 'fetch').mockResolvedValue(respuestaVacia);

        // ACT
        const resultado = await fetchUserPosts(1);

        // ASSERT
        expect(resultado.count).toBe(0);
    });
});
