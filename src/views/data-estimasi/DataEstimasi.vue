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
      </card-list-data>
    </CCol>
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
    }
  },
  methods: {
    async getData() {
      this.isLoading = true
      try {
        const data = await EstimasiService.getAll()

        this.items = data.map(item => {
          return {
            key: item.Key,
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
