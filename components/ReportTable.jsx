import {Loader} from '/components/Loader'
import {Fragment, useState, useEffect} from 'react'

export const ReportTable = ({columns, data}) => {
	const [tableData, setTableData] = useState()

	useEffect(() => setTableData(data), [data])

	return (
		<Fragment>
			<div className = 'table-responsive'>
				<table
					style = {{overflow: 'hidden', borderRadius: '10px'}}
					className = 'table table-borderless table-striped table-hover m-0'>
					<thead className = 'bg-cyan text-white'>
						<tr>{columns.map(({key, title}, index) => (
							<th
								className = 'py-4 bold text-capitalize'
								key = {`${new Date().getTime()}-${index}`}>
								{title}
							</th>
						))}</tr>
					</thead>
					<tbody>{
						(tableData)
						? (
							(tableData.length > 0)
							? tableData.map((row, rowIndex) => (
								<tr key = {`${new Date().getTime()}-${rowIndex}`}>{
									columns.map(({key}) => key).map((col, colIndex) => (
										<td key = {`${new Date().getTime()}-${colIndex}`}>{(
											(col === 'sn')
											? ++rowIndex
											: row[col]
										)}</td>
									))
								}</tr>
							))
							: (
								<tr>
									<td colSpan = '5'>
										<div className = 'p-5 text-center text-capitalize'>
											<div className = 'bi-exclamation-circle h1'></div>
											<div>empty rows returned!</div>
										</div>
									</td>
								</tr>
							)
						)
						: (
							<tr>
								<td colSpan = '5'>
									<Loader />
								</td>
							</tr>
						)
					}</tbody>
				</table>
			</div>
			<div className = 'col-12 pt-4'>
				<div className = 'text-center text-muted'>--- End of table ---</div>
			</div>
		</Fragment>
	)
}