"use client";
import { Turnstile } from "@marsidev/react-turnstile";
import { forwardRef, useImperativeHandle, useRef } from "react";
export const TurnstileComponent = forwardRef(({ siteKey, onVerify, onError, onExpire, theme = "auto", size = "normal" }, ref) => {
    const turnstileRef = useRef(null);
    useImperativeHandle(ref, () => ({
        reset: () => turnstileRef.current?.reset(),
        remove: () => turnstileRef.current?.remove(),
        render: () => turnstileRef.current?.render(),
    }));
    return (<Turnstile ref={turnstileRef} siteKey={siteKey} onSuccess={onVerify} onError={onError} onExpire={onExpire} options={{
            theme,
            size,
        }}/>);
});
TurnstileComponent.displayName = "TurnstileComponent";
