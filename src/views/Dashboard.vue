<template>
  <CRow>
    <CCol sm="12" lg="8">
      <CWidgetSimple
        header="Message"
        text="Selamat Datang di Halaman Admin Keuangan"
      >
      </CWidgetSimple>
    </CCol>
    <CCol sm="12" lg="4">
      <CWidgetSimple header="Data Pemohon" :text="jumlahDataPemohon">
      </CWidgetSimple>
    </CCol>
    <CCol sm="12" lg="4">
      <CWidgetSimple header="Data Estimasi" :text="jumlahDataPemohon">
      </CWidgetSimple>
    </CCol>
    <CCol sm="12" lg="4">
      <CWidgetSimple header="Data Biaya Riil" :text="jumlahDataPemohon">
      </CWidgetSimple>
    </CCol>
    <CCol sm="12" lg="4">
      <CWidgetSimple header="Data Perbandingan" :text="jumlahDataPemohon">
      </CWidgetSimple>
    </CCol>
  </CRow>
</template>

<script>
import { itemsPemohon } from "../sample-data/data";
export default {
  name: "Dashboard",
  computed: {
    jumlahDataPemohon() {
      return `${itemsPemohon.length}`;
    },
  },
};
</script>
