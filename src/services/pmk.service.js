/* eslint-disable no-useless-catch */
import axiosService from './axios.service'

export class PMKService {
  static get entity() {
    return 'pmk'
  }

  static async getAll() {
    try {
      const response = await axiosService.get(this.entity)

      return response.data.data
    } catch (err) {
      throw err
    }
  }
}
