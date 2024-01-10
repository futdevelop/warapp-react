const DumbWarInfo = ({ data, dataForToday, t, statsData }) => {
		return (
			<div className="war-info">
				{statsData.map((statData, index) => {
					const keys = Object.keys(data);
					return (
						<div key={index} className="war-info__block war-block">
							<img className='war-block__img' src={statData.img} alt="image" />
							<div className='war-block__content'>
								<p className="war-block__content-num">
									{data[keys[index]]} {dataForToday[keys[index]] !== 0 ? `(+${dataForToday[keys[index]]})` : null}
								</p>
								<p className="war-block__content-name">
									{t(`${statData.name}`)}
								</p>
							</div>
					</div>
					)
				})}
			</div>		
		)
	}

export default DumbWarInfo;