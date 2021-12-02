import { useCallback, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import Grid from '@material-ui/core/Grid';
import ReactToPdf from 'react-to-pdf';

import { PatientForm } from '../../models/PatientForm';
import PatientSummary from './PatientSummary';
import { PatientReportPanelType } from '../../interfaces';
import EPCReport from './form-reports/EPCReport';
import DN4Report from './form-reports/DN4Report';
import HADReport from './form-reports/HADReport';
import OswestryReport from './form-reports/OswestryReport';
import FibromialgiaReport from './form-reports/FibromialgiaReport';
import IADReport from './form-reports/IADReport';
import SBSTReport from './form-reports/SBSTReport';
import PSEQReport from './form-reports/PSEQReport';
import WOMACReport from './form-reports/WOMACReport';
import SPADIReport from './form-reports/SPADIReport';
import SF36Report from './form-reports/SF36Report';
import BPIReport from './form-reports/BPIReport';
import AllReports from './AllReports';
import { OrangeButton } from '../Buttons';

interface PatientReportsProps {
  questionaires: PatientForm[];
  initialReportPanel?: PatientReportPanelType;
}

function PatientReports(props: PatientReportsProps) {
  const componentRef = useRef(null);
  const { initialReportPanel, questionaires } = props;
  const [panel, setPanel] = useState<PatientReportPanelType>(
    initialReportPanel ?? PatientReportPanelType.Summary
  );

  const reactToPrintContent = useCallback(() => {
    return componentRef.current;
  }, [componentRef]);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: `impressao-busca-de-relatorio-${new Date().toLocaleString()}`,
    removeAfterPrint: true,
  });

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <ReactToPdf
            targetRef={componentRef}
            filename={`busca-de-relatorio-${new Date().toLocaleString()}`}
            options={{
              format: [375, 680],
            }}
          >
            {({
              toPdf,
            }: {
              toPdf: (event: React.MouseEvent<unknown>) => void;
            }) => (
              <OrangeButton type="button" onClick={toPdf}>
                Salvar
              </OrangeButton>
            )}
          </ReactToPdf>
          <OrangeButton type="button" onClick={handlePrint}>
            Imprimir
          </OrangeButton>
        </Grid>
      </Grid>
      <div ref={componentRef}>
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
        {panel === PatientReportPanelType.All && (
          <AllReports data={questionaires} />
        )}
      </div>
    </>
  );
}

export default PatientReports;
