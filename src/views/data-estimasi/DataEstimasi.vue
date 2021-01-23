<template>
  <CRow>
    <CCol col="12">
      <card-list-data
        title="Data Estimasi"
        :items="itemsEstimasi"
        :fields="fields"
        routeEndpoint="data-estimasi"
        :showEdit="false"
      >
      </card-list-data>
    </CCol>
  </CRow>
</template>

<script>
import CardListData from "../../components/CardListData.vue";
import { itemsEstimasi } from "../../sample-data/data";

const fields = [
  { key: "no", label: "No.", _style: "width:10px" },
  "tanggal-berangkat",
  "nama-pemohon",
  "dari-lembaga",
  { key: "jenis-pmk", label: "Jenis PMK" },
  "asal",
  "tujuan",
  "banyak",
  "biaya-satuan",
  "total",
  { key: "proses", _style: "width:50px" },
];

export default {
  name: "DataEstimasi",
  components: { CardListData },
  data() {
    return {
      itemsEstimasi,
      fields,
    };
  },
};
</script>

<style></style>
