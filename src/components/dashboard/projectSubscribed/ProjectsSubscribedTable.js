import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ScrollPanel } from 'primereact/scrollpanel';
import ProjectName from '../../mydonations/donationList/ProjectName';

const ProjectsSubscribedTable = ({ data }) => {
  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };
  const amountBodyTemplate = (rowData) => {
    return formatCurrency(rowData.amount);
  };
  const projectNameBodyTemplate = (rowData) => {
    return <ProjectName projectId={rowData.projectId} />;
  };
  return (
    <ScrollPanel style={{ width: '100%', minHeight: '30vh', maxWidth: '100%' }}>
      <div className="card m-2 p-2">
        <h5 className="pb-3 pt-3 text-pink-500">Subscribed Projects</h5>
        <DataTable value={data} stripedRows responsiveLayout="scroll">
          <Column field="projectId" header="Name" body={projectNameBodyTemplate} sortable />
          <Column field="amount" header="Monthly Donation" body={amountBodyTemplate} sortable />
        </DataTable>
      </div>
    </ScrollPanel>
  );
};

export default ProjectsSubscribedTable;
