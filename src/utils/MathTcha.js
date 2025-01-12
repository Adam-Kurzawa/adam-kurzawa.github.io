export class MathTcha {

    static generateTest() {
        const size = MathTcha.#getRandomInt(3, 2)
        const values = []
        let result = 0

        for (let i = 0; i < size; i++) {
            const nextNumber = MathTcha.#getRandomInt(0, 21)
            values.push(nextNumber)
            result += nextNumber
        }

        return {
            values: values,
            result: result
        }
    }

    
    static #getRandomInt(min, max) {
        return Math.floor(Math.random() * max + min);
    }

}