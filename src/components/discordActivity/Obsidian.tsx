import { formatTimeDisplay, resolveActivityImage } from "utils/discordUtils";
import type { Activity } from "../../types/discord";
type Maybe<T> = T | null | undefined;

interface ObsidianProps {
  activity: Maybe<Activity>;
}

export function Obsidian({ activity }: ObsidianProps) {
  const appId = activity?.application_id ?? "";
  const logo = resolveActivityImage(appId, activity?.assets?.large_image);

  return (
    <div className="ds-activity">
      <img
        className="activity-image"
        src={logo || undefined}
        alt={activity?.details || ""}
      />
      <h3>{activity?.state}</h3>
      <h6>{activity?.details}</h6>
      <time>{formatTimeDisplay(activity?.timestamps?.start ?? undefined)}</time>
    </div>
  );
}

export default Obsidian;
