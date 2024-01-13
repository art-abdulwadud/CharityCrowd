import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ScrollPanel } from 'primereact/scrollpanel';
import ProjectName from './ProjectName';

const DonationsTable = ({ data }) => {
  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };
  const amountBodyTemplate = (rowData) => {
    return formatCurrency(rowData.amountDonated);
  };
  const dateBodyTemplate = (rowData) => {
    return new Date(parseInt(rowData.createdAt)).toDateString();
  };
  const projectNameBodyTemplate = (rowData) => {
    return <ProjectName projectId={rowData.projectId} />;
  };
  const anonymousBodyTemplate = (rowData) => {
    return rowData.anonymous ? 'true' : 'false';
  };
  return (
    <ScrollPanel style={{ width: '100%', minHeight: '30vh', maxWidth: '100%' }}>
      <div className="card m-2 p-2">
        <h5 className="pb-3 pt-3 text-pink-500">My Donations</h5>
        <DataTable value={data} stripedRows responsiveLayout="scroll">
          <Column field="projectId" header="Project" body={projectNameBodyTemplate} />
          <Column field="anonymous" header="Anonymous" body={anonymousBodyTemplate} />
          <Column field="amountDonated" header="Amount Donated" body={amountBodyTemplate} sortable />
          <Column field="createdAt" header="Donated on" body={dateBodyTemplate} sortable />
          <Column field="modeOfPayment" header="Mode of Payment" />
        </DataTable>
      </div>
    </ScrollPanel>
  );
};

export default DonationsTable;
