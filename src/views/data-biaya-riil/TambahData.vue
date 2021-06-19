<template>
  <div>
    <card-form title="Form Input Data Biaya Riil">
      <CRow>
        <CCol col="12" class="text-center" v-if="isGettingData">
          <CSpinner color="info" />
          <div class="mt-2">Mendapatkan data...</div>
        </CCol>
        <CCol col="12" v-else>
          <CButton
            :color="colorShowModalEstimasi"
            class="mb-3"
            @click="modalEstimasi = true"
          >
            {{ txtShowModalEstimasi }}
          </CButton>
        </CCol>
      </CRow>
      <CRow v-if="selectedEstimasiData">
        <CCol col="12">
          <CInput
            label="Kategori PMK"
            placeholder="Masukkan kategori PMK"
            v-model.trim="$v.formData.kategori_pmk.$model"
            :is-valid="validate('kategori_pmk')"
            invalid-feedback="Kategori PMK harus diisi."
            :readonly="readOnlyEstimasi('kategori_pmk')"
            @keyup.enter="enableEditField('kategori_pmk')"
          >
            <template #append-content>
              <div
                @click="enableEditField('kategori_pmk')"
                class="cursorPointer"
              >
                {{ txtEnableEditField('kategori_pmk') }}
              </div>
            </template>
          </CInput>
        </CCol>
        <CCol col="12">
          <CInput
            label="Jenis PMK"
            placeholder="Masukkan jenis PMK"
            v-model.trim="$v.formData.jenis_pmk.$model"
            :is-valid="validate('jenis_pmk')"
            invalid-feedback="Jenis PMK harus diisi."
            :readonly="readOnlyEstimasi('jenis_pmk')"
            @keyup.enter="enableEditField('jenis_pmk')"
          >
            <template #append-content>
              <div @click="enableEditField('jenis_pmk')" class="cursorPointer">
                {{ txtEnableEditField('jenis_pmk') }}
              </div>
            </template>
          </CInput>
        </CCol>
        <CCol col="12">
          <CInput
            label="Nama Pemohon"
            placeholder="Masukkan nama pemohon"
            v-model="nama_pemohon"
            :readonly="readOnlyEstimasi('nama_pemohon')"
          >
          </CInput>
        </CCol>
        <CCol col="12">
          <CInput
            label="Asal Keberangkatan"
            placeholder="Masukkan asal keberangkatan"
            v-model.trim="$v.formData.asal.$model"
            :is-valid="validate('asal')"
            invalid-feedback="Asal keberangkatan harus diisi."
            :readonly="readOnlyEstimasi('asal')"
            @keyup.enter="enableEditField('asal')"
          >
            <template #append-content>
              <div @click="enableEditField('asal')" class="cursorPointer">
                {{ txtEnableEditField('asal') }}
              </div>
            </template>
          </CInput>
        </CCol>
        <CCol col="12">
          <CInput
            label="Tujuan Perjalanan"
            placeholder="Masukkan tujuan perjalanan"
            v-model.trim="$v.formData.tujuan.$model"
            :is-valid="validate('tujuan')"
            invalid-feedback="Tujuan perjalanan harus diisi."
            :readonly="readOnlyEstimasi('tujuan')"
            @keyup.enter="enableEditField('tujuan')"
          >
            <template #append-content>
              <div @click="enableEditField('tujuan')" class="cursorPointer">
                {{ txtEnableEditField('tujuan') }}
              </div>
            </template>
          </CInput>
        </CCol>
        <CCol col="12">
          <CInput
            label="Tanggal Berangkat"
            v-model.trim="$v.formData.tanggal_berangkat.$model"
            :is-valid="validate('tanggal_berangkat')"
            invalid-feedback="Tanggal berangkat harus dipilih."
            :readonly="readOnlyEstimasi('tanggal_berangkat')"
          ></CInput>
        </CCol>
        <CCol col="12">
          <CInput
            label="Lembaga"
            placeholder="Masukkan nama lembaga"
            v-model.trim="$v.formData.nama_lembaga.$model"
            :is-valid="validate('nama_lembaga')"
            invalid-feedback="Nama lembaga harus diisi."
            :readonly="readOnlyEstimasi('nama_lembaga')"
          ></CInput>
        </CCol>
        <CCol col="12">
          <CInput
            label="Banyak"
            placeholder="Masukkan banyak"
            type="number"
            v-model.trim="$v.formData.banyak.$model"
            :is-valid="validate('banyak')"
            :invalid-feedback="banyakMsg"
            :readonly="readOnlyEstimasi('banyak')"
            @keyup.enter="enableEditField('banyak')"
          >
            <template #append-content>
              <div @click="enableEditField('banyak')" class="cursorPointer">
                {{ txtEnableEditField('banyak') }}
              </div>
            </template>
          </CInput>
        </CCol>
        <CCol col="12">
          <CInput
            label="Keterangan"
            placeholder="Masukkan keterangan"
            v-model="formData.keterangan"
            :readonly="readOnlyEstimasi('keterangan')"
            @keyup.enter="enableEditField('keterangan')"
          >
            <template #append-content>
              <div @click="enableEditField('keterangan')" class="cursorPointer">
                {{ txtEnableEditField('keterangan') }}
              </div>
            </template>
          </CInput>
        </CCol>
        <CCol col="12">
          <CInput
            label="Biaya Satuan"
            placeholder="Masukkan biaya satuan"
            :type="fieldTypeBiaya"
            v-model.trim="$v.formData.biaya.$model"
            :is-valid="validate('biaya')"
            invalid-feedback="Biaya satuan harus diisi."
            :readonly="readOnlyEstimasi('biaya')"
            @keyup.enter="enableEditField('biaya')"
          >
            <template #append-content>
              <div @click="enableEditField('biaya')" class="cursorPointer">
                {{ txtEnableEditField('biaya') }}
              </div>
            </template>
          </CInput>
        </CCol>
        <CCol col="12">
          <CInput
            label="Total"
            placeholder="Masukkan total"
            v-model.trim="$v.formData.total.$model"
            :is-valid="validate('total')"
            invalid-feedback="Total harus diisi."
            readonly
          ></CInput>
        </CCol>
        <CCol col="12">
          <CSelect
            label="Bukti Biaya Riil"
            placeholder="Pilihan"
            :options="buktiOptions"
            :value="formData.bukti"
            @update:value="setSelectValue('bukti', $event)"
            :is-valid="validate('bukti')"
            invalid-feedback="Bukti biaya riil harus dipilih."
            :readonly="readOnly"
          ></CSelect>
        </CCol>
      </CRow>
      <div v-if="selectedEstimasiData">
        <CSpinner color="info" v-if="isLoading" />
        <CButton color="primary" @click="addData" v-else>Simpan</CButton>
      </div>
    </card-form>
    <toast-msg :listToasts="listToasts" />
    <CModal
      title="Pilih Data Estimasi"
      color="info"
      :show.sync="modalEstimasi"
      size="xl"
      :centered="true"
      :close-on-backdrop="false"
    >
      <card-list-data
        title="Data Estimasi"
        :items="dataEstimasi"
        :fields="fieldsEstimasi"
        :showBtnTambah="false"
        :showProses="false"
      >
        <template #pilih="{item}">
          <CButton
            :color="colorEstimasiSelected(item.key)"
            :disabled="keySelectedEstimasi == item.key && isEstimasiSelected"
            @click="pilihEstimasi(item.key)"
            size="sm"
            >{{ txtEstimasiSelect(item.key) }}</CButton
          >
        </template>
      </card-list-data>
      <template #footer>
        <CButton color="secondary" @click="modalEstimasi = false"
          >Cancel</CButton
        >
        <CButton
          color="info"
          @click="onModalEstimasiClicked"
          :disabled="!keySelectedEstimasi"
          >OK</CButton
        >
      </template>
    </CModal>
  </div>
