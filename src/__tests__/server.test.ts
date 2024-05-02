
import { conectDB } from '../server'
import db from '../config/db'


jest.mock('../config/db')

describe('connectDB', () => {
    it('should handle database connection error', async () => {
        jest.spyOn(db, 'authenticate')
            .mockRejectedValueOnce(new Error('Hubo un error'))
        const consoleSpy = jest.spyOn(console, 'log')

        await conectDB()

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Hubo un error')
        )
    })
})