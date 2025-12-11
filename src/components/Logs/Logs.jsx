
import dayjs from 'dayjs';
import style from './Logs.module.css';

import CustomTable from '../CustomTable/CustomTable';

import { logsTableHeader } from '../../config';

const Logs = ({ logs }) => {

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
