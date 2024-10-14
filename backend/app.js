import express from 'express';
import cors from 'cors';
import { ModbusService } from './modbus.js';

const app = express();

app.use(cors());

app.get('/data', async function (req, res) {
  const modbusService = new ModbusService();

  await modbusService.connect();
  
  const data = await modbusService.getData();

  res.send(data)
})

app.get('/test', async function (req, res) {
  const modbusService = new ModbusService();
  
  await modbusService.findTemperature();
})

/* app.listen(process.env.APP_PORT); */
app.listen('5000');
