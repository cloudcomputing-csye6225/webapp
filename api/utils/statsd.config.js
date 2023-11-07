import StatsD from "node-statsd";

const statsd = new StatsD({host:"localhost", port:8125});

export default statsd;