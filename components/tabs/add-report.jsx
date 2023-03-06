import {API} from '/config'
import {Loader} from '/components/Loader'
import {TabsContext} from '/contexts/pages/Tabs'
import {Fragment, useState, useEffect, useContext} from 'react'

export default function AddReport(){
	const count = 5
	const [rowData, setRowData] = useState()
	const {updateTabName} = useContext(TabsContext)
	const [reportData, setReportData] = useState({
		date: '', remark: '', event: '', troubleshoot: '', remember_date: false
	})
	const saveReport = (e) => {
		e.preventDefault()

		fetch(API.SAVE_TASK_DATA, {
			method: 'post',
			body: JSON.stringify(reportData)
		})
		.then((response) => response.json())
		.then(({data, type, message}) => {
			if(type === 'success'){
				const tab_page_title = document.querySelector('#tab-page-title')

				tab_page_title.scrollIntoView({behavior: 'smooth'})
				alert('Report added successfully!')
				setRowData([reportData, ...rowData].filter((_, index) => index < count))
				setReportData({
					date: reportData.remember_date ? reportData.date : '',
					remark: '',
					event: '',
					troubleshoot: '',
					remember_date: reportData.remember_date
				})
			}
			else alert(message)
		})
	}
	const loadRecentData = () => {
		fetch(`${API.READ_TASKS_DATA}?count=${count}`)
		.then(e => e.json())
		.then(({data}) => setRowData(data))
	}

	useEffect(() => loadRecentData(), [])

	return (
		<div className = 'row'>
			<div className = 'col-lg-6'>
				<form onSubmit = {saveReport} className = 'row'>
					<div className = 'col-12 mb-5'>
						<h6 className = 'gd-sage text-cyan'>Select date</h6>
						<input
							value = {reportData.date}
							onChange = {({target: {value}}) => setReportData({...reportData, date: value})}
							type = 'date'
							className = 'd-block w-100 p-3 border shadow-sm rounded-lg' />
						<Checkbox className = 'my-3' title = 'Remember date?' value = {reportData.remember_date} onChange = {({value}) => setReportData({
							...reportData, remember_date: value
						})} />
					</div>
					<div className = 'col-12 mb-5'>
						<h6 className = 'gd-sage text-cyan'>Event / issue</h6>
						<textarea
							value = {reportData.event}
							onChange = {({target: {value}}) => setReportData({...reportData, event: value})}
							rows = '5'
							className = 'd-block w-100 resize-0 p-3 border shadow-sm'></textarea>
					</div>
					<div className = 'col-12 mb-5'>
						<h6 className = 'gd-sage text-cyan'>Troubleshooting</h6>
						<textarea
							value = {reportData.troubleshoot}
							onChange = {({target: {value}}) => setReportData({...reportData, troubleshoot: value})}
							rows = '5'
							className = 'd-block w-100 resize-0 p-3 border shadow-sm'></textarea>
					</div>
					<div className = 'col-12 mb-5'>
						<h6 className = 'gd-sage text-cyan'>Remark</h6>
						<select
							value = {reportData.remark}
							onChange = {({target: {value}}) => setReportData({...reportData, remark: value})}
							className = 'd-block text-capitalize w-100 p-3 border shadow-sm rounded-lg'>
							<option value = ''>---</option>
							<option value = 'pending'>pending</option>
							<option value = 'resolved'>resolved</option>
							<option value = 'other'>other</option>
						</select>
					</div>
					<div className = 'col-12'>
						<button className = 'py-3 text-capitalize  px-5 bg-cyan text-white gd-sage shadow-sm rounded-lg border-0'>submit</button>
					</div>
				</form>
			</div>
			<div className = 'col-lg-6'>
				<h6 className = 'gd-sage text-cyan text-right'>Recently added ({rowData ? rowData.length : 0})</h6>
				<div className = 'row'>{
					(rowData)
					? (
						(rowData.length > 0)
						? <Fragment>{rowData.map(({remark, event, troubleshoot, date}, index) => (
							<div className = 'col-12 mb-5' key = {index}>
								<div className = 'p-3 bg-white border shadow-sm rounded-lg'>
									<h6 className = 'gd-sage text-capitalize'>{remark}</h6>
									<div className = 'text-right mb-3'>
										<p className = 'm-0 max-w-75 text-white d-inline-block bg-cyan text-sentence p-3 rounded-1x'>
											{event}
										</p>
									</div>{
										troubleshoot === '' ? <></> : (
											<div className = 'text-left mb-3'>
												<p className = 'm-0 max-w-75 text-white d-inline-block bg-dark text-sentence p-3 rounded-1x'>
													{troubleshoot}
												</p>
											</div>
										)
									}
									<p className = 'm-0 text-sentence pt-2'>{new Date(date).toDateString()}</p>
								</div>
							</div>))}
							<div className = 'col-12 text-center'>
								<button onClick = {() => updateTabName('view-reports')} className = 'bg-cyan text-capitalize bold text-white shadow-sm border rounded-2x px-5 py-2'>see all</button>
							</div>
						</Fragment>
						: (
							<div className = 'col-12 mb-5'>
								<div className = 'p-5 text-capitalize text-center gd-sage text-cyan bg-white border shadow-sm rounded-lg'>
									empty rows returned!
								</div>
							</div>
						)
					)
					: (
						<div className = 'col-12 mb-5'>
							<div className = 'p-5'>
								<Loader />
							</div>
						</div>
					)
				}</div>
			</div>
		</div>
	)
}

function Checkbox({value, onChange, title, className}){
	const [checked, setChecked] = useState(value)

	useEffect(() => onChange({value: checked}), [checked])

	return (
		<button title = {title} onClick = {() => setChecked(n => !n)} type = 'button' className = {`bg-clear border-0 outline-0 p-0 ${className}`}>
			<span className = {`bi-check-square${checked ? '-fill' : ''} text-cyan pr-3`}></span>
			<span>{title}</span>
		</button>
	)
}
