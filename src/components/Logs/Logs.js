import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import style from './Logs.module.css';

import Table from '../Table/Table';
import CustomTable from '../CustomTable/CustomTable';

import { logsTableHeader } from '../../config';

const Logs = ({ logs }) => {

  // const [logsOrdered, setLogsOrdered] = useState([])
  // useEffect( () => {
  //   const newOrderedLogs = logs?.sort((a, b) => {
  //     console.log(dayjs(a.time_stamp).isBefore(b.time_stamp))
  //     return dayjs(a.time_stamp).isBefore(b.time_stamp);
  //   })
  //   console.log(newOrderedLogs);
  //   setLogsOrdered(newOrderedLogs);
  // }, [logs])

  return <div className={style.container}>
    <h2> Jurnal activitati </h2>
    {logs?.map(log => {
      return (
        <div className={style.log}>
          <div className={style.auth}> {log.user_name} {dayjs(log.time_stamp).format('DD.MM.YYYY HH:mm')}</div>
          <CustomTable items={log.products} headerConfig={logsTableHeader} />
        </div>
      )
    })}
  </div>
}

export default Logs;
