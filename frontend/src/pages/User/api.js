import http from "@/lib/http";

export function getUser(id) {
  return http.get(`/api/v1/users/${id}`);
}
