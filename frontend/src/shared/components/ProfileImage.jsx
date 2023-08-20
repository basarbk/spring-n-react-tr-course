import defaultProfileImage from "@/assets/profile.png";

export function ProfileImage({ width }) {
  return (
    <img
      src={defaultProfileImage}
      width={width}
      className="img-fluid rounded-circle shadow-sm"
    />
  );
}
