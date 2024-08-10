import React from 'react';
import Table from '../Table/Table';

import { logsTableHeader } from '../../config';

const Logs = ({ logs }) => {

  console.log(logs);
  return logs?.reverse().map(log => {
    return (
      <div>
        <div>
          {log.user_name}
        </div>
        <div>
          {log.time_stamp}
        </div>
        <Table products={log.products} header={logsTableHeader} />
      </div>
    )
  })
}

export default Logs;
