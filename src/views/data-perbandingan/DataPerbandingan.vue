<template>
  <CRow>
    <CCol col="12">
      <card-list-data
        title="Data Pemohon yang Melakukan Perjalanan Dinas"
        :items="itemsPerbandingan"
        :fields="fields"
        routeEndpoint="data-perbandingan"
        :showBtnTambah="false"
      ></card-list-data>
    </CCol>
  </CRow>
</template>

<script>
import CardListData from "../../components/CardListData.vue";
import { itemsPerbandingan } from "../../sample-data/data";

const fields = [
  { key: "no", label: "No.", _style: "width:10px" },
  "tanggal-berangkat",
  "nama-pemohon",
  "dari-lembaga",
  "maksud-perjalanan-dinas",
  { key: "status", label: "Status Pemohon" },
  "daftar-pernyataan-riil",
  "perbandingan-biaya",
];

export default {
  components: { CardListData },
  name: "DataPerbandingan",
  data() {
    return {
      itemsPerbandingan,
      fields,
    };
  },
};
</script>

<style></style>
