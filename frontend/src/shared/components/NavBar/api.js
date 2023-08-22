import http from "@/lib/http";

export function logout(){
    return http.post("/api/v1/logout");
}