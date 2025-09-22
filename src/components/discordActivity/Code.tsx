import { formatTimeDisplay, resolveActivityImage } from "utils/discordUtils";
import type { Activity } from "../../types/discord";
type Maybe<T> = T | null | undefined;

interface CodeProps {
  activity: Maybe<Activity>;
}

export function Code({ activity }: CodeProps) {
  const appId = activity?.application_id ?? "";
  const largeImg = resolveActivityImage(appId, activity?.assets?.large_image);

  return (
    <div className="ds-activity">
      <img
        className="activity-image"
        src={largeImg || undefined}
        alt={activity?.details || ""}
      />
      <h3>{activity?.details}</h3>
      <h6>{activity?.state}</h6>
      <h4>{activity?.assets?.large_text}</h4>
      <time>{formatTimeDisplay(activity?.timestamps?.start ?? undefined)}</time>
    </div>
  );
}

export default Code;
