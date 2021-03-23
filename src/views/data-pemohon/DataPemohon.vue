<template>
  <CRow>
    <CCol col="12">
      <card-list-data
        title="Data Pemohon"
        :showBtnTambah="false"
        :items="items"
        :fields="fields"
        :isLoading="isLoading"
      ></card-list-data>
    </CCol>
    <toast-msg :listToasts="listToasts" />
  </CRow>
</template>

<script>
import CardListData from '../../components/CardListData.vue'
import ToastMsg from '../../components/ToastMsg'
// import { itemsPemohon } from '../../sample-data/data'
import { PemohonService } from '../../services/pemohon.service'
import { fields } from './options'

export default {
  name: 'DataPemohon',
  components: { CardListData, ToastMsg },
  data() {
    return {
      items: [],
      fields,
      isLoading: false,
      listToasts: [],
    }
  },
  methods: {
    async getAll() {
      this.isLoading = true

      try {
        const data = await PemohonService.getAll()

        this.items = data.map(item => {
          return {
            key: item.Key,
            ...item.Record,
          }
        })
      } catch (err) {
        const toast = {
          message: 'Terjadi masalah. Data pemohon tidak berhasil didapatkan.',
          color: 'danger',
        }
        this.listToasts.push(toast)
      }
      this.isLoading = false
    },
  },
  async mounted() {
    await this.getAll()
  },
}
</script>

<style></style>
