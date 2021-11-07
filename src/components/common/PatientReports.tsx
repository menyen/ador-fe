import { useState } from 'react';

import { PatientForm } from '../../models/PatientForm';
import PatientSummary from './PatientSummary';
import { PatientReportPanelType } from '../../interfaces';
import EPCReport from './EPCReport';
import DN4Report from './DN4Report';
import HADReport from './HADReport';
import OswestryReport from './OswestryReport';
import FibromialgiaReport from './FibromialgiaReport';
import IADReport from './IADReport';
import SBSTReport from './SBSTReport';
import PSEQReport from './PSEQReport';
import WOMACReport from './WOMACReport';

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
      {panel === PatientReportPanelType.FIBROMIALGIA && (
        <FibromialgiaReport
          data={questionaires?.filter(
            (q) => q.type === 'FIBROMIALGIA' && q.status === 'DONE'
          )}
          goToSummary={() => setPanel(PatientReportPanelType.Summary)}
        />
      )}
      {panel === PatientReportPanelType.IAD && (
        <IADReport
          data={questionaires?.filter(
            (q) => q.type === 'IAD' && q.status === 'DONE'
          )}
          goToSummary={() => setPanel(PatientReportPanelType.Summary)}
        />
      )}
      {panel === PatientReportPanelType.SBST && (
        <SBSTReport
          data={questionaires?.filter(
            (q) => q.type === 'SBST' && q.status === 'DONE'
          )}
          goToSummary={() => setPanel(PatientReportPanelType.Summary)}
        />
      )}
      {panel === PatientReportPanelType.PSEQ && (
        <PSEQReport
          data={questionaires?.filter(
            (q) => q.type === 'PSEQ' && q.status === 'DONE'
          )}
          goToSummary={() => setPanel(PatientReportPanelType.Summary)}
        />
      )}
      {panel === PatientReportPanelType.WOMAC && (
        <WOMACReport
          data={questionaires?.filter(
            (q) => q.type === 'WOMAC' && q.status === 'DONE'
          )}
          goToSummary={() => setPanel(PatientReportPanelType.Summary)}
        />
      )}
    </div>
  );
}

export default PatientReports;
