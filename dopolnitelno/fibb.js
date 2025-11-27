/**
 * Вычисляет n-ое число Фибоначчи
 * @param {number} n - Индекс в последовательности Фибоначчи (0 <= n <= 1000)
 * @returns {number} n-ое число из последовательности Фибоначчи
 */
function fibb(n) {
    // Проверка корректности входных данных
    if (!Number.isInteger(n) || n < 0 || n > 1000) {
        throw new Error('n должно быть целым числом от 0 до 1000');
    }

    // Базовые случаи последовательности Фибоначчи
    if (n === 0) {
        return 0;
    }
    if (n === 1) {
        return 1;
    }

    // Итеративный подход для остальных случаев
    let prev = 0;
    let curr = 1;

    for (let i = 2; i <= n; i += 1) {
        const next = prev + curr;
        prev = curr;
        curr = next;
    }

    return curr;
}

// Экспорт функции для использования в других модулях
module.exports = fibb;