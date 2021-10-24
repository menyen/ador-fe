import { useState } from 'react';

import { PatientForm } from '../../models/PatientForm';
import PatientSummary from './PatientSummary';
import { PatientReportPanelType } from '../../interfaces';
import EPCReport from './EPCReport';
import DN4Report from './DN4Report';
import HADReport from './HADReport';
import OswestryReport from './OswestryReport';

interface PatientReportsProps {
  questionaires: PatientForm[];
}

function PatientReports(props: PatientReportsProps) {
  const { questionaires } = props;
  const [panel, setPanel] = useState<PatientReportPanelType>(
    PatientReportPanelType.Summary
  );

  return (
    <div>
      {panel === PatientReportPanelType.Summary && (
        <PatientSummary {...props} setReportPanel={setPanel} />
      )}
      {panel === PatientReportPanelType.EPC && (
        <EPCReport
          data={questionaires?.filter(
            (q) => q.type === 'EPC' && q.status === 'DONE'
          )}
          goToSummary={() => setPanel(PatientReportPanelType.Summary)}
        />
      )}
      {panel === PatientReportPanelType.DN4 && (
        <DN4Report
          data={questionaires?.filter(
            (q) => q.type === 'DN4' && q.status === 'DONE'
          )}
          goToSummary={() => setPanel(PatientReportPanelType.Summary)}
        />
      )}
      {panel === PatientReportPanelType.HAD && (
        <HADReport
          data={questionaires?.filter(
            (q) => q.type === 'HAD' && q.status === 'DONE'
          )}
          goToSummary={() => setPanel(PatientReportPanelType.Summary)}
        />
      )}
      {panel === PatientReportPanelType.OSWESTRY && (
        <OswestryReport
          data={questionaires?.filter(
            (q) => q.type === 'OSWESTRY' && q.status === 'DONE'
          )}
          goToSummary={() => setPanel(PatientReportPanelType.Summary)}
        />
      )}
    </div>
  );
}

export default PatientReports;
