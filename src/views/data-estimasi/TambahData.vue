<template>
  <div>
    <card-form title="Form Input Data Estimasi">
      <CRow>
        <CCol col="12" class="text-center" v-if="isGettingData">
          <CSpinner color="info" />
          <div class="mt-2">Mendapatkan data...</div>
        </CCol>
        <CCol col="12" v-else>
          <CButton
            :color="colorShowModalPMK"
            class="mb-3"
            @click="modalPMK = true"
            >{{ txtShowModalPMK }}</CButton
          >
        </CCol>
      </CRow>
      <CRow v-if="selectedPMKData">
        <CCol col="12">
          <CInput
            label="Kategori PMK"
            placeholder="Masukkan kategori PMK"
            v-model.trim="$v.formData.kategori_pmk.$model"
            :is-valid="validate('kategori_pmk')"
            invalid-feedback="Kategori PMK harus diisi."
            :readonly="readOnlyPMK('kategori_pmk')"
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
            :readonly="readOnlyPMK('jenis_pmk')"
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
            v-model.trim="$v.formData.nama_pemohon.$model"
            :is-valid="validate('nama_pemohon')"
            invalid-feedback="Nama pemohon harus diisi."
            :readonly="readOnly"
          >
            <template #append-content>
              <div @click="browsePemohon" class="cursorPointer">
                <span class="d-none d-md-inline d-xs-none"
                  >Pilihan Pemohon</span
                >
                <span class="d-xs-inline d-md-none">Pilihan</span>
              </div>
            </template>
          </CInput>
        </CCol>
        <CCol col="12">
          <CInput
            label="Asal Keberangkatan"
            placeholder="Masukkan asal keberangkatan"
            v-model.trim="$v.formData.asal.$model"
            :is-valid="validate('asal')"
            invalid-feedback="Asal keberangkatan harus diisi."
            :readonly="readOnlyPMK('asal')"
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
            :readonly="readOnlyPMK('tujuan')"
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
            type="date"
            v-model.trim="$v.formData.tanggal_berangkat.$model"
            :is-valid="validate('tanggal_berangkat')"
            invalid-feedback="Tanggal berangkat harus diisi."
            :readonly="readOnly"
          ></CInput>
        </CCol>
        <CCol col="12">
          <CSelect
            label="Lembaga"
            placeholder="Pilih lembaga"
            :options="lembagaOptions"
            :value="formData.nama_lembaga"
            @update:value="setSelectValue('nama_lembaga', $event)"
            :is-valid="validate('nama_lembaga')"
            invalid-feedback="Nama lembaga harus dipilih."
            :readonly="readOnly"
          ></CSelect>
        </CCol>
        <CCol col="12">
          <CInput
            label="Banyak"
            placeholder="Masukkan banyak"
            type="number"
            v-model.trim="$v.formData.banyak.$model"
            :is-valid="validate('banyak')"
            :invalid-feedback="banyakMsg"
            :readonly="readOnly"
          ></CInput>
        </CCol>
        <CCol col="12">
          <CInput
            label="Keterangan"
            placeholder="Masukkan keterangan"
            v-model="formData.keterangan"
            :readonly="readOnly"
          ></CInput>
        </CCol>
        <CCol col="12">
          <CInput
            label="Biaya Satuan"
            placeholder="Masukkan biaya satuan"
            :type="fieldTypeBiaya"
            v-model.trim="$v.formData.biaya.$model"
            :is-valid="validate('biaya')"
            invalid-feedback="Biaya satuan harus diisi."
            :readonly="readOnlyPMK('biaya')"
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
            @keyup.enter="addData"
          ></CInput>
        </CCol>
      </CRow>
      <div v-if="selectedPMKData">
        <CSpinner color="info" v-if="isLoading" />
        <CButton color="primary" @click="addData" v-else> Simpan </CButton>
      </div>
    </card-form>
    <toast-msg :listToasts="listToasts" />
    <CModal
      title="Pilih Data PMK"
      color="info"
      :show.sync="modalPMK"
      size="xl"
      :centered="true"
      :close-on-backdrop="false"
    >
      <card-list-data
        title="Data PMK"
        :items="dataPMK"
        :fields="fieldsPMK"
        :showBtnTambah="false"
        :showProses="false"
      >
        <template #pilih="{item}">
          <CButton
            :color="colorPMKSelected(item.key)"
            :disabled="keySelectedPMK == item.key && isPMKSelected"
            @click="pilihPMK(item.key)"
            size="sm"
            >{{ txtPMKSelect(item.key) }}</CButton
          >
        </template>
      </card-list-data>
      <template #footer>
        <CButton color="secondary" @click="modalPMK = false">Cancel</CButton>
        <CButton
          color="info"
          @click="onModalPMKOKClicked"
          :disabled="!keySelectedPMK"
          >OK</CButton
        >
      </template>
    </CModal>
    <CModal
      title="Pilih Nama Pemohon"
      color="info"
      :show.sync="modalPemohon"
      :centered="true"
      :close-on-backdrop="false"
    >
      <card-list-data
        title="Data Pemohon"
        :items="dataPemohon"
        :fields="fieldsPemohon"
        :showBtnTambah="false"
        :showBtnCetak="false"
      >
        <template #pilih="{item}">
          <CButton
            :color="colorPemohonSelected(item.key)"
            :disabled="keySelectedPemohon == item.key && isPemohonSelected"
            @click="pilihPemohon(item.key)"
            size="sm"
          >
            {{ txtPemohonSelect(item.key) }}
          </CButton>
        </template>
      </card-list-data>
      <template #footer>
        <CButton color="secondary" @click="modalPemohon = false"
          >Cancel</CButton
        >
        <CButton
          color="info"
          @click="onModalPemohonOKClicked"
          :disabled="!keySelectedPemohon"
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
import { EstimasiService } from '../../services/estimasi.service'
import { estimasiValidation } from '../../validations/validationRules'
import { PMKService } from '../../services/pmk.service'
import { PemohonService } from '../../services/pemohon.service'
import { LembagaService } from '../../services/lembaga.service'
import CardListData from '../../components/CardListData.vue'
import { fieldsPMK, fieldsPemohon } from './fields'
import { ValidationMessage } from '../../validations/message'

