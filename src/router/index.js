import Vue from 'vue'
import Router from 'vue-router'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')
const LoginPage = () => import('@/views/auth/LoginPage')

// Data Pemohon
const DataPemohon = () => import('@/views/data-pemohon/DataPemohon')

// Data Estimasi
const DataEstimasi = () => import('@/views/data-estimasi/DataEstimasi')
const TambahDataEstimasi = () => import('@/views/data-estimasi/TambahData')


Vue.use(Router)

export default new Router({
  mode: 'history', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

function configRoutes () {
  return [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: TheContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        }
      ]
    },
    {
      path: '/data-pemohon',
      name: 'Data Pemohon',
      redirect: '/data-pemohon',
      component: TheContainer,
      children: [
        {
          path: '/',
          component: DataPemohon
        }
      ]
    },
    {
      path: '/data-estimasi',
      name: 'Data Estimasi',
      redirect: '/data-estimasi',
      component: TheContainer,
      children: [
        {
          path: '/',
          component: DataEstimasi
        },
        {
          path: 'tambah',
          name: 'Tambah Data Estimasi',
          component: TambahDataEstimasi
        }
      ]
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    }
  ]
}

