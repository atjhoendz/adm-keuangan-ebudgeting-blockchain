<template>
  <CRow>
    <CCol col="12">
      <card-list-data
        title="Data Estimasi"
        :items="items"
        :fields="fieldsEstimasi"
        routeEndpoint="data-estimasi"
        :showEdit="false"
        :isLoading="isLoading"
      >
        <template #proses="{item}">
          <CButton color="danger" size="sm" @click="confirmDelete(item.key)"
            >Hapus</CButton
          >
        </template>
      </card-list-data>
    </CCol>
    <CModal title="Hapus" color="warning" :show.sync="showModalDelete" centered>
      Apakah anda yakin untuk menghapus data ini?
      <template #footer>
        <CButton @click="showModalDelete = false" color="secondary"
          >Batal</CButton
        >
        <CSpinner color="info" v-if="isDeleting" />
        <CButton @click="deleteData()" color="danger" v-if="!isDeleting"
          >Hapus</CButton
        >
      </template>
    </CModal>
    <toast-msg :listToasts="listToasts" />
  </CRow>
</template>

<script>
import CardListData from '../../components/CardListData.vue'
import ToastMsg from '../../components/ToastMsg'
import { EstimasiService } from '../../services/estimasi.service'
import { fieldsEstimasi } from './fields'

export default {
  name: 'DataEstimasi',
  components: { CardListData, ToastMsg },
  data() {
    return {
      fieldsEstimasi,
      items: [],
      listToasts: [],
      isLoading: false,
      showModalDelete: false,
      isDeleting: false,
      keyForDelete: '',
    }
  },
  methods: {
    async getData() {
      this.isLoading = true
      try {
        const data = await EstimasiService.getAll()

        this.items = data.map(item => {
          item.Record.biaya = parseInt(item.Record.biaya).toLocaleString('id', {
            style: 'currency',
            currency: 'IDR',
          })
          item.Record.total = parseInt(item.Record.total).toLocaleString('id', {
            style: 'currency',
            currency: 'IDR',
          })
          return {
            key: item.Key,
            nama_pemohon: item.Record.data_pemohon.nama,
            status: item.Record.data_pemohon.status_berkas,
            ...item.Record,
          }
        })
      } catch (err) {
        const toast = {
          message: 'Terjadi masalah. Data tidak berhasil didapatkan.',
          color: 'danger',
        }
        this.listToasts.push(toast)
      }
      this.isLoading = false
    },
    confirmDelete(key) {
      this.showModalDelete = true
      this.keyForDelete = key
    },
    async deleteData() {
      this.isDeleting = true
      try {
        const response = await EstimasiService.delete(this.keyForDelete)

        const toast = {
          message: response.message,
          color: 'success',
        }

        this.listToasts.push(toast)

        await this.getData()
      } catch (err) {
        const toast = {
          message: 'Terjadi masalah. Data estimasi tidak berhasil dihapus.',
          color: 'danger',
        }
        this.listToasts.push(toast)
      }
      this.showModalDelete = false
      this.isDeleting = false
    },
  },
  async mounted() {
    await this.getData()
    if (this.$store.state.toast.listToasts.length) {
      this.listToasts = this.$store.state.toast.listToasts
      this.$store.commit('toast/RESET')
    }
  },
}
</script>

<style></style>
