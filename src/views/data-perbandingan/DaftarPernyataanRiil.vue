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
          <span>Nama Pemohon <span class="tab"></span>: Armando</span> <br />
          <span>Tanggal <span class="tab t-2"></span>: 12/04/2021</span> <br />
          <span>Dari Lembaga <span class="tab t-3"></span>: FMIPA</span>
          <hr />
          <CRow>
            <CCol
              sm="12"
              md="4"
              lg="4"
              class="d-flex align-items-center mb-2 mb-lg-0"
            >
              <span class="mr-2">Pilih Bendahara: </span>
              <CSelect
                placeholder="Pilih"
                size="sm"
                :options="options"
                class="flex-grow-1 mb-0"
              ></CSelect>
            </CCol>
            <CCol
              sm="12"
              md="4"
              lg="4"
              class="d-flex align-items-center mb-2 mb-lg-0"
            >
              <span class="mr-2">Pilih Yang Menerima: </span>
              <CSelect
                placeholder="Pilih"
                size="sm"
                :options="options"
                class="flex-grow-1 mb-0"
              ></CSelect>
            </CCol>
            <CCol
              sm="12"
              md="4"
              lg="4"
              class="d-flex align-items-center mb-2 mb-lg-0"
            >
              <span class="mr-2">Pilih Pembuat Komitmen: </span>
              <CSelect
                placeholder="Pilih"
                size="sm"
                :options="options"
                class="flex-grow-1 mb-0"
              ></CSelect>
            </CCol>
          </CRow>
          <CRow class="mt-3">
            <CCol
              sm="12"
              md="4"
              lg="4"
              class="d-flex align-items-center mb-2 mb-lg-0"
            >
              <span class="mr-2">Pilih Tanggal PMK: </span>
              <CSelect
                placeholder="Pilih"
                size="sm"
                :options="options"
                class="flex-grow-1 mb-0"
              ></CSelect>
            </CCol>
            <CCol
              sm="12"
              md="4"
              lg="4"
              class="d-flex align-items-center mb-2 mb-lg-0"
            >
              <span class="mr-2">Pilih Nomor PMK: </span>
              <CSelect
                placeholder="Pilih"
                size="sm"
                :options="options"
                class="flex-grow-1 mb-0"
              ></CSelect>
            </CCol>
          </CRow>
          <card-list-data
            title="Biaya Riil"
            class="mt-4"
            :items="itemsBiayaRiil"
            :fields="fields"
            :showEdit="false"
            routeEndpoint="data-perbandingan"
            txtTambah="Tambah"
            :showBtnCetak="true"
            :pagination="false"
          >
            <template #under-table>
              <tr class="d-flex">
                <td class="ml-auto mr-3">
                  <span class="h5">Total Riil</span>
                </td>
                <td>
                  <span class="h5 mr-lg-5 pr-lg-4 mr-sm-1 pr-sm-1"
                    ><strong>Rp5.942.432</strong></span
                  >
                </td>
              </tr>
            </template>
          </card-list-data>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import CardListData from "../../components/CardListData.vue";
import { itemsBiayaRiil } from "../../sample-data/data";

const fields = [
  { key: "no", label: "No.", _style: "width:10px" },
  "kategori-pmk",
  "jenis-pmk",
  "asal",
  "tujuan",
  "banyak",
  "total",
  { key: "proses", _style: "width:50px" },
];

export default {
  name: "DaftarPernyataanRiil",
  components: { CardListData },
  data() {
    return {
      options: [
        { label: "wlkw; w;lkw;l", value: "balbalab" },
        { label: "balblabal", value: "balbalab" },
        { label: "balblabal", value: "balbalab" },
        { label: "balblabal", value: "balbalab" },
      ],
      itemsBiayaRiil,
      fields,
    };
  },
};
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
