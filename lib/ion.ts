import { IonSFUJSONRPCSignal } from 'ion-sdk-js/lib/signal/json-rpc-impl';
import { Client } from 'ion-sdk-js';

let client: Client;

export const initIonClient = (url: string) => {
  const signal = new IonSFUJSONRPCSignal(url);
  client = new Client(signal);

  signal.onopen = () => console.log('Signal connected');
  signal.onclose = () => console.log('Signal closed');

  return client;
};

export const getClient = () => client;
