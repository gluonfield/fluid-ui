import * as React from "react";
import type { ReactNode } from "react";
import useCombinedTranscriptions from "./useCombinedTranscriptions";

interface ResponseHandlerProps {
  onNewComponent: (content: ReactNode) => void;
}

export function useAssistantResponseHandler({ onNewComponent }: ResponseHandlerProps) {
  const transcriptions = useCombinedTranscriptions();

  React.useEffect(() => {
    // Get the last assistant message
    const lastAssistantMessage = [...transcriptions].reverse().find((t) => t.role === "assistant");

    if (lastAssistantMessage) {
      // For now, we'll create a simple component for each assistant response
      // In a real implementation, you would parse the response and create appropriate components
      onNewComponent(
        <div className="text-white">
          <h3 className="text-lg font-bold mb-2">Assistant Response</h3>
          <p>{lastAssistantMessage.text}</p>
        </div>
      );
    }
  }, [transcriptions, onNewComponent]);
}
