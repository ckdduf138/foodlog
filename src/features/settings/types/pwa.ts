export type InstallOutcome = "accepted" | "dismissed";

export interface PwaState {
  supported: boolean;
  promptAvailable: boolean;
}
