<template>
  <CCard>
    <CCardHeader class="d-flex">
      <span class="h4 mr-auto my-auto">{{ title }}</span>
      <div v-if="showBtnCetak" class="mr-2">
        <CButton color="secondary" class="d-md-down-none" :to="urlCetakData()"
          >Cetak</CButton
        >
      </div>
      <div v-if="showBtnTambah">
        <CButton
          color="primary"
          class="d-md-down-none"
          :to="urlTambahData"
          v-text="txtTambah"
        ></CButton>
        <CButton color="primary" class="d-lg-none" :to="urlTambahData">
          <CIcon name="cil-plus" />
        </CButton>
      </div>
    </CCardHeader>
    <CCardBody>
      <CDataTable
        :items="items"
        :fields="fields"
        table-filter
        items-per-page-select
        :items-per-page="5"
        hover
        sorter
        :pagination="pagination"
        border
        :loading="isLoading"
      >
        <template #no="{index}">
          <td>
            {{ index + 1 }}
          </td>
        </template>
        <template #proses="{index}" v-if="showProses">
          <td>
            <CButtonGroup>
              <CButton
                color="success"
                :to="editByID(index)"
                v-if="showEdit"
                size="sm"
                >Edit</CButton
              >
              <CButton color="danger" :to="deleteByID(index)" size="sm"
                >Hapus</CButton
              >
            </CButtonGroup>
          </td>
        </template>
        <template #daftar-pernyataan-riil="{index}">
          <td class="text-center">
            <CButton color="secondary" size="sm" :to="detailRiil(index)"
              >Detail</CButton
            >
          </td>
        </template>
        <template #perbandingan-biaya="{index}">
          <td class="text-center">
            <CButton color="secondary" size="sm" :to="detailPerbandingan(index)"
              >Detail</CButton
            >
          </td>
        </template>
        <template #under-table>
          <slot name="under-table"></slot>
        </template>
        <template #pilih="{item}">
          <td>
            <slot name="pilih" :item="item"></slot>
          </td>
        </template>
      </CDataTable>
    </CCardBody>
  </CCard>
</template>

<script>
export default {
  name: 'CardListData',
  props: {
    title: {
      type: String,
      required: true,
    },
    showBtnTambah: {
      type: Boolean,
      default: true,
    },
    txtTambah: {
      type: String,
      default: 'Tambah Data',
    },
    routeEndpoint: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      required: true,
    },
    fields: {
      type: Array,
      required: true,
    },
    showProses: {
      type: Boolean,
      default: true,
    },
    showEdit: {
      type: Boolean,
      default: true,
    },
    showBtnCetak: {
      type: Boolean,
      default: false,
    },
    pagination: {
      type: Boolean,
      default: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    urlTambahData: function() {
      return `/${this.routeEndpoint}/tambah`
    },
  },
  methods: {
    editByID(id) {
      return `${this.routeEndpoint}/edit?id=${id}`
    },
    deleteByID(id) {
      return `/${this.routeEndpoint}/hapus?id=${id}`
    },
    detailRiil(id) {
      return `/${this.routeEndpoint}/daftar-pernyataan-riil?id=${id}`
    },
    detailPerbandingan(id) {
      return `/${this.routeEndpoint}/detail-perbandingan-biaya?id=${id}`
    },
    urlCetakData() {
      return `/${this.routeEndpoint}/cetak-biaya-riil`
    },
  },
}
</script>

<style></style>