export default {
  name: 'TambahDataPemohon',
  components: { CardForm, ToastMsg, CardListData },
  data() {
    return {
      formData: {
        docType: 'estimasi',
        nama_pemohon: '',
        nama_lembaga: '',
        jenis_pmk: '',
        kategori_pmk: '',
        tanggal_berangkat: '',
        keterangan: '',
        asal: '',
        tujuan: '',
        biaya: '',
        banyak: 1,
        total: '',
        status: '',
      },
      totalAsNumber: '',
      dataPMK: [],
      isLoading: false,
      listToasts: [],
      readOnly: true,
      modalPMK: false,
      fieldsPMK,
      keySelectedPMK: '',
      selectedPMKData: '',
      isPMKSelected: false,
      readOnlyFieldPMK: [
        'kategori_pmk',
        'jenis_pmk',
        'asal',
        'tujuan',
        'biaya',
      ],
      fieldTypeBiaya: 'text',
      tempBiayaVal: '',
      isGettingData: true,
      dataPemohon: [],
      modalPemohon: false,
      fieldsPemohon,
      keySelectedPemohon: '',
      isPemohonSelected: false,
      lembagaOptions: [],
    }
  },
  computed: {
    txtShowModalPMK() {
      if (this.selectedPMKData) return 'Data PMK telah dipilih'
      return 'Pilih Data PMK'
    },
    colorShowModalPMK() {
      if (this.selectedPMKData) return 'secondary'
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
      if (newVal < 0) {
        this.formData.banyak = 0
      }
      this.countTotal()
    },
  },
  validations: estimasiValidation,
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
    async addData() {
      this.$v.formData.$touch()

      if (this.$v.formData.$invalid) return

      this.isLoading = true

      try {
        let newFormData = {}
        newFormData = Object.assign(newFormData, this.formData)
        newFormData.biaya =
          this.tempBiayaVal || this.selectedPMKData.biayaNumber.toString()
        newFormData.total = this.totalAsNumber.toString()
        newFormData.tanggal_berangkat = new Date(
          this.formData.tanggal_berangkat
        ).toLocaleDateString()
        newFormData.banyak = newFormData.banyak.toString()

        const response = await EstimasiService.addData(newFormData)

        const toast = {
          message: response.message,
          color: 'success',
        }
        this.$store.commit('toast/ADD_TOAST', toast)

        return this.$router.push({ path: '/data-estimasi' })
      } catch (err) {
        const toast = {
          message: 'Terjadi masalah. Data estimasi tidak berhasil ditambahkan.',
          color: 'danger',
        }
        this.listToasts.push(toast)
      }

      this.isLoading = false
    },
    async getPMKData() {
      try {
        const data = await PMKService.getAll()

        this.dataPMK = data.map(item => {
          const biayaNumber = item.Record.biaya
          item.Record.biaya = parseInt(item.Record.biaya).toLocaleString('id', {
            style: 'currency',
            currency: 'IDR',
          })
          return {
            key: item.Key,
            biayaNumber: biayaNumber,
            ...item.Record,
          }
        })
      } catch (err) {
        throw err
      }
    },
    async getPemohonData() {
      try {
        const data = await PemohonService.getAll()

        this.dataPemohon = data.map(item => {
          return {
            key: item.Key,
            ...item.Record,
          }
        })
      } catch (err) {
        throw err
      }
    },
    async getLembagaData() {
      try {
        const data = await LembagaService.getAll()

        this.lembagaOptions = data.map(item => {
          return {
            label: item.Record.nama,
            value: item.Record.nama,
          }
        })
      } catch (err) {
        throw err
      }
    },
    async getDataOptions() {
      try {
        await this.getPMKData()
        await this.getPemohonData()
        await this.getLembagaData()

        this.readOnly = false
      } catch (err) {
        const toast = {
          message: 'Terjadi masalah. Data penunjang tidak berhasil didapatkan',
          color: 'danger',
        }
        this.listToasts.push(toast)
      }
      this.isGettingData = false
    },
    pilihPMK(index) {
      this.keySelectedPMK = index
      this.isPMKSelected = true
    },
    txtPMKSelect(index) {
      if (this.keySelectedPMK == index && this.isPMKSelected) return 'dipilih'
      return 'pilih'
    },
    colorPMKSelected(index) {
      if (this.keySelectedPMK == index && this.isPMKSelected) return 'secondary'
      return 'info'
    },
    onModalPMKOKClicked() {
      if (!this.keySelectedPMK) return

      this.selectedPMKData = this.dataPMK.filter(item => {
        return item.key == this.keySelectedPMK
      })[0]

      this.formData.jenis_pmk = this.selectedPMKData.jenis_pmk
      this.formData.kategori_pmk = this.selectedPMKData.nama_kategori
      this.formData.asal = this.selectedPMKData.asal
      this.formData.tujuan = this.selectedPMKData.tujuan
      this.formData.biaya = this.selectedPMKData.biaya

      this.modalPMK = false

      this.countTotal()
    },
    enableEditField(type) {
      const findROField = this.readOnlyFieldPMK.find(item => {
        return item == type
      })

      if (!findROField) {
        if (type == 'biaya') {
          this.fieldTypeBiaya = 'text'
          this.tempBiayaVal = this.formData.biaya

          if (this.formData.biaya == this.selectedPMKData.biaya) {
            this.formData.biaya = this.selectedPMKData.biaya
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
        return this.readOnlyFieldPMK.push(type)
      }

      const newRO = this.readOnlyFieldPMK.filter(item => {
        return item != type
      })

      if (type == 'biaya') {
        this.fieldTypeBiaya = 'number'
        this.formData.biaya =
          this.tempBiayaVal || this.selectedPMKData.biayaNumber
      }

      this.readOnlyFieldPMK = newRO
    },
    readOnlyPMK(type) {
      return this.readOnlyFieldPMK.includes(type)
    },
    txtEnableEditField(type) {
      return this.readOnlyFieldPMK.includes(type) ? 'Edit' : 'Simpan'
    },
    browsePemohon() {
      this.modalPemohon = true
    },
    onModalPemohonOKClicked() {
      const selectedPemohon = this.dataPemohon.filter(item => {
        return item.key == this.keySelectedPemohon
      })[0]

      this.formData.nama_pemohon = selectedPemohon.nama
      this.formData.status = selectedPemohon.status_berkas

      this.modalPemohon = false
    },
    pilihPemohon(index) {
      this.keySelectedPemohon = index
      this.isPemohonSelected = true
    },
    txtPemohonSelect(index) {
      if (this.keySelectedPemohon == index && this.isPemohonSelected)
        return 'dipilih'
      return 'pilih'
    },
    colorPemohonSelected(index) {
      if (this.keySelectedPemohon == index && this.isPemohonSelected)
        return 'secondary'
      return 'info'
    },
    countTotal() {
      const biayaSatuan = this.tempBiayaVal || this.selectedPMKData.biayaNumber
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
