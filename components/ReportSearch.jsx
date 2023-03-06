import {useState, useEffect} from 'react'

export const ReportSearch = ({data, onSearchParametersChange}) => {
	const [searchParams, setSearchParams] = useState({
		query: '', what: '', remark: '', date: ''
	})
	const [canClearSearch, setCanClearSearch] = useState(false)
	const filterList = ({query, what, remark, date}) => {
		const result = data

		if(remark !== '') result = result.filter(({remark: _rem}) => remark === _rem)
		if(date !== '' && new Date(date)) result = result.filter(({date: _date}) => {
			const a = new Date(new Date(date).toLocaleDateString()).getTime()
			const b = new Date(new Date(_date).toLocaleDateString()).getTime()

			return a === b
		})
		if(query !== '') result = result.filter((each) => {
			if(what === ''){
				const {troubleshoot, event} = each

				return new RegExp(query, 'i').test(troubleshoot) || new RegExp(query, 'i').test(event)
			}
			else{
				const queryString = each[what]

				return new RegExp(query, 'i').test(queryString)
			}
		})

		console.log(result)	
		onSearchParametersChange(result)	
	}
	const clearSearch = (e) => {
		e.preventDefault()

		setSearchParams({query: '', what: 'events', remark: '', date: ''})
		setCanClearSearch(false)
	}

	useEffect(() => {
		// const {what, ...rest} = searchParams

		setCanClearSearch(!Object.values(searchParams).every((each) => each === ''))
		filterList(searchParams)
	}, [searchParams])

	return (
		<div className = 'row mb-3'>
			<div className = 'col-lg-6 mb-3'>
				<h6 className = 'gd-sage text-cyan'>Search</h6>
				<input
					value = {searchParams.query}
					onChange = {({target: {value}}) => setSearchParams({...searchParams, query: value})}
					type = 'search'
					className = 'd-block w-100 p-3 border shadow-sm rounded-lg' />	
			</div>
			<div className = 'col-lg-2 mb-3'>
				<h6 className = 'gd-sage text-cyan'>What</h6>
				<select
					value = {searchParams.what}
					onChange = {({target: {value}}) => setSearchParams({...searchParams, what: value})}
					className = 'd-block text-capitalize w-100 p-3 border shadow-sm rounded-lg'>
					<option value = ''>---</option>
					<option value = 'event'>events</option>
					<option value = 'troubleshoot'>troubleshoots</option>
				</select>
			</div>
			<div className = 'col-lg-2 mb-3'>
				<h6 className = 'gd-sage text-cyan'>Remark</h6>
				<select
					value = {searchParams.remark}
					onChange = {({target: {value}}) => setSearchParams({...searchParams, remark: value})}
					className = 'd-block text-capitalize w-100 p-3 border shadow-sm rounded-lg'>
					<option value = ''>---</option>
					<option value = 'pending'>pending</option>
					<option value = 'resolved'>resolved</option>
					<option value = 'other'>other</option>
				</select>
			</div>
			<div className = 'col-lg-2 mb-3'>
				<h6 className = 'gd-sage text-cyan'>Date</h6>
				<input
					value = {searchParams.date}
					onChange = {({target: {value}}) => setSearchParams({...searchParams, date: value})}
					type = 'date'
					className = 'd-block w-100 p-3 border shadow-sm rounded-lg' />	
			</div>
			<div className = 'col-12 text-right'>
				<a href = '#' onClick = {clearSearch} className = {`${(
					(canClearSearch)
					? ''
					: 'd-none'
				)} text-danger underline text-capitalize`}>
					clear search
				</a>
			</div>
		</div>
	)
}