export interface TeamMember {
    id: number;
    name: string;
    role: string;
    bio: string;
    image: string;
    contacts: {
        email?: string;
        phone?: string;
        whatsapp?: string;
    };
    socials: {
        linkedin?: string;
        twitter?: string;
    };
}
