import './styles.scss';

const WarInfo = ({ stats, statsForToday, t, statsData }) => {
	return (
		<div className='war-info'>
			{statsData.map((statData, index) => {
				const keys = Object.keys(stats);
				return (
					<div key={index} className='war-info__block war-block'>
						<img className='war-block__img' src={statData.img} alt='image' />
						<div className='war-block__content'>
							<p className='war-block__content-num'>
								{stats[keys[index]]}{' '}
								{statsForToday[keys[index]] !== 0
									? `(+${statsForToday[keys[index]]})`
									: null}
							</p>
							<p className='war-block__content-name'>{t(`${statData.name}`)}</p>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default WarInfo;
