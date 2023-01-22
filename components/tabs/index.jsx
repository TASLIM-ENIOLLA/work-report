import AddReport   from './add-report'
import ViewReports from './view-reports'
import PrintReport from './print-report'

export default [
	{
		name: 'add-report',
		title: 'add report',
		component: <AddReport />
	},
	{
		name: 'view-reports',
		title: 'view reports',
		component: <ViewReports />
	},
	{
		name: 'print-report',
		title: 'print report',
		component: <PrintReport />
	}
]