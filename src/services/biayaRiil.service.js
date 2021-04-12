/* eslint-disable no-useless-catch */
import axiosService from './axios.service'

export class BiayaRiilService {
  static get entity() {
    return 'biaya-riil'
  }

  static async getAll() {
    try {
      const response = await axiosService.get(this.entity)

      return response.data.data
    } catch (err) {
      throw err
    }
  }

  static async get(key) {
    try {
      const response = await axiosService.get(`${this.entity}/${key}`)

      return response.data
    } catch (err) {
      throw err
    }
  }

  static async addData(formData) {
    try {
      const response = await axiosService.post(this.entity, formData)

      return response.data
    } catch (err) {
      throw err
    }
  }

  static async update(key, formData) {
    try {
      const response = await axiosService.put(`${this.entity}/${key}`, formData)

      return response.data
    } catch (err) {
      throw err
    }
  }

  static async delete(key) {
    try {
      const response = await axiosService.delete(`${this.entity}/${key}`)

      return response.data
    } catch (err) {
      throw err.response.data
    }
  }

  static async getCountData() {
    try {
      const data = await this.getAll()

      return data.length
    } catch (err) {
      throw err
    }
  }
}
