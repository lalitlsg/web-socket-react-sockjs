import React from 'react';

const Auditor = props => {
  const { auditData, deRegisterVkycAgentSocket } = props;
  console.log('auditData', auditData);

  return (
    <>
      <h2 className="text-2xl text-center font-bold m-4">Auditor</h2>
      <section className="flex justify-center p-4">
        <div className="flex flex-col gap-4">
          <section className="flex  gap-2">
            <input type="checkbox" checked={!!auditData?.data?.name} name="name" className="mr-2" />
            <span
              className={`mr-2 ${
                !!auditData?.data?.name ? 'text-green-600 font-bold' : 'text-gray-400'
              }`}
            >
              Name
            </span>
          </section>
          <section className="flex  gap-2">
            <input type="checkbox" checked={!!auditData?.data?.dob} name="dob" className="mr-2" />
            <span
              className={`mr-2 ${
                !!auditData?.data?.dob ? 'text-green-600 font-bold' : 'text-gray-400'
              }`}
            >
              DOB
            </span>
          </section>

          <section className="flex  gap-2">
            <input type="checkbox" checked={!!auditData?.data?.pan} name="pan" className="mr-2" />
            <span
              className={`mr-2 ${
                !!auditData?.data?.pan ? 'text-green-600 font-bold' : 'text-gray-400'
              }`}
            >
              PAN
            </span>
          </section>
          <section className="flex  gap-2">
            <input
              type="checkbox"
              checked={!!auditData?.data?.fatherName}
              name="fatherName"
              className="mr-2"
            />
            <span
              className={`mr-2 ${
                !!auditData?.data?.fatherName ? 'text-green-600 font-bold' : 'text-gray-400'
              }`}
            >
              Father Name
            </span>
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

export default Auditor;
