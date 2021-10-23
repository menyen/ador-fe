import { useState } from 'react';

import { PatientForm } from '../../models/PatientForm';
import PatientSummary from './PatientSummary';
import { PatientReportPanelType } from '../../interfaces';
import EPCReport from './EPCReport';

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
    </div>
  );
}

export default PatientReports;
