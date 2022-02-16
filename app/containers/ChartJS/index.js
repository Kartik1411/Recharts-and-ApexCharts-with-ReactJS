import React from 'react';
import LineChart from '../../components/ChartJS/index';

import { data } from '../../fakeData/5Kdata';

function ChartJS() {
  return (
    <div>
      <LineChart data={data} id="line-chart" />
    </div>
  );
}

export default ChartJS;
