<template>
  <CRow>
    <CCol col="12">
      <CCard>
        <CCardBody>
          <div class="d-flex">
            <h4>Detail Perbandingan Biaya</h4>
            <CButton
              color="success"
              class="ml-auto d-md-down-none"
              to="/data-perbandingan"
              >Kembali</CButton
            >
            <CButton
              color="success"
              class="ml-auto d-lg-none"
              size="sm"
              to="/data-perbandingan"
              >Kembali</CButton
            >
          </div>
          <hr />
          <div v-if="!!dataPemohon">
            <div class="mb-1">
              Nama Pemohon <span class="tab"></span>:
              {{ dataPemohon.nama }}
            </div>
            <div class="mb-1">
              Tanggal <span class="tab t-2"></span>:
              {{ itemsEstimasi[0].tanggal_berangkat }}
            </div>
            <div class="mb-1">
              Dari Lembaga <span class="tab t-3"></span>:
              {{ itemsEstimasi[0].nama_lembaga }}
            </div>
          </div>
          <hr />
          <CRow>
            <CCol sm="12" md="4" lg="4">
              <CRow :gutters="false" align-vertical="center">
                <CCol md="3">
                  <span>Bendahara:</span>
                </CCol>
                <CCol md="9" class="mb-2 mb-md-0">
                  <CInput
                    size="sm"
                    placeholder="Masukkan bendahara"
                    class="mb-0 mt-1 mt-md-0"
                  ></CInput>
                </CCol>
              </CRow>
            </CCol>
            <CCol sm="12" md="4" lg="4">
              <CRow :gutters="false" align-vertical="center">
                <CCol md="3">
                  <span>Yang menerima:</span>
                </CCol>
                <CCol md="9" class="mb-2 mb-md-0">
                  <CInput
                    size="sm"
                    placeholder="Masukkan yang menerima"
                    class="mb-0 mt-1 mt-md-0"
                  ></CInput>
                </CCol>
              </CRow>
            </CCol>
            <CCol sm="12" md="4" lg="4">
              <CRow :gutters="false" align-vertical="center">
                <CCol md="4">
                  <span>Pembuat Komitmen:</span>
                </CCol>
                <CCol md="8" class="mb-2 mb-md-0">
                  <CInput
                    size="sm"
                    placeholder="Masukkan pembuat komitmen"
                    class="mb-0 mt-1 mt-md-0"
                  ></CInput>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
          <CRow class="mt-3">
            <CCol sm="12" md="4" lg="4">
              <CRow :gutters="false" align-vertical="center">
                <CCol md="3">
                  <span>Pilih tanggal PMK:</span>
                </CCol>
                <CCol md="9" class="mb-2 mb-md-0">
                  <CSelect
                    placeholder="Pilih"
                    size="sm"
                    :options="tanggalPMKOptions"
                    class="mb-0 mt-1 mt-md-0"
                  ></CSelect>
                </CCol>
              </CRow>
            </CCol>
            <CCol sm="12" md="4" lg="4">
              <CRow :gutters="false" align-vertical="center">
                <CCol md="3">
                  <span>Pilih nomor PMK:</span>
                </CCol>
                <CCol md="9" class="mb-2 mb-md-0">
                  <CSelect
                    placeholder="Pilih"
                    size="sm"
                    :options="nomorPMKOptions"
                    class="mb-0 mt-1 mt-md-0"
                  ></CSelect>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
          <card-list-data
            title="Biaya Estimasi"
            class="mt-4 text-center"
            :items="itemsEstimasi"
            :fields="fieldsPernyataanRiil"
            :showEdit="false"
            routeEndpoint="data-perbandingan"
            :showBtnCetak="true"
            :pagination="false"
            :showBtnTambah="false"
            :isLoading="isLoading"
          >
            <template #under-table>
              <tr class="d-flex">
                <td class="ml-auto mr-3">
                  <span class="h5">Total Estimasi</span>
                </td>
                <td>
                  <span class="h5 mr-lg-5 pr-lg-4 mr-sm-1 pr-sm-1"
                    ><strong>{{ getTotal('itemsEstimasi') }}</strong></span
                  >
                </td>
              </tr>
            </template>
            <template #btn-cetak>
              <CButton
                color="primary"
                class="d-md-down-none"
                @click="cetakData()"
                >Cetak</CButton
              >
            </template>
          </card-list-data>
          <card-list-data
            title="Biaya Riil"
            class="mt-4 text-center"
            :items="itemsRiil"
            :fields="fieldsPernyataanRiil"
            :showEdit="false"
            routeEndpoint="data-perbandingan"
            :showBtnCetak="true"
            :pagination="false"
            :showBtnTambah="false"
            :isLoading="isLoading"
          >
            <template #under-table>
              <tr class="d-flex">
                <td class="ml-auto mr-3">
                  <span class="h5">Total Riil</span>
                </td>
                <td>
                  <span class="h5 mr-lg-5 pr-lg-4 mr-sm-1 pr-sm-1"
                    ><strong>{{ getTotal('itemsRiil') }}</strong></span
                  >
                </td>
              </tr>
            </template>
            <template #btn-cetak>
              <CButton
                color="primary"
                class="d-md-down-none"
                @click="cetakData()"
                >Cetak</CButton
              >
            </template>
          </card-list-data>
          <CRow>
            <CCol col="12">
              <CCard color="warning" class="p-2">
                <div class="d-flex justify-content-center">
                  <span class="h5 mb-0"
                    >Selisih biaya yang dikembalikan:
                    <strong>{{ getSelisih }}</strong></span
                  >
                </div>
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
    <toast-msg :listToasts="listToasts" />
  </CRow>
