import Vue from 'vue'
import Router from 'vue-router'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')



const Charts = () => import('@/views/charts/Charts')
const Widgets = () => import('@/views/widgets/Widgets')
const Detail1 = () => import('@/views/base/linedetail/LineDetail1')
const Detail2 = () => import('@/views/base/linedetail/LineDetail2')
const Detail3 = () => import('@/views/base/linedetail/LineDetail3')
const Detail4 = () => import('@/views/base/linedetail/LineDetail4')
const Detail5 = () => import('@/views/base/linedetail/LineDetail5')
const Detail6 = () => import('@/views/base/linedetail/LineDetail6')
const Detail7 = () => import('@/views/base/linedetail/LineDetail7')
const Detail8 = () => import('@/views/base/linedetail/LineDetail8')
const MachineFocused = () => import('@/views/base/MachineFocused')
const SubMachineFocused = () => import('@/views/base/SubMachineFocused')
const Machine = () => import('@/views/base/Machine')
const SubMachine = () => import('@/views/base/SubMachine')
const Job = () => import('@/views/base/Job')
const JobDetail = () => import('@/views/base/JobDetail')
const JobInfo = () => import('@/views/base/jobinfo')
const JobCreate = () => import('@/views/base/JobCreate')
const MobileJobCreate = () => import('@/views/base/mobilejob')
// Views - Components

Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

function configRoutes () {
  return [
    {
      path: '/',
      redirect: '/machine',
      name: 'Home',
      component: TheContainer,
      children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: '/linedetail1',
          name: 'Line1',
          component: Detail1
        },
        {
          path: '/linedetail2',
          name: 'Line2',
          component: Detail2
        },
        {
          path: '/linedetail3',
          name: 'Line3',
          component: Detail3
        },
        {
          path: '/linedetail4',
          name: 'Line4',
          component: Detail4
        },
        {
          path: '/linedetail5',
          name: 'Line5',
          component: Detail5
        },
        {
          path: '/linedetail6',
          name: 'Line6',
          component: Detail6
        },
        {
          path: '/linedetail7',
          name: 'Line7',
          component: Detail7
        },
        {
          path: '/linedetail8',
          name: 'Line8',
          component: Detail8
        },
        {
          path: '/jobdetail/:id',
          name: 'JobDetail',
          component: JobDetail
        },
        {
          path: '/jobinfo/:id',
          name: 'JobInfo',
          component: JobInfo
        },
        {
          path: '/jobcreate/:id',
          name: 'JobCreate',
          component: JobCreate
        },
        {
          path: '/job',
          name: 'Job',
          component: Job
        },
        {
          path: '/focused',
          name: 'FocusedMachine',
          component: MachineFocused
        },
        {
          path: '/subfocused',
          name: 'SubMachineFocused',
          component: SubMachineFocused
        },
        {
          path: '/machine',
          name: 'Machine',
          component: Machine
        },
        {
          path: '/mobilejob',
          name: 'Jobs',
          component: MobileJobCreate
        },
        {
          path: '/submachine',
          name: 'SubMachine',
          component: SubMachine
        },
        {
          path: 'widgets',
          name: 'Widgets',
          component: Widgets
        },
       
      ]
    },
  ]
}

