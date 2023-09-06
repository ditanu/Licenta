import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
const mockData = [
  {
    id: 1,
    nume: "Preșul",
    autor: "Aureșcu Elyndra",
    gen: "dramă",
    descriere:
      '"Piesa de teatru "Preșul" este o dramă puternică și emoționantă despre un grup de femei dintr-un sat îndepărtat care luptă să supraviețuiască în timpul unei secete severe',
    pret_bilet: 50,
    imgPoster:
      "https://www.cnmv.ro/wp-content/uploads/2020/06/orpheus_2019-2020_presul-1024x767.png",
    nr_locuri_totale: null,
    locuri_ocupate:
      '["D9","D10","D11","E9","E10","G8","G7","G6","G5","G4","F7","F8","G10","G11","G12","G13"]',
    createdAt: "2023-05-10T16:12:52.000Z",
    updatedAt: "2023-05-19T10:35:16.000Z",
    trupaId: 1,
    locatieId: 2,
  },
  {
    id: 4,
    nume: "dsad",
    autor: "sadsa",
    gen: "asdsa",
    descriere: "sdadsa",
    pret_bilet: 100,
    imgPoster: "sda",
    nr_locuri_totale: null,
    locuri_ocupate: '["G13","G12","F12","F13"]',
    createdAt: "2023-05-11T09:07:09.000Z",
    updatedAt: "2023-05-19T10:34:16.000Z",
    trupaId: 3,
    locatieId: 3,
  },
  {
    id: 5,
    nume: "Bugi",
    autor: "Dita",
    gen: "drama",
    descriere: "O sceneta superba realizate de catre Dita Alexandru",
    pret_bilet: 100,
    imgPoster:
      "https://th.bing.com/th/id/OIP.rqg-taeHtXJmWjv0VaFDTwHaKx?pid=ImgDet&rs=1",
    nr_locuri_totale: null,
    locuri_ocupate: "[]",
    createdAt: "2023-05-14T19:30:35.000Z",
    updatedAt: "2023-05-14T19:30:35.000Z",
    trupaId: 4,
    locatieId: 1,
  },
];

export const Chart = () => {
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/sceneta").then((res) => {
      setEventData(res.data);
    });
  }, []);

  const options = useMemo(() => {
    return {
      chart: {
        type: "bar",
      },
      title: {
        text: "Trupe",
        align: "left",
      },
      subtitle: {
        text:
          "Source: <a " +
          'href="https://en.wikipedia.org/wiki/List_of_continents_and_continental_subregions_by_population"' +
          'target="_blank">Wikipedia.org</a>',
        align: "left",
      },
      xAxis: {
        categories: eventData.map((el) => el.nume),
        title: {
          text: null,
        },
        gridLineWidth: 1,
        lineWidth: 0,
      },
      yAxis: {
        min: 0,
        title: {
          text: "Pret (lei)",
          align: "high",
        },
        labels: {
          overflow: "justify",
        },
        gridLineWidth: 0,
      },
      tooltip: {
        valueSuffix: " lei",
      },
      plotOptions: {
        bar: {
          borderRadius: "50%",
          dataLabels: {
            enabled: true,
          },
          groupPadding: 0.1,
        },
      },

      credits: {
        enabled: false,
      },
      series: [
        {
          name: "Posibiilitate incasari",
          data: eventData.map((el) => 80 * el.pret_bilet),
        },
        {
          name: "Incasari",
          data: eventData.map(
            (el) => JSON.parse(el.locuri_ocupate).length * el.pret_bilet
          ),
        },
      ],
    };
  }, [eventData]);
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};