</template>

<script>
import CardListData from '../../components/CardListData.vue'
import ToastMsg from '../../components/ToastMsg'
import { PerbandinganService } from '../../services/perbandingan.service'
import {
  fieldsPernyataanRiil,
  tanggalPMKOptions,
  nomorPMKOptions,
} from './fields'

export default {
  name: 'PerbandinganBiaya',
  components: { CardListData, ToastMsg },
  data() {
    return {
      itemsEstimasi: [],
      itemsRiil: [],
      dataPemohon: '',
      fieldsPernyataanRiil,
      tanggalPMKOptions,
      nomorPMKOptions,
      listToasts: [],
      totalEstimasiAsNumber: '',
      totalRiilAsNumber: '',
      isLoading: false,
    }
  },
  computed: {
    getSelisih() {
      if (!!this.totalEstimasiAsNumber && !!this.totalRiilAsNumber) {
        const selisih = this.totalEstimasiAsNumber - this.totalRiilAsNumber
        if (selisih < 0)
          return parseInt(0).toLocaleString('id', {
            style: 'currency',
            currency: 'IDR',
          })
        return parseInt(selisih).toLocaleString('id', {
          style: 'currency',
          currency: 'IDR',
        })
      }
      return parseInt(0).toLocaleString('id', {
        style: 'currency',
        currency: 'IDR',
      })
    },
  },
  methods: {
    async getDataPerbandingan() {
      this.isLoading = true
      try {
        const dataPerbandingan = await PerbandinganService.getDataPerbandingan(
          this.$route.params.key
        )
        this.itemsEstimasi = dataPerbandingan.dataEstimasi.map(item => {
          const totalAsNumber = item.Record.total
          item.Record.total = parseInt(item.Record.total).toLocaleString('id', {
            style: 'currency',
            currency: 'IDR',
          })
          return {
            key: item.Key,
            totalAsNumber: totalAsNumber,
            ...item.Record,
          }
        })
        this.itemsRiil = dataPerbandingan.dataBiayaRiil.map(item => {
          const totalAsNumber = item.Record.total
          item.Record.total = parseInt(item.Record.total).toLocaleString('id', {
            style: 'currency',
            currency: 'IDR',
          })
          return {
            key: item.Key,
            totalAsNumber: totalAsNumber,
            ...item.Record,
          }
        })
        this.dataPemohon = dataPerbandingan.dataPemohon
      } catch (err) {
        const message =
          err.response.status == 404
            ? 'Data perbandingan belum tersedia.'
            : 'Terjadi masalah. Data biaya riil tidak berhasil didapatkan.'
        this.listToasts.push({
          message: message,
          color: 'danger',
        })
      }
      this.isLoading = false
    },
    getTotal(type) {
      if (this[type].length) {
        let total = 0
        this[type].forEach(item => {
          total += parseInt(item.totalAsNumber)
        })

        if (type == 'itemsEstimasi') {
          this.totalEstimasiAsNumber = total
        } else {
          this.totalRiilAsNumber = total
        }

        return parseInt(total).toLocaleString('id', {
          style: 'currency',
          currency: 'IDR',
        })
      }
      return parseInt(0).toLocaleString('id', {
        style: 'currency',
        currency: 'IDR',
      })
    },
    cetakData() {
      alert('cetak')
    },
  },
  async mounted() {
    await this.getDataPerbandingan()
  },
}
</script>

<style scoped>
.tab {
  display: inline-block;
  margin-left: 40px;
}
.tab.t-2 {
  margin-left: 92px;
}
.tab.t-3 {
  margin-left: 53px;
}
.headerCard {
  display: flex;
}
</style>
