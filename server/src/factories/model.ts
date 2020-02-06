import DAO from './dao'

interface ClassNew<U> extends Function {
  new(...args: any[]): U
}

/** Represent database model object*/
function Model<T>(dao: DAO, extendingModel: ClassNew<T>) {
  return {
    /**
     * Find in db by primary key
     * @param id
     */
    async findById(id: string): Promise<T | null> {
      const obj = await dao.findById(id)
      return obj ? new extendingModel(obj) : null
    },
  }
}

export default Model
