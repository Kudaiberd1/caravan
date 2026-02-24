export interface User {
    firstName: string;
    lastName: string;
    email: string;
}


export function getUserDetails(): User | null {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));

        return {
            firstName: payload?.preferred_username,
            lastName: payload?.family_name,
            email: payload?.email,
        };
    } catch {
        return null;
    }
}
