import {
  formatTimeDisplay,
  resolveActivityImage,
} from "../../../../utils/discordUtils";
import { CustomStatus } from "./CustomStatus";
import type { Activity } from "../../../../types/discord";
type Maybe<T> = T | null | undefined;

interface ObsidianProps {
  activity: Maybe<Activity>;
  emojiUrl: Maybe<string>;
  statusText: Maybe<string>;
}

export function Obsidian({ activity, emojiUrl, statusText }: ObsidianProps) {
  const appId = activity?.application_id ?? "";
  const logo = resolveActivityImage(appId, activity?.assets?.large_image);

  return (
    <>
      <div className="image-container">
        <img
          className="activity-image"
          src={logo || undefined}
          alt={activity?.details || ""}
        />
        {CustomStatus ? (
          <CustomStatus emojiUrl={emojiUrl} statusText={statusText} />
        ) : null}
      </div>
      <div className="activity-container">
        <h6 className="activity-detail">{activity?.details}</h6>
        <h3 className="activity-state ">{activity?.state}</h3>
        <span className="activity-time ">
          {formatTimeDisplay(activity?.timestamps?.start ?? undefined)}
        </span>
      </div>
    </>
  );
}

export default Obsidian;
