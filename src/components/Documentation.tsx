
import { Col, Row } from '@themesberg/react-bootstrap';
import CodeEditor from "./CodeEditor";

export default function Documentation(props:any) {
  const { title, description, example = null, imports = null, copyTextImport = null, scope = {}, download = null, downloadUrl = null, maxHeight = null } = props;
  return (
    <>
      <div className="pt-2">
        <Row>
          <Col xs={12}>
            <h2 className="fs-5">{title}</h2>
            {description}
          </Col>
        </Row>
      </div>

      <div className="pb-5">
        <Row className="mt-4">
          <Col xs={12}>
            <CodeEditor code={example} scope={scope} copyTextImport={copyTextImport} imports={imports} maxHeight={maxHeight} download={download} downloadUrl={downloadUrl} />
          </Col>
        </Row>
      </div>
    </>
  );
};
