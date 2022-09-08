import { Actions } from '@twilio/flex-ui';
import { syncClient } from '../services';

export default function syncDocIPC() {
  Actions.registerAction("SyncDocIPC", async (payload) => {
    /* payload schema:
    {
      mode: 'GET' | 'UPDATE' | 'CLOSE',
      docName: string,
      data: object
    }
    */
    
    switch (payload.mode) {
      case 'GET':
        const doc = await syncClient.getTempSyncDoc(payload.docName);
        payload.data = doc.data;
        break;
      case 'UPDATE':
        payload.data = await syncClient.updateTempSyncDoc(payload.docName, payload.data);
        break;
      case 'CLOSE':
        await syncClient.closeSyncDoc(payload.docName);
        break;
    }
    
  });
}
