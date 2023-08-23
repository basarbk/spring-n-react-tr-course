import http from "@/lib/http";

export function passwordResetRequest(body) {
  return http.post('/api/v1/users/password-reset', body);
}