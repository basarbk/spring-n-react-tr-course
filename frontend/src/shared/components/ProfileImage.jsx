import defaultProfileImage from "@/assets/profile.png";

export function ProfileImage({ width, tempImage, image }) {
  return (
    <img
      src={tempImage || image || defaultProfileImage}
      width={width}
      height={width}
      className="rounded-circle shadow-sm"
    />
  );
}
