// import React, { useState, useEffect } from 'react'
// import useWarStatusService from ".././../WarStatusService";

// const WarInfo = props => {
//   const [data, setData] = useState({});
//   const [dataForToday, setDataForToday] = useState({});


//   return (
// 		<div className="war-info">
// 			{statsData.map((statData, index) => {
// 				const keys = Object.keys(data);
// 				return (
// 					<div className="war-info-block info-block">
// 					<img className='info-block-icon' src={statData.img} alt="" />
// 					<div>
// 							<p className="info-block-stat">{data[keys[index]]} {dataForToday[keys[index]] !== 0 ? `(+${dataForToday[keys[index]]})` : null}</p>
// 						<p className="info-block-name">{statData.name}</p>
// 					</div>
// 					</div>
// 				)
// 			})}
// 		</div>
//   )
// }

// export default WarInfo;