import {
  required,
  minLength,
  maxLength,
  numeric,
} from 'vuelidate/lib/validators'

export const loginValidations = {
  username: {
    required,
  },
  password: {
    required,
  },
}

export const pemohonValidations = {
  pemohonFormData: {
    golongan: {
      required,
    },
    jabatan: {
      required,
    },
    nama: {
      required,
    },
    maksud_perjalanan: {
      required,
    },
    asal: {
      required,
    },
    tujuan: {
      required,
    },
    lama: {
      required,
    },
    nama_lembaga: {
      required,
    },
    nomor_spd: {
      required,
    },
  },
  userFormData: {
    nip: {
      required,
      numeric,
      minLength: minLength(18),
      maxLength: maxLength(18),
    },
    username: {
      required,
      minLength: minLength(4),
    },
    password: {
      required,
      minLength: minLength(6),
      goodPassword: password => {
        return /[a-z]/.test(password) && /[0-9]/.test(password)
      },
    },
  },
}

export const estimasiValidation = {
  formData: {
    nama_lembaga: {
      required,
    },
    jenis_pmk: {
      required,
    },
    kategori_pmk: {
      required,
    },
    tanggal_berangkat: {
      required,
    },
    asal: {
      required,
    },
    tujuan: {
      required,
    },
    biaya: {
      required,
    },
    banyak: {
      required,
      minLength: minLength(0),
    },
    total: {
      required,
    },
  },
  nama_pemohon: {
    required,
  },
}

export const biayaRiilValidation = {
  formData: {
    tanggal_berangkat: {
      required,
    },
    biaya: {
      required,
    },
    banyak: {
      required,
      minLength: minLength(0),
    },
    kategori_pmk: {
      required,
    },
    jenis_pmk: {
      required,
    },
    total: {
      required,
    },
    bukti: {
      required,
    },
    asal: {
      required,
    },
    tujuan: {
      required,
    },
    nama_lembaga: {
      required,
    },
  },
}
