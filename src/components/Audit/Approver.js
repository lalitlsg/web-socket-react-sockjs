import React from 'react';

const Approver = props => {
  const { stompClient, name, deRegisterVkycAgentSocket } = props;
  const [approverData, setApproverData] = React.useState({
    name: false,
    dob: false,
    pan: false,
    fatherName: false,
  });

  console.log({ approverData });

  const sendAuditDataFromApprover = currentApproverData => {
    if (stompClient) {
      const auditDataFromApprover = {
        senderName: name,
        receiverName: 'Ashish',
        data: currentApproverData,
        status: 'MESSAGE',
      };
      stompClient.send('/app/audit-data', {}, JSON.stringify(auditDataFromApprover));
    }
  };

  const handleCheckBoxChange = event => {
    const { name } = event.target;
    const currentApproverData = { ...approverData, [name]: !approverData[name] };
    sendAuditDataFromApprover(currentApproverData);
    setApproverData(currentApproverData);
  };

  return (
    <>
      <h2 className="text-2xl text-center font-bold m-4">Approver</h2>
      <section className="flex justify-center p-4">
        <div className="flex flex-col gap-4">
          <section className="flex  gap-2">
            <input
              type="checkbox"
              checked={approverData.name}
              name="name"
              onChange={handleCheckBoxChange}
              className="mr-2"
            />
            <span className="mr-2">Name</span>
          </section>
          <section className="flex  gap-2">
            <input
              type="checkbox"
              checked={approverData.dob}
              name="dob"
              onChange={handleCheckBoxChange}
              className="mr-2"
            />
            <span className="mr-2">DOB</span>
          </section>

          <section className="flex  gap-2">
            <input
              type="checkbox"
              checked={approverData.pan}
              name="pan"
              onChange={handleCheckBoxChange}
              className="mr-2"
            />
            <span className="mr-2">PAN</span>
          </section>
          <section className="flex  gap-2">
            <input
              type="checkbox"
              checked={approverData.fatherName}
              name="fatherName"
              onChange={handleCheckBoxChange}
              className="mr-2"
            />
            <span className="mr-2">Father Name</span>
          </section>
        </div>
      </section>
      <button
        className="p-3 mt-3 bg-red-500 text-white rounded-md shadow-md"
        onClick={deRegisterVkycAgentSocket}
      >
        Disconnect
      </button>
    </>
  );
};

export default Approver;
