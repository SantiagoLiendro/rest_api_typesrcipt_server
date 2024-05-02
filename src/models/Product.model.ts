import { DataTypes } from 'sequelize'
import { Table, Column, Model, DataType, Default } from 'sequelize-typescript'

@Table({
    tableName: 'products'
})
class Products extends Model {
    @Column({
        type: DataType.STRING(100)
    })
    declare name: string

    @Column({
        type: DataType.FLOAT(5)
    })
    declare price: number

    @Default(true)
    @Column({
        type: DataTypes.BOOLEAN
    })
    declare availability: boolean
}

export default Products