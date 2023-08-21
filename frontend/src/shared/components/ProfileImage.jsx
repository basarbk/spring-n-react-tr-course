import defaultProfileImage from "@/assets/profile.png";

export function ProfileImage({ width, tempImage }) {
  return (
    <img
      src={tempImage || defaultProfileImage}
      width={width}
      height={width}
      className="rounded-circle shadow-sm"
    />
  );
}
