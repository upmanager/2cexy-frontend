
import { Col, Row } from '@themesberg/react-bootstrap';
import { useState } from 'react';
import { LiveProvider } from 'react-live';
import Code from "./Code";
import { PrismTheme } from 'prism-react-renderer';
import themeStyle from "../assets/syntax-themes/ghcolors.json";

export default function CodeEditor(props: any) {
  const { language = "jsx", scope = {}, imports = null, copyTextImport = null, maxHeight = 'none', download = null, downloadUrl = null } = props;
  const [code, setCode] = useState(props.code);
  const noInline = code.includes('render(');

  return (
    <LiveProvider noInline={noInline} code={code} language={language} theme={themeStyle as PrismTheme} scope={scope}>
      <Row>
        {imports ? (
          <Col xs={12} className="mb-4">
            <Code code={imports} copyText={copyTextImport} />
          </Col>
        ) : null}

        {download &&
          <Col xs={12} className="mb-4">
            <Code code={download} download={download} downloadUrl={downloadUrl} />
         </Col>
        }

        <Col xs={12} className="mb-4">
          <Code code={code} copyText={code} />
        </Col>
      </Row>
    </LiveProvider>
  );
};

