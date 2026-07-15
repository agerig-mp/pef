(function () {
  const stateStyles = {
    "us-in": { value: 2, abbr: "IN", labelClass: "midwest-map-data-label-core" },
    "us-il": { value: 1, abbr: "IL", labelClass: "midwest-map-data-label-soft" },
    "us-mi": { value: 1, abbr: "MI", labelClass: "midwest-map-data-label-soft" },
    "us-oh": { value: 1, abbr: "OH", labelClass: "midwest-map-data-label-soft" },
    "us-ky": { value: 1, abbr: "KY", labelClass: "midwest-map-data-label-soft" },
    "us-wi": { value: 1, abbr: "WI", labelClass: "midwest-map-data-label-soft" }
  };

  function renderFallbackMap(container) {
    container.dataset.chartReady = "true";
    container.innerHTML = `
      <svg class="midwest-map-fallback" viewBox="0 0 760 430" role="img" aria-label="United States map with Indiana highlighted">
        <g class="midwest-map-fallback-states" stroke-linejoin="round">
          <path class="midwest-map-fallback-state" d="M62 140 122 118 178 132 210 166 198 210 142 222 84 198Z" />
          <path class="midwest-map-fallback-state" d="M126 112 206 96 274 124 270 188 210 166 178 132Z" />
          <path class="midwest-map-fallback-state" d="M276 124 354 106 418 128 414 196 336 204 270 188Z" />
          <path class="midwest-map-fallback-state" d="M420 128 502 116 560 144 534 206 474 216 414 196Z" />
          <path class="midwest-map-fallback-state" d="M562 146 648 152 704 190 676 246 592 234 534 206Z" />
          <path class="midwest-map-fallback-state" d="M90 224 144 222 198 210 232 254 204 310 124 300 74 266Z" />
          <path class="midwest-map-fallback-state" d="M234 254 300 226 336 204 394 238 372 308 294 316 204 310Z" />
          <path class="midwest-map-fallback-state midwest-map-fallback-soft" d="M300 226 344 214 382 236 374 306 326 314 292 276Z" />
          <path class="midwest-map-fallback-state midwest-map-fallback-soft" d="M346 212 388 206 420 230 410 300 374 306 382 236Z" />
          <path class="midwest-map-fallback-state midwest-map-fallback-core" d="M390 214 428 210 450 240 438 300 410 306 410 248Z" />
          <path class="midwest-map-fallback-state midwest-map-fallback-soft" d="M430 210 474 216 500 254 482 314 438 300 450 240Z" />
          <path class="midwest-map-fallback-state midwest-map-fallback-soft" d="M410 306 438 300 482 314 464 354 414 362 372 334Z" />
          <path class="midwest-map-fallback-state midwest-map-fallback-soft" d="M356 150 410 136 448 162 430 206 388 206 352 184Z" />
          <path class="midwest-map-fallback-state" d="M502 216 592 234 676 246 650 312 558 318 482 314Z" />
          <path class="midwest-map-fallback-state" d="M124 300 204 310 294 316 286 374 210 394 142 368Z" />
          <path class="midwest-map-fallback-state" d="M294 316 372 308 414 362 362 394 286 374Z" />
          <path class="midwest-map-fallback-state" d="M464 354 558 318 650 312 636 366 558 392 486 386Z" />
        </g>
        <g class="midwest-map-fallback-labels">
          <text x="360" y="266">IL</text>
          <text x="430" y="263" class="midwest-map-fallback-label-core">IN</text>
          <text x="468" y="266">OH</text>
          <text x="424" y="340">KY</text>
          <text x="392" y="180">MI</text>
          <text x="344" y="254">WI</text>
        </g>
      </svg>
    `;
  }

  function buildMidwestMap() {
    const container = document.getElementById("midwest-coverage-map");

    if (!container || container.dataset.chartReady === "true") {
      return;
    }

    if (!window.Highcharts || !Highcharts.maps || !Highcharts.maps["countries/us/us-all"]) {
      renderFallbackMap(container);
      return;
    }

    const mapData = Highcharts.maps["countries/us/us-all"];
    const data = mapData.features.map((feature) => {
      const key = feature.properties["hc-key"];
      const style = stateStyles[key];

      return {
        "hc-key": key,
        value: style ? style.value : 0,
        abbr: style ? style.abbr : "",
        labelClass: style ? style.labelClass : ""
      };
    });

    container.dataset.chartReady = "true";

    Highcharts.mapChart(container, {
      chart: {
        map: mapData,
        backgroundColor: "transparent",
        spacing: [0, 0, 0, 0],
        style: {
          fontFamily: "Inter, sans-serif"
        }
      },
      title: {
        text: null
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      accessibility: {
        enabled: false
      },
      mapNavigation: {
        enabled: false
      },
      tooltip: {
        headerFormat: "",
        pointFormatter: function () {
          return `<span style="font-weight:600">${this.name}</span>`;
        }
      },
      colorAxis: {
        dataClasses: [
          { to: 0, color: "#183b66" },
          { from: 1, to: 1, color: "#d7e6f7" },
          { from: 2, color: "#155eef" }
        ]
      },
      series: [
        {
          mapData,
          data,
          joinBy: "hc-key",
          allAreas: true,
          nullColor: "#183b66",
          borderColor: "#d8e6f5",
          borderWidth: 1.1,
          states: {
            hover: {
              color: "#3b82f6",
              borderColor: "#e7f0fa"
            }
          },
          dataLabels: {
            enabled: true,
            allowOverlap: true,
            crop: false,
            overflow: "allow",
            useHTML: true,
            formatter: function () {
              if (!this.point.options.abbr) {
                return "";
              }

              return `<span class="midwest-map-data-label ${this.point.options.labelClass}">${this.point.options.abbr}</span>`;
            }
          }
        }
      ]
    });
  }

  function reflowMidwestMap() {
    if (!window.Highcharts) {
      return;
    }

    const container = document.getElementById("midwest-coverage-map");

    if (!container) {
      return;
    }

    const chart = Highcharts.charts.find((item) => item && item.renderTo === container);

    if (chart) {
      chart.reflow();
    }
  }

  document.addEventListener("DOMContentLoaded", buildMidwestMap);
  document.addEventListener("templates:loaded", buildMidwestMap);
  window.addEventListener("resize", reflowMidwestMap);
})();
