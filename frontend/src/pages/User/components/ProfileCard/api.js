import http from "@/lib/http";

export function updateUser(id, body){
    return http.put(`/api/v1/users/${id}`, body)
}