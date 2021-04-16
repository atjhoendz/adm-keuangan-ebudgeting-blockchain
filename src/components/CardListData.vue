<template>
  <CCard>
    <CCardHeader class="d-flex">
      <span class="h4 mr-auto my-auto">{{ title }}</span>
      <div v-if="showBtnCetak" :class="{ 'mr-2': showBtnTambah }">
        <slot name="btn-cetak"></slot>
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
        <template #proses="{item}">
          <td>
            <slot name="proses" :item="item" />
          </td>
        </template>
        <template #daftar-pernyataan-riil="{item}">
          <td class="text-center">
            <slot name="daftar-pernyataan-riil" :item="item"></slot>
          </td>
        </template>
        <template #perbandingan-biaya="{item}">
          <td class="text-center">
            <slot name="perbandingan-biaya" :item="item"></slot>
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
}
</script>

<style></style>
