import { IUser } from '../models/user.model'
import DAO from '../factories/dao'
import QueryExecutor from '../utils/database/queryExecutor'

class UserDAO extends DAO {
    constructor(tableName: string) {
        super(tableName)
    }

    async create(userObj: IUser) {
        const query = `INSERT INTO \`${this.tableName}\` (\`id\`, \`name\`, \`username\`, \`salt\`, \`password\`) VALUES( ?, ?, ?, ?, ? )`
        await QueryExecutor.preparedQuery(query, [
            userObj.id,
            userObj.name,
            userObj.username,
            userObj.salt,
            userObj.password,
        ])
    }

    async findByUsername(username: string): Promise<any | null> {
        const query = `SELECT * FROM \`${this.tableName}\`  WHERE \`username\` = ?`
        const { results } = await QueryExecutor.preparedQuery(query, [username])
        return results.length ? results[0] : null
    }
}

export default UserDAO
