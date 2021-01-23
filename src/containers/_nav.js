export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-speedometer',
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Master']
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Data Pemohon',
        to: '/data-pemohon',
        icon: 'cil-user'
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Transaksi']
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Data Estimasi',
        route: '/data-estimasi',
        icon: 'cil-wallet',
        items: [
          {
            name: 'Lihat Data',
            to: '/data-estimasi'
          },
          {
            name: 'Tambah Data',
            to: '/data-estimasi/tambah'
          },
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Data Biaya Riil',
        route: '/data-biaya-riil',
        icon: 'cil-money',
        items: [
          {
            name: 'Lihat Data',
            to: '/data-biaya-riil'
          },
          {
            name: 'Tambah Data',
            to: '/data-biaya-riil/tambah'
          },
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Data Perbandingan',
        route: '/data-perbandingan',
        icon: 'cil-balance-scale',
        items: [
          {
            name: 'Lihat Data',
            to: '/data-perbandingan'
          },
          {
            name: 'Tambah Data',
            to: '/data-perbandingan/tambah'
          },
        ]
      },
    ]
  }
]