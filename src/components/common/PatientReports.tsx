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
import SPADIReport from './SPADIReport';
import SF36Report from './SF36Report';
import BPIReport from './BPIReport';

interface PatientReportsProps {
  questionaires: PatientForm[];
  initialReportPanel?: PatientReportPanelType;
}

function PatientReports(props: PatientReportsProps) {
  const { initialReportPanel, questionaires } = props;
  const [panel, setPanel] = useState<PatientReportPanelType>(
    initialReportPanel ?? PatientReportPanelType.Summary
  );

  return (
    <div>
      {panel === PatientReportPanelType.Summary && (
        <PatientSummary {...props} setReportPanel={setPanel} />
      )}
      {panel === PatientReportPanelType.EPC && (
        <EPCReport
          data={questionaires?.filter((q) => q.type === 'EPC')}
          goToSummary={() => setPanel(PatientReportPanelType.Summary)}
          hideBreadcrumb={!initialReportPanel}
        />
      )}
      {panel === PatientReportPanelType.DN4 && (
        <DN4Report
          data={questionaires?.filter((q) => q.type === 'DN4')}
          goToSummary={() => setPanel(PatientReportPanelType.Summary)}
          hideBreadcrumb={!initialReportPanel}
        />
      )}
      {panel === PatientReportPanelType.HAD && (
        <HADReport
          data={questionaires?.filter((q) => q.type === 'HAD')}
          goToSummary={() => setPanel(PatientReportPanelType.Summary)}
          hideBreadcrumb={!initialReportPanel}
        />
      )}
      {panel === PatientReportPanelType.OSWESTRY && (
        <OswestryReport
          data={questionaires?.filter((q) => q.type === 'OSWESTRY')}
          goToSummary={() => setPanel(PatientReportPanelType.Summary)}
          hideBreadcrumb={!initialReportPanel}
        />
      )}
      {panel === PatientReportPanelType.FIBROMIALGIA && (
        <FibromialgiaReport
          data={questionaires?.filter((q) => q.type === 'FIBROMIALGIA')}
          goToSummary={() => setPanel(PatientReportPanelType.Summary)}
          hideBreadcrumb={!initialReportPanel}
        />
      )}
      {panel === PatientReportPanelType.IAD && (
        <IADReport
          data={questionaires?.filter((q) => q.type === 'IAD')}
          goToSummary={() => setPanel(PatientReportPanelType.Summary)}
          hideBreadcrumb={!initialReportPanel}
        />
      )}
      {panel === PatientReportPanelType.SBST && (
        <SBSTReport
          data={questionaires?.filter((q) => q.type === 'SBST')}
          goToSummary={() => setPanel(PatientReportPanelType.Summary)}
          hideBreadcrumb={!initialReportPanel}
        />
      )}
      {panel === PatientReportPanelType.PSEQ && (
        <PSEQReport
          data={questionaires?.filter((q) => q.type === 'PSEQ')}
          goToSummary={() => setPanel(PatientReportPanelType.Summary)}
          hideBreadcrumb={!initialReportPanel}
        />
      )}
      {panel === PatientReportPanelType.WOMAC && (
        <WOMACReport
          data={questionaires?.filter((q) => q.type === 'WOMAC')}
          goToSummary={() => setPanel(PatientReportPanelType.Summary)}
          hideBreadcrumb={!initialReportPanel}
        />
      )}
      {panel === PatientReportPanelType.SPADI && (
        <SPADIReport
          data={questionaires?.filter((q) => q.type === 'SPADI')}
          goToSummary={() => setPanel(PatientReportPanelType.Summary)}
          hideBreadcrumb={!initialReportPanel}
        />
      )}
      {panel === PatientReportPanelType.SF36 && (
        <SF36Report
          data={questionaires?.filter((q) => q.type === 'SF36')}
          goToSummary={() => setPanel(PatientReportPanelType.Summary)}
          hideBreadcrumb={!initialReportPanel}
        />
      )}
      {panel === PatientReportPanelType.BPI && (
        <BPIReport
          data={questionaires?.filter((q) => q.type === 'BPI')}
          goToSummary={() => setPanel(PatientReportPanelType.Summary)}
          hideBreadcrumb={!initialReportPanel}
        />
      )}
    </div>
  );
}

export default PatientReports;
