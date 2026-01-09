export interface ApplicationEmailProps {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    address?: string;
    dateOfBirth?: string;
    memberSince?: string;
    positionApplying?: string;
    ministry?: string;
    experience?: string;
    qualifications?: string;
    motivation?: string;
    availability?: string;
    references?: string;
    hasCV?: boolean;
    siteName?: string;
}
export default function ApplicationEmail({ firstName, lastName, email, phone, address, dateOfBirth, memberSince, positionApplying, ministry, experience, qualifications, motivation, availability, references, hasCV, siteName, }: ApplicationEmailProps): import("react/jsx-runtime").JSX.Element;
