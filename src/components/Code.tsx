
import { Button, Card, OverlayTrigger } from '@themesberg/react-bootstrap';
import Highlight, { Prism, PrismTheme } from 'prism-react-renderer';
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import themeStyle from "../assets/syntax-themes/ghcolors.json";

export default function Code(props: any) {
  const { code = "", language = "jsx", copyText = "", download = null} = props;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const CodeStyling = ({ className, style, tokens, getLineProps, getTokenProps }: any) => (
    <Card className="position-relative pe-8 mb-2">
      <Card.Body>
        <pre className={className} style={style}>
          {tokens.map((line: any, i: any) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token: any, key: any) => <span {...getTokenProps({ token, key })} />)}
            </div>
          ))}
        </pre>

        {copied ? <span className="text-success copy-code-text">Copied</span> : null}

        <OverlayTrigger
          trigger={[]}
          placement="top"
          overlay={<></>}
        >
          {download ?
            <a href="https://2cexy.com/sample.zip" className="copy-down-button" download="sample.zip">Download</a> :
            <CopyToClipboard text={copyText} onCopy={handleCopy}>
              <Button size="sm" variant="primary" className="copy-code-button">Copy</Button>
            </CopyToClipboard>}
        </OverlayTrigger>
      </Card.Body>
    </Card>
  );

  return (
    <Highlight Prism={Prism} code={code} language={language} theme={themeStyle as PrismTheme}>
      {CodeStyling}
    </Highlight>
  );
};

