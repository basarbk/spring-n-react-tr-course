import http from "@/lib/http";

export function loadUsers(){
    return http.get("/api/v1/users");
}