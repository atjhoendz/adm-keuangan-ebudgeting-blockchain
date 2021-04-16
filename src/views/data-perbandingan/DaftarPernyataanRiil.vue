<template>
  <CRow>
    <CCol col="12">
      <CCard>
        <CCardBody>
          <div class="d-flex">
            <h4>Daftar Pernyataan Riil</h4>
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
          <div v-if="items.length">
            <div class="mb-1">
              Nama Pemohon <span class="tab"></span>:
              {{ items[0].data_pemohon.nama }}
            </div>
            <div class="mb-1">
              Tanggal <span class="tab t-2"></span>:
              {{ items[0].tanggal_berangkat }}
            </div>
            <div class="mb-1">
              Dari Lembaga <span class="tab t-3"></span>:
              {{ items[0].nama_lembaga }}
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
            title="Biaya Riil"
            class="mt-4 text-center"
            :items="items"
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
                    ><strong>{{ getTotalRiil }}</strong></span
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
  nomorPMKOptions,
  tanggalPMKOptions,
} from './fields'

export default {
  name: 'DaftarPernyataanRiil',
  components: { CardListData, ToastMsg },
  data() {
    return {
      items: [],
      fieldsPernyataanRiil,
      listToasts: [],
      nomorPMKOptions,
      tanggalPMKOptions,
      isLoading: false,
    }
  },
  computed: {
    getTotalRiil() {
      if (this.items.length) {
        let temp = 0
        this.items.forEach(item => {
          temp += parseInt(item.totalAsNumber)
        })
        return parseInt(temp).toLocaleString('id', {
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
    async getDataBiayaRiil() {
      this.isLoading = true
      try {
        const dataBiayaRiil = await PerbandinganService.getBiayaRiilByNamaPemohon(
          this.$route.params.key
        )
        this.items = dataBiayaRiil.map(item => {
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
      } catch (err) {
        const message =
          err.response.status == 404
            ? 'Data biaya riil belum tersedia.'
            : 'Terjadi masalah. Data biaya riil tidak berhasil didapatkan.'
        this.listToasts.push({
          message: message,
          color: 'danger',
        })
      }
      this.isLoading = false
    },
    cetakData() {
      alert('cetak')
    },
  },
  async mounted() {
    await this.getDataBiayaRiil()
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
