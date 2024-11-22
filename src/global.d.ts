declare namespace kintone {
  export const events: {
    on: (event: string | string[], callback: (e: unknown) => void) => void;
  };
  export const app: {
    record: {
      getHeaderMenuSpaceElement: () => Element | null;
    };
  };
  export const waitForReady: () => Promise<void>
}
