import modbus from 'jsmodbus';
import net from 'net';

export class ModbusService{
  constructor() {
    this.socket = new net.Socket();
    this.client = new modbus.client.TCP(this.socket);
    this.options = {
      'host': process.env.PLC_HOST,
      'port': process.env.PLC_PORT
    };
    this.addresses = [809, 835, 861, 887, 1016, 1208, 1505, 1527, 1549, 1571, 2712, 2810, 2842, 2910, 2942, 3010, 3042];
    this.twoBytesRealAddresses = [962, 1448, 1450, 1648, 1658, 2304, 2604];
    this.twoBytesUdintAddresses = [2002, 2008, 2014, 2020, 2026, 2032]
    this.results;
  }

  async findTemperature() {
    const addresses = Array.from({length: 3000}, (_, i) => i + 1452 /* 2712 */)

    const doubleAddresses = addresses.filter((item) => item % 2 === 0)

    this.socket.on('connect', async () => {
      const result = [];

      const twoBytesRealPromises = doubleAddresses.map(( address ) => {
        return this.client.readHoldingRegisters( address, 2 )
        .then((resp) => {
            const data = resp.response._body.valuesAsBuffer
            
            const a = data[0]
            const b = data[1]
            const c = data[2]
            const d = data[3]
            data[0] = c
            data[1] = d
            data[2] = a
            data[3] = b
            
            result.push({address: address, value: data.readFloatBE(0).toFixed(2)})
        })
        .catch(() => console.error(require('util').inspect(arguments, { depth: null})))
      })

      const allFcs = Promise.all(twoBytesRealPromises);
  
      await allFcs.then(() => {
        result.map(( item ) => {
          if (item.value != 0) {
            console.log(item)
          }
        })
        
        this.socket.end();      
      });       
    })
      
    this.socket.connect(this.options);
  }

  async connect() {
    this.socket.on('error', console.error);

    this.socket.on('connect', async () => {
      const result = [];

      const getPromises = () => {
        const oneBytePromises = this.addresses.map(( address ) => {
          return this.client.readHoldingRegisters( address, 1 )
            .then((resp) => result.push({address: address, value: resp.response._body.valuesAsArray[0] })) 
            .catch(() => console.error(require('util').inspect(arguments, { depth: null})))
        });

        const twoBytesRealPromises = this.twoBytesRealAddresses.map(( address ) => {
          return this.client.readHoldingRegisters( address, 2 )
          .then((resp) => {
            const data = resp.response._body.valuesAsBuffer;

            const a = data[0];
            const b = data[1];
            const c = data[2];
            const d = data[3];
            data[0] = c;
            data[1] = d;
            data[2] = a;
            data[3] = b;

            result.push({address: address, value: data.readFloatBE(0).toFixed(2)});
          })
          .catch(() => console.error(require('util').inspect(arguments, { depth: null})))
        })

        const twoBytesUdintlPromises = this.twoBytesUdintAddresses.map(( address ) => {
          return this.client.readHoldingRegisters( address, 2 )
          .then((resp) => {
            const data = resp.response._body.valuesAsBuffer;

            const a = data[0];
            const b = data[1];
            const c = data[2];
            const d = data[3];
            data[0] = b;
            data[1] = a;
            data[2] = c;
            data[3] = d;

            result.push({address: address, value: data.readUInt32LE(0)});
          })
          .catch(() => console.error(require('util').inspect(arguments, { depth: null})))
        })

        return oneBytePromises.concat(twoBytesRealPromises).concat(twoBytesUdintlPromises);
      }
      
      const promises = getPromises();

      const allFcs = Promise.all(promises);
    
      await allFcs.then(() => {
        this.results = result;
        this.socket.end();      
      });
    });

    this.socket.connect(this.options);
  }

  async getData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.results);
      }, 100);
    });
  }
}
