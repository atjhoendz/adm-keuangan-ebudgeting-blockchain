<template>
  <CRow>
    <CCol sm="12" lg="8">
      <CWidgetSimple
        header="Message"
        text="Selamat Datang di Halaman Admin Keuangan"
      >
      </CWidgetSimple>
    </CCol>
    <CCol sm="12" lg="4" v-for="(item, i) in dataDashboard" :key="i">
      <CWidgetSimple :header="item.title" :text="item.text.toString()">
        <CSpinner color="info" v-if="isLoading && !item.text.length" />
      </CWidgetSimple>
    </CCol>
    <toast-msg :listToasts="listToasts" />
  </CRow>
</template>

<script>
import { PemohonService } from '../services/pemohon.service'
import { BiayaRiilService } from '../services/biayaRiil.service'
import { EstimasiService } from '../services/estimasi.service'
import ToastMsg from '../components/ToastMsg'

export default {
  name: 'Dashboard',
  components: { ToastMsg },
  data() {
    return {
      dataDashboard: [
        {
          title: 'Data Pemohon',
          text: '',
        },
        {
          title: 'Data Estimasi',
          text: '',
        },
        {
          title: 'Data Biaya Riil',
          text: '',
        },
        {
          title: 'Data Perbandingan',
          text: 'soon',
        },
      ],
      listToasts: [],
      isLoading: false,
    }
  },
  methods: {
    async getTotalDataPemohon() {
      try {
        const dataLength = await PemohonService.getCountData()

        this.dataDashboard[0].text = dataLength
      } catch (err) {
        this.listToasts.push({
          message:
            'Terjadi masalah. Jumlah data pemohon tidak berhasil didapatkan.',
          color: 'danger',
        })
      }
    },
    async getTotalDataEstimasi() {
      try {
        const dataLength = await EstimasiService.getCountData()

        this.dataDashboard[1].text = dataLength
      } catch (err) {
        this.listToasts.push({
          message:
            'Terjadi masalah. Jumlah data estimasi tidak berhasil didapatkan.',
          color: 'danger',
        })
      }
    },
    async getTotalDataBiayaRiil() {
      try {
        const dataLength = await BiayaRiilService.getCountData()

        this.dataDashboard[2].text = dataLength
      } catch (err) {
        this.listToasts.push({
          message:
            'Terjadi masalah. Jumlah data biaya riil tidak berhasil didapatkan.',
          color: 'danger',
        })
      }
    },
    async getDataDashboard() {
      this.isLoading = true
      try {
        await this.getTotalDataPemohon()
        await this.getTotalDataEstimasi()
        await this.getTotalDataBiayaRiil()
      } catch (err) {
        this.listToasts.push({
          message: 'Terjadi masalah. Data dashboard tidak berhasil didapatkan.',
          color: 'danger',
        })
      }
      this.isLoading = false
    },
  },
  async mounted() {
    await this.getDataDashboard()
  },
}
</script>
