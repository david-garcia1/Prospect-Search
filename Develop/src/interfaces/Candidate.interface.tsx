// TODO: Create an interface for the Candidate objects returned by the API
interface Candidate {
    login: string;
    ID: number;
    avatar_url?: string;
    name?: string;
    location?: string;
    email?: string;
    company?: string;
    bio?: string;
}

export default Candidate;