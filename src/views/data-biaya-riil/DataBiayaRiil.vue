<template>
  <CRow>
    <CCol col="12">
      <card-list-data
        title="Data Biaya Riil"
        :items="items"
        :fields="fields"
        routeEndpoint="data-biaya-riil"
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
import { BiayaRiilService } from '../../services/biayaRiil.service'
import { fields } from './fields'

export default {
  name: 'DataBiayaRiil',
  components: { CardListData, ToastMsg },
  data() {
    return {
      items: [],
      fields,
      listToasts: [],
      keyForDelete: '',
      showModalDelete: false,
      isDeleting: false,
      isLoading: false,
    }
  },
  methods: {
    async getData() {
      this.isLoading = true
      try {
        const response = await BiayaRiilService.getAll()

        this.items = response.map(item => {
          return {
            key: item.Key,
            ...item.Record,
          }
        })
      } catch (err) {
        const toast = {
          message:
            'Terjadi masalah. Data biaya riil tidak berhasil didapatkan.',
          color: 'danger',
        }
        this.listToasts.push(toast)
      }
      this.isLoading = false
    },
    confirmDelete(key) {
      this.keyForDelete = key
      this.showModalDelete = true
    },
    async deleteData() {
      this.isDeleting = true
      try {
        const response = await BiayaRiilService.delete(this.keyForDelete)

        const toast = {
          message: response.message,
          color: 'success',
        }

        this.listToasts.push(toast)

        await this.getData()
      } catch (err) {
        const toast = {
          message:
            'Terjadi masalah. Data biaya riil tidak berhasil didapatkan.',
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
