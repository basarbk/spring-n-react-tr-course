import http from "@/lib/http";

export function deleteUser(id){
    return http.delete(`/api/v1/users/${id}`)
}