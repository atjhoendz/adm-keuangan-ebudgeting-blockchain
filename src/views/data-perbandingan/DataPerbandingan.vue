<template>
  <CRow>
    <CCol col="12">
      <card-list-data
        title="Data Pemohon yang Melakukan Perjalanan Dinas"
        :items="items"
        :fields="fieldsDataPemohon"
        :routeEndpoint="routeEndpoint"
        :showBtnTambah="false"
      >
        <template #daftar-pernyataan-riil="{item}">
          <CButton
            color="secondary"
            size="sm"
            :to="detailRiil(item.data_pemohon.key)"
            >Detail</CButton
          >
        </template>
        <template #perbandingan-biaya="{item}">
          <CButton
            color="secondary"
            size="sm"
            :to="detailPerbandingan(item.data_pemohon.key)"
            >Detail</CButton
          >
        </template>
      </card-list-data>
    </CCol>
    <toast-msg :listToasts="listToasts" />
  </CRow>
</template>

<script>
import CardListData from '../../components/CardListData.vue'
import ToastMsg from '../../components/ToastMsg'
import { EstimasiService } from '../../services/estimasi.service'
import { fieldsDataPemohon } from './fields'

export default {
  components: { CardListData, ToastMsg },
  name: 'DataPerbandingan',
  data() {
    return {
      fieldsDataPemohon,
      items: [],
      listToasts: [],
      routeEndpoint: 'data-perbandingan',
    }
  },
  methods: {
    async getDataPemohon() {
      try {
        const dataEstimasi = await EstimasiService.getAll()

        this.items = dataEstimasi.map(item => {
          return {
            key: item.Key,
            nama_pemohon: item.Record.data_pemohon.nama,
            status_berkas: item.Record.data_pemohon.status_berkas,
            maksud_perjalanan: item.Record.data_pemohon.maksud_perjalanan,
            ...item.Record,
          }
        })
      } catch (err) {
        this.listToasts.push({
          message: 'Terjadi masalah. Data pemohon tidak berhasil didapatkan.',
          color: 'danger',
        })
      }
    },
    detailRiil(key) {
      return `${this.routeEndpoint}/daftar-pernyataan-riil/${key}`
    },
    detailPerbandingan(key) {
      return `/${this.routeEndpoint}/detail-perbandingan-biaya/${key}`
    },
  },
  async mounted() {
    await this.getDataPemohon()
  },
}
</script>

<style></style>
