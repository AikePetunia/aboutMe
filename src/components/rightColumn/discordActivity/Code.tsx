import { formatTimeDisplay, resolveActivityImage } from "utils/discordUtils";
import { CustomStatus } from "./CustomStatus";
import type { Activity } from "../../types/discord";
type Maybe<T> = T | null | undefined;

interface CodeProps {
  activity: Maybe<Activity>;
  emojiUrl: Maybe<string>;
  statusText: Maybe<string>;
}

export function Code({ activity, emojiUrl, statusText }: CodeProps) {
  const appId = activity?.application_id ?? "";
  const largeImg = resolveActivityImage(appId, activity?.assets?.large_image);

  return (
    <>
      <div className="image-container">
        <img
          className="activity-image"
          src={largeImg || undefined}
          alt={activity?.details || ""}
        />
        {CustomStatus ? (
          <CustomStatus emojiUrl={emojiUrl} statusText={statusText} />
        ) : null}
      </div>
      <div className="activity-container">
        <h3 className="activity-detail ">{activity?.details}</h3>
        <h6 className="activity-state ">{activity?.state}</h6>
        <span className="activity-time ">
          {formatTimeDisplay(activity?.timestamps?.start ?? undefined)}
        </span>
      </div>
    </>
  );
}

export default Code;
