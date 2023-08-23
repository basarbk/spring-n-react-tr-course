import http from "@/lib/http";

export function resetPassword(token, body) {
  return http.patch(`/api/v1/users/${token}/password`, body);
}