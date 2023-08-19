import http from "@/lib/http";

export function activateUser(token){
    return http.patch(`/api/v1/users/${token}/active`)
}