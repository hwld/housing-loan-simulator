import * as RadixTooltip from "@radix-ui/react-tooltip";
import { ReactNode } from "react";

type Props = { trigger: ReactNode; children: ReactNode };
export const Tooltip: React.FC<Props> = ({ trigger, children }) => {
  return (
    <RadixTooltip.Provider delayDuration={100}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{trigger}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            className="py-1 px-2 bg-gray-300 shadow rounded text-sm text-gray-700"
            sideOffset={3}
            side="bottom"
          >
            {children}
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};
