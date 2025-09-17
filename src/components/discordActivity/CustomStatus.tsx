interface CustomStatusProps {
  emojiUrl: string | null;
  statusText: string | null;
}

export function CustomStatus({ emojiUrl, statusText }: CustomStatusProps) {
  return (
    <>
      {(emojiUrl || statusText) && (
        <div className="emote">
          {statusText && (
            <p className={`status-text-${emojiUrl ? "emoji" : "normal"}`}>
              {statusText}
            </p>
          )}
          {emojiUrl && <img src={emojiUrl} alt=""></img>}
        </div>
      )}
    </>
  );
}

export default CustomStatus;
