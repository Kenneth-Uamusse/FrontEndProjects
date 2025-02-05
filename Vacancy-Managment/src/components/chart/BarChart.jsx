import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import useVacancyContext from "../../hook/useVacancyContext";
import useCandidacyContext from "../../hook/useCandidacyContext";

const ApexChart = () => {
  const { jobs } = useVacancyContext();
  const { candidacies } = useCandidacyContext();

  const [categories, setCategories] = useState([]);
  const [series, setSeries] = useState([
    {
      data: [],
    },
  ]);

  useEffect(() => {
    if (jobs && candidacies) {
      const jobTitles = jobs.map((job) => job.jobTitle);

      const candidacyCounts = jobTitles.map((title) => {
        return candidacies.filter((candidacy) => candidacy.jobTitle === title)
          .length;
      });

      setCategories(jobTitles);
      setSeries([{ data: candidacyCounts }]);
    }
  }, [jobs, candidacies]);

  const options = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: "end",
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories,
    },
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;
