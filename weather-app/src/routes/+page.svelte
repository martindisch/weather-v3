<script lang="ts">
  import Chart from "$lib/Chart.svelte";
  import Measurements from "$lib/Measurements.svelte";
  import type { Measurement, Point } from "$lib/types";

  export let data: { measurements: Measurement[] };

  const newestMeasurement = data.measurements[data.measurements.length - 1]!;

  const { temperaturePoints, humidityPoints } = data.measurements.reduce(
    (previous, current) => {
      const date = new Date(current.timestamp * 1000);
      previous.temperaturePoints.push({ x: date, y: current.temperature });
      previous.humidityPoints.push({ x: date, y: current.humidity });

      return previous;
    },
    { temperaturePoints: [] as Point[], humidityPoints: [] as Point[] },
  );
</script>

<svelte:head>
  <title>Weather</title>
</svelte:head>

<div class="flex h-full flex-col">
  <div class="flex flex-1 basis-1/6 flex-col justify-center">
    <Measurements
      temperature={newestMeasurement.temperature}
      humidity={newestMeasurement.humidity}
    />
  </div>
  <div class="min-h-[15em] flex-1 basis-1/3">
    <Chart points={temperaturePoints} unit="°C" color="red" />
  </div>
  <div class="min-h-[15em] flex-1 basis-1/3">
    <Chart points={humidityPoints} unit="%" color="blue" />
  </div>
  <div class="h-[5vh]"></div>
</div>
