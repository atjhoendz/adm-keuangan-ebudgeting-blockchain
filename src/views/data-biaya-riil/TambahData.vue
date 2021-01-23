<template>
  <card-form title="Form Input Data Biaya Riil">
    <CRow>
      <CCol col="12">
        <CSelect
          label="Kategori PMK"
          placeholder="Pilih kategori PMK"
        ></CSelect>
      </CCol>
      <CCol col="12">
        <CSelect label="Jenis PMK" placeholder="Pilih jenis PMK"></CSelect>
      </CCol>
      <CCol col="12">
        <CSelect label="Asal" placeholder="Pilih asal" readonly></CSelect>
      </CCol>
      <CCol col="12">
        <CSelect label="Tujuan" placeholder="Pilih tujuan" readonly></CSelect>
      </CCol>
      <CCol col="12">
        <CInput label="Banyak" placeholder="Masukkan banyak"></CInput>
      </CCol>
      <CCol col="12">
        <CInput label="Keterangan" placeholder="Masukkan keterangan"></CInput>
      </CCol>
      <CCol col="12">
        <CInput
          label="Biaya Satuan"
          placeholder="Masukkan biaya satuan"
        ></CInput>
      </CCol>
      <CCol col="12">
        <CInput label="Total" placeholder="Masukkan total" readonly></CInput>
      </CCol>
    </CRow>
    <CButton color="primary"> Simpan </CButton>
  </card-form>
</template>

<script>
import CardForm from "../../components/CardForm.vue";
export default {
  name: "TambahDataPemohon",
  components: { CardForm },
};
</script>

<style></style>
