import React from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import Approver from './Approver';
import Auditor from './Auditor';

var stompClient = null;

const Audit = () => {
  const [name, setName] = React.useState('');
  const [role, setRole] = React.useState('Approver');
  const [connected, setConnected] = React.useState(false);
  const [auditData, setAuditData] = React.useState({});

  console.log({ name, role, auditData });

  const connectToSocket = () => {
    let Sock = new SockJS('http://localhost:8080/ws');
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setConnected(true);
    if (role === 'Auditor') {
      stompClient.subscribe(`/agent/${name}/audit`, onAuditorDataReceived);
    }
  };

  const onAuditorDataReceived = payload => {
    console.log('onAuditorDataReceived', payload);
    const payloadData = JSON.parse(payload.body);

    switch (payloadData.status) {
      case 'MESSAGE':
        setAuditData(payloadData);
        break;
      case 'LEAVE':
        setAuditData({});
        break;
      default:
        break;
    }
  };

  const onError = err => {
    console.log(err);
  };

  const registerVkycAgentSocket = () => {
    connectToSocket();
  };

  const onDisconnect = () => {
    if (stompClient) {
      const auditDataFromApprover = {
        senderName: name,
        receiverName: 'Ashish',
        data: {},
        status: 'LEAVE',
      };
      stompClient.send('/app/audit-data', {}, JSON.stringify(auditDataFromApprover));
    }
  };

  const deRegisterVkycAgentSocket = () => {
    try {
      onDisconnect();
      stompClient.disconnect();
      setAuditData({});
      setConnected(false);
    } catch (error) {}
  };

  const renderAgentView =
    role === 'Approver' ? (
      <Approver
        stompClient={stompClient}
        name={name}
        deRegisterVkycAgentSocket={deRegisterVkycAgentSocket}
      />
    ) : (
      <Auditor auditData={auditData} deRegisterVkycAgentSocket={deRegisterVkycAgentSocket} />
    );

  const renderBody = !connected ? (
    <>
      <h3 className="text-2xl text-center font-bold m-4">VKYC Audit</h3>
      <div className="flex justify-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="p-3 border-2 border-blue-500 rounded-md shadow-md"
        />
        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          className="p-3 border-2 border-blue-500 rounded-md shadow-md"
        >
          <option value="Approver" className="bg-blue-500 text-white">
            Approver
          </option>
          <option value="Auditor" className="bg-blue-500 text-white">
            Auditor
          </option>
        </select>
      </div>
      <button
        className="p-3 bg-blue-500 text-white rounded-md shadow-md"
        onClick={registerVkycAgentSocket}
      >
        Connect
      </button>
    </>
  ) : (
    <>{renderAgentView}</>
  );

  return <section>{renderBody}</section>;
};

export default Audit;