</template>

<script>
/* eslint-disable no-useless-catch */
import CardForm from '../../components/CardForm.vue'
import ToastMsg from '../../components/ToastMsg'
import CardListData from '../../components/CardListData'
import { BiayaRiilService } from '../../services/biayaRiil.service'
import { EstimasiService } from '../../services/estimasi.service'
import { biayaRiilValidation } from '../../validations/validationRules'
import { ValidationMessage } from '../../validations/message'
import { fieldsEstimasi, buktiOptions } from './fields'

export default {
  name: 'TambahDataPemohon',
  components: { CardForm, ToastMsg, CardListData },
  data() {
    return {
      formData: {
        docType: 'biaya-riil',
        tanggal_berangkat: '',
        biaya: '',
        banyak: '',
        keterangan: '',
        kategori_pmk: '',
        jenis_pmk: '',
        total: '',
        bukti: '',
        asal: '',
        tujuan: '',
        nama_lembaga: '',
        data_pemohon: '',
      },
      nama_pemohon: '',
      isGettingData: false,
      isLoading: false,
      listToasts: [],
      modalEstimasi: false,
      selectedEstimasiData: '',
      isEstimasiSelected: false,
      dataEstimasi: [],
      fieldsEstimasi,
      keySelectedEstimasi: '',
      readOnlyFieldEstimasi: [
        'kategori_pmk',
        'jenis_pmk',
        'asal',
        'tujuan',
        'biaya',
        'nama_pemohon',
        'tanggal_berangkat',
        'nama_lembaga',
        'banyak',
        'keterangan',
      ],
      readOnly: true,
      fieldTypeBiaya: 'text',
      biayaAsNumber: '',
      totalAsNumber: '',
      buktiOptions,
    }
  },
  computed: {
    txtShowModalEstimasi() {
      if (this.selectedEstimasiData) return 'Data Estimasi telah dipilih'
      return 'Pilih Data Estimasi'
    },
    colorShowModalEstimasi() {
      if (this.selectedEstimasiData) return 'secondary'
      return 'info'
    },
    banyakMsg() {
      if (!this.$v.formData.banyak.required)
        return ValidationMessage.required('Banyak')
      if (!this.$v.formData.banyak.minLength)
        return ValidationMessage.lengthNumeric('Banyak', 0)
      return null
    },
  },
  watch: {
    'formData.banyak': function(newVal) {
      if (newVal < 0) this.formData.banyak = 0
      this.countTotal()
    },
  },
  validations: biayaRiilValidation,
  methods: {
    validate(type) {
      if (this.$v.formData[type].$error) {
        return !this.$v.formData[type].$invalid
      }
      return null
    },
    setSelectValue(type, value) {
      this.formData[type] = value
      this.$v.formData[type].$touch()
    },
    readOnlyEstimasi(type) {
      return this.readOnlyFieldEstimasi.includes(type)
    },
    colorEstimasiSelected(index) {
      if (this.keySelectedEstimasi == index && this.isEstimasiSelected)
        return 'secondary'
      return 'info'
    },
    txtEstimasiSelect(index) {
      if (this.keySelectedEstimasi == index && this.isEstimasiSelected)
        return 'dipilih'
      return 'pilih'
    },
    pilihEstimasi(index) {
      this.keySelectedEstimasi = index
      this.isEstimasiSelected = true
    },
    async getEstimasiData() {
      try {
        const data = await EstimasiService.getAll()

        this.dataEstimasi = data.map(item => {
          const biayaAsNumber = item.Record.biaya
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
            biayaAsNumber: biayaAsNumber,
            nama_pemohon: item.Record.data_pemohon.nama,
            status: item.Record.data_pemohon.status_berkas,
            ...item.Record,
          }
        })
      } catch (err) {
        throw err
      }
    },
    async getDataOptions() {
      try {
        await this.getEstimasiData()

        this.readOnly = false
      } catch (err) {
        const toast = {
          mesage: 'Terjadi masalah. Data penunjang tidak berhasil didapatkan.',
          color: 'danger',
        }
        this.listToasts.push(toast)
      }
    },
    async addData() {
      this.$v.formData.$touch()

      if (this.$v.formData.$invalid) return

      this.isLoading = true
      try {
        let newFormData = {}
        newFormData = Object.assign(newFormData, this.formData)

        newFormData.biaya =
          this.biayaAsNumber ||
          this.selectedEstimasiData.biayaAsNumber.toString()
        newFormData.total = this.totalAsNumber.toString()

        const response = await BiayaRiilService.addData(newFormData)

        const toast = {
          message: response.message,
          color: 'success',
        }

        this.$store.commit('toast/ADD_TOAST', toast)

        return this.$router.push('/data-biaya-riil')
      } catch (err) {
        const responseData = err.response.data
        if (responseData?.type == 'info') {
          this.isLoading = false

          return this.listToasts.push({
            message: responseData.msg,
            color: 'warning',
          })
        }

        this.listToasts.push({
          message:
            'Terjadi masalah. Data biaya riil tidak berhasil ditambahkan.',
          color: 'danger',
        })
      }
      this.isLoading = false
    },
    onModalEstimasiClicked() {
      if (!this.keySelectedEstimasi) return

      this.selectedEstimasiData = this.dataEstimasi.filter(item => {
        return item.key == this.keySelectedEstimasi
      })[0]

      this.formData.tanggal_berangkat = this.selectedEstimasiData.tanggal_berangkat
      this.formData.biaya = this.selectedEstimasiData.biaya
      this.formData.banyak = this.selectedEstimasiData.banyak
      this.formData.keterangan = this.selectedEstimasiData.keterangan
      this.formData.kategori_pmk = this.selectedEstimasiData.kategori_pmk
      this.formData.jenis_pmk = this.selectedEstimasiData.jenis_pmk
      this.formData.asal = this.selectedEstimasiData.asal
      this.formData.tujuan = this.selectedEstimasiData.tujuan
      this.formData.nama_lembaga = this.selectedEstimasiData.nama_lembaga
      this.formData.data_pemohon = this.selectedEstimasiData.data_pemohon
      this.nama_pemohon = this.selectedEstimasiData.nama_pemohon

      this.modalEstimasi = false

      this.countTotal()
    },
    txtEnableEditField(type) {
      return this.readOnlyFieldEstimasi.includes(type) ? 'Edit' : 'Simpan'
    },
    enableEditField(type) {
      const findROField = this.readOnlyFieldEstimasi.find(item => {
        return item == type
      })

      if (!findROField) {
        if (type == 'biaya') {
          this.fieldTypeBiaya = 'text'
          this.biayaAsNumber = this.formData.biaya

          if (this.formData.biaya == this.selectedEstimasiData.biaya) {
            this.formData.biaya = this.selectedEstimasiData.biaya
          } else {
            this.formData.biaya = parseInt(this.formData.biaya).toLocaleString(
              'id',
              {
                style: 'currency',
                currency: 'IDR',
              }
            )
          }
          this.countTotal()
        }
        return this.readOnlyFieldEstimasi.push(type)
      }

      const newRO = this.readOnlyFieldEstimasi.filter(item => {
        return item != type
      })

      if (type == 'biaya') {
        this.fieldTypeBiaya = 'number'
        this.formData.biaya =
          this.biayaAsNumber || this.selectedEstimasiData.biayaAsNumber
      }

      this.readOnlyFieldEstimasi = newRO
    },
    countTotal() {
      const biayaSatuan =
        this.biayaAsNumber || this.selectedEstimasiData.biayaAsNumber
      this.totalAsNumber = this.formData.banyak * parseInt(biayaSatuan)
      this.formData.total = parseInt(this.totalAsNumber).toLocaleString('id', {
        style: 'currency',
        currency: 'IDR',
      })
    },
  },
  async mounted() {
    await this.getDataOptions()
  },
}
</script>

<style scoped>
.cursorPointer:hover {
  cursor: pointer;
}
</style>
<style>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
