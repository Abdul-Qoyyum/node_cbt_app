import React from "react";
import { Button, Spinner } from "reactstrap";
import classnames from "classnames";

export default ({ children, loading, block, ...rest }) => (
    <Button {...rest} block={block}>
        {!(block && !loading) && (
            <>
            <Spinner
                className={classnames({
                    "position-relative": true,
                    "button-style": !block,
                    visible: loading,
                    invisible: !loading
                })}
                size="sm"
                // type="grow"
            />
                {loading ?? children}
            </>
        )}
        {!(block && loading) && (
            <>
            <span
                className={classnames({
                    invisible: loading,
                    visible: !loading,
                    "span-style": !block
                })}
            >
        {children}
      </span>
        </>
        )}
    </Button>
);
