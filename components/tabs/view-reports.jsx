import {API} from '/config'
import {Loader} from '/components/Loader'
import {useState, useEffect, Fragment} from 'react'
import {ReportTable} from '/components/ReportTable'
import {ReportSearch} from '/components/ReportSearch'

export default function ViewReports(){
	const [isLoading, setIsLoading] = useState(false)
	const [reportData, setReportData] = useState([])
	const [tableData, setTableData] = useState(reportData)
	const tableColumns = [
		{
			key: 'sn',
			title: 'S/N'
		},
		{
			key: 'event',
			title: 'event/issue'
		},
		{
			key: 'troubleshoot',
			title: 'troubleshooting'
		},
		{
			key: 'date',
			title: 'date'
		},
		{
			key: 'remark',
			title: 'remark'
		}
	]

	useEffect(() => {
		fetch(API.READ_TASKS_DATA)
		.then(e => e.json())
		.then(({data, type}) => setReportData(
			data.map(eachRow => ({
				...eachRow,
				date: new Date(eachRow.date).toLocaleDateString()
			}))
		))
	}, [])

	useEffect(() => setTableData(reportData), [reportData])

	return (
		<Fragment>
			<ReportSearch data = {reportData} onSearchParametersChange = {(filteredData) => setTableData(filteredData)} />
			<div className = 'row'>
				<div className = 'col-12 mb-4'>
					<h2 className = 'gd-sage text-cyan m-0'>Reports</h2>
				</div>
				<div className = 'col-12'>{(
					(isLoading)
					? <Loader />
					: <ReportTable columns = {tableColumns} data = {tableData} />
				)}
					
				</div>
			</div>
		</Fragment>
	)
}