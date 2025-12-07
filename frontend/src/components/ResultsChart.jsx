import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { calculateStats } from '../utils/storage';
import { useLanguage } from '../i18n/LanguageContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function ResultsChart({ data, scenarioFilter = 'all' }) {
  const [chartType, setChartType] = useState('bar');
  const { t } = useLanguage();

  // Filter data by scenario if needed
  const filteredData = scenarioFilter === 'all'
    ? data
    : data.filter(d => d.scenarioType === scenarioFilter);

  // Group by protocol
  const byProtocol = filteredData.reduce((acc, result) => {
    const protocol = result.protocol;
    if (!acc[protocol]) {
      acc[protocol] = [];
    }
    acc[protocol].push(result);
    return acc;
  }, {});

  const protocols = Object.keys(byProtocol);

  // Calculate stats for each protocol
  const stats = protocols.map(protocol => ({
    protocol,
    ttfb: calculateStats(byProtocol[protocol], 'ttfb'),
    domLoad: calculateStats(byProtocol[protocol], 'domLoad'),
    fullLoad: calculateStats(byProtocol[protocol], 'fullLoad'),
    count: byProtocol[protocol].length
  }));

  // Bar chart data - technical black/gray colors
  const barChartData = {
    labels: protocols.map(p => p.toUpperCase()),
    datasets: [
      {
        label: `${t('ttfb')} (ms)`,
        data: stats.map(s => s.ttfb.mean),
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 2
      },
      {
        label: `DOM Load (ms)`,
        data: stats.map(s => s.domLoad.mean),
        backgroundColor: 'rgba(82, 82, 82, 0.9)',
        borderColor: 'rgba(82, 82, 82, 1)',
        borderWidth: 2
      },
      {
        label: `Full Load (ms)`,
        data: stats.map(s => s.fullLoad.mean),
        backgroundColor: 'rgba(163, 163, 163, 0.9)',
        borderColor: 'rgba(163, 163, 163, 1)',
        borderWidth: 2
      }
    ]
  };

  // Line chart data - time series with black/gray shades
  const lineChartData = {
    labels: filteredData.map((d, i) => `Test ${i + 1}`),
    datasets: protocols.map((protocol, index) => {
      const protocolData = filteredData.filter(d => d.protocol === protocol);
      const colors = [
        { border: 'rgb(0, 0, 0)', bg: 'rgba(0, 0, 0, 0.1)' },
        { border: 'rgb(82, 82, 82)', bg: 'rgba(82, 82, 82, 0.1)' },
        { border: 'rgb(163, 163, 163)', bg: 'rgba(163, 163, 163, 0.1)' }
      ];

      return {
        label: protocol.toUpperCase(),
        data: protocolData.map(d => d.fullLoad),
        borderColor: colors[index % colors.length].border,
        backgroundColor: colors[index % colors.length].bg,
        borderWidth: 2,
        tension: 0.1,
        pointRadius: 3,
        pointBackgroundColor: colors[index % colors.length].border
      };
    })
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: { family: 'monospace', size: 11 },
          color: '#000',
          padding: 15
        }
      },
      title: {
        display: true,
        text: t('avgPerformanceByProtocol'),
        font: { family: 'monospace', size: 13, weight: 'bold' },
        color: '#000',
        padding: { top: 10, bottom: 20 }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Time (ms)',
          font: { family: 'monospace', size: 11 },
          color: '#000'
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          font: { family: 'monospace', size: 10 },
          color: '#000'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: { family: 'monospace', size: 10, weight: 'bold' },
          color: '#000'
        }
      }
    }
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: { family: 'monospace', size: 11 },
          color: '#000',
          padding: 15
        }
      },
      title: {
        display: true,
        text: t('fullLoadTimeOverTests'),
        font: { family: 'monospace', size: 13, weight: 'bold' },
        color: '#000',
        padding: { top: 10, bottom: 20 }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Time (ms)',
          font: { family: 'monospace', size: 11 },
          color: '#000'
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          font: { family: 'monospace', size: 10 },
          color: '#000'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: { family: 'monospace', size: 10 },
          color: '#000'
        }
      }
    }
  };

  if (!data || data.length === 0) {
    return (
      <div className="border-2 border-neutral-300 p-4 bg-neutral-50">
        <p className="font-mono text-sm text-neutral-700">{t('noResults')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Chart Type Toggle */}
      <div className="flex justify-center gap-0 border-2 border-black w-fit mx-auto">
        <button
          onClick={() => setChartType('bar')}
          className={`px-6 py-3 font-mono text-sm uppercase tracking-wide transition-colors cursor-pointer border-r-2 border-black ${
            chartType === 'bar'
              ? 'bg-black text-white'
              : 'bg-white text-black hover:bg-neutral-100'
          }`}
        >
          {t('barChart')}
        </button>
        <button
          onClick={() => setChartType('line')}
          className={`px-6 py-3 font-mono text-sm uppercase tracking-wide transition-colors cursor-pointer ${
            chartType === 'line'
              ? 'bg-black text-white'
              : 'bg-white text-black hover:bg-neutral-100'
          }`}
        >
          {t('timeSeries')}
        </button>
      </div>

      {/* Chart */}
      <div className="bg-white border-2 border-black p-6">
        {chartType === 'bar' ? (
          <Bar data={barChartData} options={barOptions} />
        ) : (
          <Line data={lineChartData} options={lineOptions} />
        )}
      </div>

      {/* Statistics Table */}
      <div className="border border-neutral-300">
        <div className="p-4 border-b border-neutral-300 bg-neutral-50">
          <h3 className="font-mono font-bold text-sm uppercase">{t('statisticalSummary')}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full font-mono text-xs">
            <thead>
              <tr className="border-b border-neutral-300 bg-neutral-50">
                <th className="px-4 py-3 text-left uppercase">{t('protocol')}</th>
                <th className="px-4 py-3 text-left uppercase">{t('tests')}</th>
                <th className="px-4 py-3 text-left uppercase">{t('avgTTFB')}</th>
                <th className="px-4 py-3 text-left uppercase">{t('avgDOMLoad')}</th>
                <th className="px-4 py-3 text-left uppercase">{t('avgFullLoad')}</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {stats.map((stat) => (
                <tr key={stat.protocol} className="border-b border-neutral-200 hover:bg-neutral-50">
                  <td className="px-4 py-3 font-bold text-black">
                    {stat.protocol.toUpperCase()}
                  </td>
                  <td className="px-4 py-3 text-neutral-700">{stat.count}</td>
                  <td className="px-4 py-3 text-neutral-700">
                    {stat.ttfb.mean} ms
                    <span className="text-neutral-500 ml-1">(±{stat.ttfb.stdDev})</span>
                  </td>
                  <td className="px-4 py-3 text-neutral-700">
                    {stat.domLoad.mean} ms
                    <span className="text-neutral-500 ml-1">(±{stat.domLoad.stdDev})</span>
                  </td>
                  <td className="px-4 py-3 text-neutral-700">
                    {stat.fullLoad.mean} ms
                    <span className="text-neutral-500 ml-1">(±{stat.fullLoad.stdDev})</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ResultsChart;
