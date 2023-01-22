export default function AddReport(){
	return (
		<div className = 'row'>
			<div className = 'col-6'>
				<div className = 'row'>
					<div className = 'col-12 mb-5'>
						<h6 className = 'gd-sage text-cyan'>Select date</h6>
						<input
							type = 'date'
							className = 'd-block gd-sage w-100 p-3 border-0 shadow-sm rounded-lg' />	
					</div>
					<div className = 'col-12 mb-5'>
						<h6 className = 'gd-sage text-cyan'>Event / issue</h6>
						<textarea rows = '5' className = 'd-block w-100 resize-0 p-3 border-0 shadow-sm'></textarea>
					</div>
					<div className = 'col-12 mb-5'>
						<h6 className = 'gd-sage text-cyan'>Troubleshooting</h6>
						<textarea rows = '5' className = 'd-block w-100 resize-0 p-3 border-0 shadow-sm'></textarea>
					</div>
					<div className = 'col-12 mb-5'>
						<h6 className = 'gd-sage text-cyan'>Remark</h6>
						<select className = 'd-block text-capitalize gd-sage w-100 p-3 border-0 shadow-sm rounded-lg'>
							<option value = ''>---</option>
							<option value = 'pending'>pending</option>
							<option value = 'resolved'>resolved</option>
							<option value = 'other'>other</option>
						</select>	
					</div>
					<div className = 'col-12'>
						<button className = 'py-3 text-capitalize  px-5 bg-cyan text-white gd-sage shadow-sm rounded-lg border-0 outline-0'>submit</button>
					</div>
				</div>
			</div>
			<div className = 'col-6'>
				<h6 className = 'gd-sage'>Recently added (5)</h6>
				<div className = 'row'>{
					Array(5).fill('').map(() => (
						<div className = 'col-12 mb-5'>
							<div className = 'p-5 bg-white shadow-sm rounded-lg'></div>
						</div>
					))
				}</div>
			</div>
		</div>
	)
}