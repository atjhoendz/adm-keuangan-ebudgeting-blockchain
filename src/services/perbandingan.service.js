/* eslint-disable no-useless-catch */
import axiosService from './axios.service'

export class PerbandinganService {
  static async getBiayaRiilByNamaPemohon(key) {
    try {
      const response = await axiosService.get(
        `perbandingan-biaya/biaya-riil/${key}`
      )

      return response.data.data
    } catch (err) {
      throw err
    }
  }
}
